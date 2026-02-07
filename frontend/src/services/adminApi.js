import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

// Get token from localStorage
const getAuthHeader = () => {
  const token = localStorage.getItem('adminToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}

const adminApi = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add token to requests automatically
adminApi.interceptors.request.use((config) => {
  const token = localStorage.getItem('adminToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Auth
export const adminLogin = async (credentials) => {
  const response = await adminApi.post('/auth/login', credentials)
  return response.data
}

export const getCurrentAdmin = async () => {
  const response = await adminApi.get('/auth/me')
  return response.data
}

// Demo Requests
export const getDemoRequests = async (params) => {
  const response = await adminApi.get('/demo-requests', { params })
  return response.data
}

export const updateDemoRequestStatus = async (id, data) => {
  const response = await adminApi.patch(`/demo-requests/${id}`, data)
  return response.data
}

// Queries
export const getQueries = async (params) => {
  const response = await adminApi.get('/queries', { params })
  return response.data
}

export const updateQueryStatus = async (id, data) => {
  const response = await adminApi.patch(`/queries/${id}`, data)
  return response.data
}

// Products
export const getAdminProducts = async () => {
  const response = await adminApi.get('/products')
  return response.data
}

export const createProduct = async (data) => {
  const response = await adminApi.post('/products', data)
  return response.data
}

export const updateProduct = async (id, data) => {
  const response = await adminApi.put(`/products/${id}`, data)
  return response.data
}

export const deleteProduct = async (id) => {
  const response = await adminApi.delete(`/products/${id}`)
  return response.data
}

export default adminApi