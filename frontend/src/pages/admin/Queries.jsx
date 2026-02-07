import { useState, useEffect } from 'react'
import { getQueries, updateQueryStatus } from '../../services/adminApi'
import { Search, Filter, Mail, Phone, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Queries() {
  const [queries, setQueries] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedQuery, setSelectedQuery] = useState(null)

  useEffect(() => {
    fetchQueries()
  }, [])

  const fetchQueries = async () => {
    try {
      const response = await getQueries()
      setQueries(response.data || [])
    } catch (error) {
      console.error('Error fetching queries:', error)
      alert('Failed to fetch queries')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateQueryStatus(id, { status: newStatus })
      alert('Status updated successfully!')
      fetchQueries()
      setSelectedQuery(null)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const filteredQueries = queries.filter(query => {
    const matchesSearch = 
      query.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      query.query.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || query.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { value: 'new', label: 'New', color: 'bg-blue-100 text-blue-800' },
    { value: 'on-progress', label: 'On Progress', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'solved', label: 'Solved', color: 'bg-green-100 text-green-800' }
  ]

  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option?.color || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading queries...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          Contact Queries
        </h1>
        <div className="text-sm text-neutral-600">
          Total: {filteredQueries.length} queries
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl shadow-md p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search by name, email, or query..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
            >
              <option value="all">All Status</option>
              {statusOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Queries List */}
      <div className="grid gap-4">
        {filteredQueries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-neutral-500">No queries found</p>
          </div>
        ) : (
          filteredQueries.map((query) => (
            <motion.div
              key={query._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                      {query.fullName}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(query.status)}`}>
                        {statusOptions.find(s => s.value === query.status)?.label || query.status}
                      </span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold">
                        {new Date(query.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-neutral-600 text-sm line-clamp-2">
                      {query.query}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedQuery(selectedQuery?._id === query._id ? null : query)}
                    className="ml-4 px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold whitespace-nowrap"
                  >
                    {selectedQuery?._id === query._id ? 'Close' : 'View Details'}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Mail size={16} />
                    <span>{query.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Phone size={16} />
                    <span>{query.phone}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedQuery?._id === query._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-neutral-200"
                  >
                    <div className="mb-6">
                      <h4 className="font-semibold text-neutral-900 mb-3 flex items-center space-x-2">
                        <MessageSquare size={20} />
                        <span>Full Query</span>
                      </h4>
                      <div className="p-4 bg-neutral-50 rounded-lg">
                        <p className="text-neutral-700 leading-relaxed">{query.query}</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-3">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Name:</span> {query.fullName}</p>
                          <p><span className="font-semibold">Email:</span> {query.email}</p>
                          <p><span className="font-semibold">Phone:</span> {query.phone}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-3">Query Details</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Submitted:</span> {new Date(query.createdAt).toLocaleString()}</p>
                          <p><span className="font-semibold">Priority:</span> <span className="capitalize">{query.priority || 'medium'}</span></p>
                        </div>
                      </div>
                    </div>

                    {/* Status Update */}
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-3">Update Status</h4>
                      <div className="flex flex-wrap gap-2">
                        {statusOptions.map(option => (
                          <button
                            key={option.value}
                            onClick={() => handleStatusUpdate(query._id, option.value)}
                            disabled={query.status === option.value}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                              query.status === option.value
                                ? option.color + ' cursor-not-allowed'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Response Notes */}
                    {query.responseNotes && (
                      <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                        <h4 className="font-semibold text-neutral-900 mb-2">Response Notes</h4>
                        <p className="text-sm text-neutral-700">{query.responseNotes}</p>
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  )
}