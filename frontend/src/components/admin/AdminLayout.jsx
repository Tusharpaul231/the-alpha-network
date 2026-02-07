import { useState, useEffect } from 'react'
import { Link, useNavigate, Outlet, useLocation } from 'react-router-dom'
import { LayoutDashboard, Package, MessageSquare, FileText, LogOut, Menu, X } from 'lucide-react'

export default function AdminLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [admin, setAdmin] = useState(null)

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken')
    const adminUser = localStorage.getItem('adminUser')
    
    if (!token) {
      navigate('/admin/login')
      return
    }
    
    if (adminUser) {
      setAdmin(JSON.parse(adminUser))
    }
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminUser')
    navigate('/admin/login')
  }

  const navItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Demo Requests', path: '/admin/demo-requests', icon: <MessageSquare size={20} /> },
    { name: 'Queries', path: '/admin/queries', icon: <FileText size={20} /> },
    { name: 'Products', path: '/admin/products', icon: <Package size={20} /> }
  ]

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-neutral-200 fixed top-0 left-0 right-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md text-neutral-600 hover:bg-neutral-100 mr-2"
              >
                {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <img 
                src="/images/logo/logo.png" 
                alt="The Alpha Network"
                className="h-8"
              />
              <span className="ml-3 font-display font-bold text-lg hidden sm:block">
                Admin Panel
              </span>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-semibold text-neutral-900">{admin?.username}</p>
                <p className="text-xs text-neutral-500">{admin?.role}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-16 left-0 bottom-0 w-64 bg-white border-r border-neutral-200 z-30 transition-transform duration-300 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary text-white'
                  : 'text-neutral-700 hover:bg-neutral-100'
              }`}
            >
              {item.icon}
              <span className="font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 mt-16 p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
        />
      )}
    </div>
  )
}