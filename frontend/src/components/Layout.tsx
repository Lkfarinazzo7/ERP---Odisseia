import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'
import './Layout.css'

export default function Layout() {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="layout">
      <nav className="navbar">
        <div className="navbar-brand">
          <h1>ERP Odisseia</h1>
        </div>
        <div className="navbar-menu">
          <Link to="/">Dashboard</Link>
          <Link to="/products">Produtos</Link>
          <Link to="/sales">Vendas</Link>
        </div>
        <div className="navbar-user">
          <span>{user?.name}</span>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
