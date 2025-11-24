import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { authMiddleware } from '../middleware/auth.middleware';
import { z } from 'zod';

const router = Router();
const prisma = new PrismaClient();

router.use(authMiddleware);

const saleItemSchema = z.object({
  productId: z.string().uuid(),
  quantity: z.number().int().positive(),
  price: z.number().positive(),
});

const saleSchema = z.object({
  items: z.array(saleItemSchema).min(1),
});

// List all sales
router.get('/', async (req, res) => {
  try {
    const sales = await prisma.sale.findMany({
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar vendas' });
  }
});

// Get sale by ID
router.get('/:id', async (req, res) => {
  try {
    const sale = await prisma.sale.findUnique({
      where: { id: req.params.id },
      include: {
        user: {
          select: { id: true, name: true, email: true },
        },
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!sale) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }

    res.json(sale);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar venda' });
  }
});

// Create sale
router.post('/', async (req, res) => {
  try {
    const { items } = saleSchema.parse(req.body);
    const userId = req.user!.userId;

    // Calculate total and validate stock
    let total = 0;
    const itemsWithSubtotal = [];

    for (const item of items) {
      const product = await prisma.product.findUnique({
        where: { id: item.productId },
      });

      if (!product || !product.active) {
        return res.status(400).json({
          error: `Produto ${item.productId} não encontrado ou inativo`
        });
      }

      if (product.stock < item.quantity) {
        return res.status(400).json({
          error: `Estoque insuficiente para ${product.name}. Disponível: ${product.stock}`
        });
      }

      const subtotal = item.price * item.quantity;
      total += subtotal;

      itemsWithSubtotal.push({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        subtotal,
      });
    }

    // Create sale with items
    const sale = await prisma.sale.create({
      data: {
        userId,
        total,
        status: 'completed',
        items: {
          create: itemsWithSubtotal,
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update stock
    for (const item of items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    res.status(201).json(sale);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ error: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: 'Erro ao criar venda' });
  }
});

// Cancel sale
router.patch('/:id/cancel', async (req, res) => {
  try {
    const sale = await prisma.sale.findUnique({
      where: { id: req.params.id },
      include: { items: true },
    });

    if (!sale) {
      return res.status(404).json({ error: 'Venda não encontrada' });
    }

    if (sale.status === 'cancelled') {
      return res.status(400).json({ error: 'Venda já cancelada' });
    }

    // Return stock
    for (const item of sale.items) {
      await prisma.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            increment: item.quantity,
          },
        },
      });
    }

    const updatedSale = await prisma.sale.update({
      where: { id: req.params.id },
      data: { status: 'cancelled' },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    res.json(updatedSale);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao cancelar venda' });
  }
});

export default router;
