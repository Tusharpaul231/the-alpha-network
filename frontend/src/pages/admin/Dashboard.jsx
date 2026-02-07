import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Package, MessageSquare, FileText, TrendingUp } from 'lucide-react'
import { getDemoRequests, getQueries, getAdminProducts } from '../../services/adminApi'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalDemoRequests: 0,
    totalQueries: 0,
    pendingDemoRequests: 0,
    newQueries: 0
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const [products, demoRequests, queries] = await Promise.all([
        getAdminProducts(),
        getDemoRequests(),
        getQueries()
      ])

      setStats({
        totalProducts: products.count || 0,
        totalDemoRequests: demoRequests.count || 0,
        totalQueries: queries.count || 0,
        pendingDemoRequests: demoRequests.data?.filter(d => d.status === 'pending').length || 0,
        newQueries: queries.data?.filter(q => q.status === 'new').length || 0
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Total Products',
      value: stats.totalProducts,
      icon: <Package size={24} />,
      color: 'bg-blue-500',
      link: '/admin/products'
    },
    {
      title: 'Demo Requests',
      value: stats.totalDemoRequests,
      icon: <MessageSquare size={24} />,
      color: 'bg-green-500',
      badge: stats.pendingDemoRequests > 0 ? `${stats.pendingDemoRequests} pending` : null,
      link: '/admin/demo-requests'
    },
    {
      title: 'Queries',
      value: stats.totalQueries,
      icon: <FileText size={24} />,
      color: 'bg-purple-500',
      badge: stats.newQueries > 0 ? `${stats.newQueries} new` : null,
      link: '/admin/queries'
    },
    {
      title: 'Conversion Rate',
      value: '24%',
      icon: <TrendingUp size={24} />,
      color: 'bg-orange-500'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-3xl font-display font-bold text-neutral-900 mb-8">
        Dashboard
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Link
            key={index}
            to={card.link || '#'}
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${card.color} text-white p-3 rounded-lg`}>
                {card.icon}
              </div>
              {card.badge && (
                <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full font-semibold">
                  {card.badge}
                </span>
              )}
            </div>
            <h3 className="text-neutral-600 text-sm font-medium mb-1">{card.title}</h3>
            <p className="text-3xl font-bold text-neutral-900">{card.value}</p>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-display font-bold text-neutral-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products/new"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <Package className="mx-auto mb-2 text-primary" size={32} />
            <p className="font-semibold text-neutral-900">Add New Product</p>
          </Link>
          <Link
            to="/admin/demo-requests"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <MessageSquare className="mx-auto mb-2 text-primary" size={32} />
            <p className="font-semibold text-neutral-900">View Demo Requests</p>
          </Link>
          <Link
            to="/admin/queries"
            className="p-4 border-2 border-dashed border-neutral-300 rounded-lg hover:border-primary hover:bg-primary/5 transition-colors text-center"
          >
            <FileText className="mx-auto mb-2 text-primary" size={32} />
            <p className="font-semibold text-neutral-900">View Queries</p>
          </Link>
        </div>
      </div>
    </div>
  )
}