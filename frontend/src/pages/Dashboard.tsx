import { useEffect, useState } from 'react'
import api from '../services/api'
import './Dashboard.css'

interface Stats {
  totalProducts: number
  totalSales: number
  totalRevenue: number
  lowStockProducts: number
}

export default function Dashboard() {
  const [stats, setStats] = useState<Stats>({
    totalProducts: 0,
    totalSales: 0,
    totalRevenue: 0,
    lowStockProducts: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      const [productsRes, salesRes] = await Promise.all([
        api.get('/products'),
        api.get('/sales'),
      ])

      const products = productsRes.data
      const sales = salesRes.data

      const completedSales = sales.filter((s: any) => s.status === 'completed')
      const totalRevenue = completedSales.reduce((sum: number, s: any) => sum + s.total, 0)
      const lowStockProducts = products.filter((p: any) => p.stock < 10).length

      setStats({
        totalProducts: products.length,
        totalSales: completedSales.length,
        totalRevenue,
        lowStockProducts,
      })
    } catch (error) {
      console.error('Erro ao carregar estatísticas:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">Carregando...</div>
  }

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total de Produtos</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>

        <div className="stat-card">
          <h3>Vendas Concluídas</h3>
          <p className="stat-value">{stats.totalSales}</p>
        </div>

        <div className="stat-card">
          <h3>Receita Total</h3>
          <p className="stat-value">R$ {stats.totalRevenue.toFixed(2)}</p>
        </div>

        <div className="stat-card warning">
          <h3>Produtos com Estoque Baixo</h3>
          <p className="stat-value">{stats.lowStockProducts}</p>
        </div>
      </div>
    </div>
  )
}
