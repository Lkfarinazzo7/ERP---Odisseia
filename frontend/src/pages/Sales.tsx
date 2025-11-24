import { useEffect, useState } from 'react'
import api from '../services/api'
import './Sales.css'

interface Product {
  id: string
  name: string
  price: number
  stock: number
}

interface Sale {
  id: string
  total: number
  status: string
  createdAt: string
  user: {
    name: string
  }
  items: Array<{
    id: string
    quantity: number
    price: number
    subtotal: number
    product: {
      name: string
    }
  }>
}

export default function Sales() {
  const [sales, setSales] = useState<Sale[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [cart, setCart] = useState<Array<{ productId: string; quantity: number; price: number }>>([])
  const [selectedProduct, setSelectedProduct] = useState('')

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [salesRes, productsRes] = await Promise.all([
        api.get('/sales'),
        api.get('/products'),
      ])
      setSales(salesRes.data)
      setProducts(productsRes.data)
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
    } finally {
      setLoading(false)
    }
  }

  const addToCart = () => {
    if (!selectedProduct) return

    const product = products.find((p) => p.id === selectedProduct)
    if (!product) return

    const existing = cart.find((item) => item.productId === selectedProduct)
    if (existing) {
      setCart(
        cart.map((item) =>
          item.productId === selectedProduct
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCart([...cart, { productId: selectedProduct, quantity: 1, price: product.price }])
    }

    setSelectedProduct('')
  }

  const removeFromCart = (productId: string) => {
    setCart(cart.filter((item) => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(
      cart.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      )
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (cart.length === 0) {
      alert('Adicione produtos ao carrinho')
      return
    }

    try {
      await api.post('/sales', { items: cart })
      setCart([])
      setShowForm(false)
      loadData()
      alert('Venda criada com sucesso!')
    } catch (error: any) {
      alert(error.response?.data?.error || 'Erro ao criar venda')
    }
  }

  const handleCancelSale = async (id: string) => {
    if (!confirm('Deseja realmente cancelar esta venda?')) return

    try {
      await api.patch(`/sales/${id}/cancel`)
      loadData()
      alert('Venda cancelada com sucesso!')
    } catch (error) {
      alert('Erro ao cancelar venda')
    }
  }

  const getTotal = () => {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <div className="sales">
      <div className="page-header">
        <h1>Vendas</h1>
        <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancelar' : 'Nova Venda'}
        </button>
      </div>

      {showForm && (
        <form className="sale-form" onSubmit={handleSubmit}>
          <h2>Criar Nova Venda</h2>

          <div className="add-product">
            <select
              value={selectedProduct}
              onChange={(e) => setSelectedProduct(e.target.value)}
            >
              <option value="">Selecione um produto</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} - R$ {product.price.toFixed(2)} (Estoque: {product.stock})
                </option>
              ))}
            </select>
            <button type="button" className="btn-primary" onClick={addToCart}>
              Adicionar
            </button>
          </div>

          {cart.length > 0 && (
            <div className="cart">
              <h3>Carrinho</h3>
              <table>
                <thead>
                  <tr>
                    <th>Produto</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Subtotal</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const product = products.find((p) => p.id === item.productId)
                    return (
                      <tr key={item.productId}>
                        <td>{product?.name}</td>
                        <td>R$ {item.price.toFixed(2)}</td>
                        <td>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              updateQuantity(item.productId, parseInt(e.target.value))
                            }
                            style={{ width: '80px' }}
                          />
                        </td>
                        <td>R$ {(item.price * item.quantity).toFixed(2)}</td>
                        <td>
                          <button
                            type="button"
                            className="btn-delete"
                            onClick={() => removeFromCart(item.productId)}
                          >
                            Remover
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
              <div className="cart-total">
                <strong>Total: R$ {getTotal().toFixed(2)}</strong>
              </div>
              <button type="submit" className="btn-primary">
                Finalizar Venda
              </button>
            </div>
          )}
        </form>
      )}

      <div className="sales-list">
        <h2>Histórico de Vendas</h2>
        {sales.map((sale) => (
          <div key={sale.id} className="sale-card">
            <div className="sale-header">
              <div>
                <strong>Venda #{sale.id.slice(0, 8)}</strong>
                <span className={`status ${sale.status}`}>{sale.status}</span>
              </div>
              <div>
                <span className="date">{new Date(sale.createdAt).toLocaleString('pt-BR')}</span>
                {sale.status === 'completed' && (
                  <button
                    className="btn-cancel"
                    onClick={() => handleCancelSale(sale.id)}
                  >
                    Cancelar
                  </button>
                )}
              </div>
            </div>
            <div className="sale-body">
              <p>Vendedor: {sale.user.name}</p>
              <ul>
                {sale.items.map((item) => (
                  <li key={item.id}>
                    {item.product.name} - {item.quantity}x R$ {item.price.toFixed(2)} = R${' '}
                    {item.subtotal.toFixed(2)}
                  </li>
                ))}
              </ul>
              <p className="total">Total: R$ {sale.total.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
