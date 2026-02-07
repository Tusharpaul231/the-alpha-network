import { useState, useEffect } from 'react'
import { getDemoRequests, updateDemoRequestStatus } from '../../services/adminApi'
import { Search, Filter, Mail, Phone, Calendar, Package } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DemoRequests() {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState(null)

  useEffect(() => {
    fetchDemoRequests()
  }, [])

  const fetchDemoRequests = async () => {
    try {
      const response = await getDemoRequests()
      setRequests(response.data || [])
    } catch (error) {
      console.error('Error fetching demo requests:', error)
      alert('Failed to fetch demo requests')
    } finally {
      setLoading(false)
    }
  }

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateDemoRequestStatus(id, { status: newStatus })
      alert('Status updated successfully!')
      fetchDemoRequests() // Refresh list
      setSelectedRequest(null)
    } catch (error) {
      console.error('Error updating status:', error)
      alert('Failed to update status')
    }
  }

  const filteredRequests = requests.filter(req => {
    const matchesSearch = 
      req.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.product.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter

    return matchesSearch && matchesStatus
  })

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'on-progress', label: 'On Progress', color: 'bg-blue-100 text-blue-800' },
    { value: 'contacted', label: 'Contacted', color: 'bg-purple-100 text-purple-800' },
    { value: 'deal-closed-success', label: 'Deal Closed - Success', color: 'bg-green-100 text-green-800' },
    { value: 'deal-closed-canceled', label: 'Deal Closed - Canceled', color: 'bg-red-100 text-red-800' }
  ]

  const getStatusColor = (status) => {
    const option = statusOptions.find(opt => opt.value === status)
    return option?.color || 'bg-gray-100 text-gray-800'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-neutral-500">Loading demo requests...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-display font-bold text-neutral-900">
          Demo Requests
        </h1>
        <div className="text-sm text-neutral-600">
          Total: {filteredRequests.length} requests
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
              placeholder="Search by name, email, or product..."
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

      {/* Requests List */}
      <div className="grid gap-4">
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <p className="text-neutral-500">No demo requests found</p>
          </div>
        ) : (
          filteredRequests.map((request) => (
            <motion.div
              key={request._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-1">
                      {request.fullName}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}>
                        {statusOptions.find(s => s.value === request.status)?.label || request.status}
                      </span>
                      <span className="px-3 py-1 bg-neutral-100 text-neutral-700 rounded-full text-xs font-semibold">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRequest(selectedRequest?._id === request._id ? null : request)}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm font-semibold"
                  >
                    {selectedRequest?._id === request._id ? 'Close' : 'View Details'}
                  </button>
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Mail size={16} />
                    <span>{request.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Phone size={16} />
                    <span>{request.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-neutral-600">
                    <Package size={16} />
                    <span className="font-semibold">{request.product}</span>
                  </div>
                </div>

                {/* Expanded Details */}
                {selectedRequest?._id === request._id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-6 pt-6 border-t border-neutral-200"
                  >
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-3">Contact Information</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Email:</span> {request.email}</p>
                          <p><span className="font-semibold">Phone:</span> {request.phone}</p>
                          {request.companyName && (
                            <p><span className="font-semibold">Company:</span> {request.companyName}</p>
                          )}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-3">Request Details</h4>
                        <div className="space-y-2 text-sm">
                          <p><span className="font-semibold">Product:</span> {request.product}</p>
                          <p><span className="font-semibold">Submitted:</span> {new Date(request.createdAt).toLocaleString()}</p>
                          {request.message && (
                            <p><span className="font-semibold">Message:</span> {request.message}</p>
                          )}
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
                            onClick={() => handleStatusUpdate(request._id, option.value)}
                            disabled={request.status === option.value}
                            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                              request.status === option.value
                                ? option.color + ' cursor-not-allowed'
                                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Notes Section */}
                    {request.notes && (
                      <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                        <h4 className="font-semibold text-neutral-900 mb-2">Admin Notes</h4>
                        <p className="text-sm text-neutral-700">{request.notes}</p>
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