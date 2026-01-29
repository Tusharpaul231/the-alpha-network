import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Products
export const getProducts = async () => {
  const response = await api.get('/products')
  return response.data
}

export const getProductBySlug = async (slug) => {
  const response = await api.get(`/products/${slug}`)
  return response.data
}

// Demo Requests
export const submitDemoRequest = async (data) => {
  const response = await api.post('/demo-requests', data)
  return response.data
}

// Contact Queries
export const submitContactQuery = async (data) => {
  const response = await api.post('/queries', data)
  return response.data
}

// Brochures
export const getBrochure = async (productId) => {
  const response = await api.get(`/brochures/${productId}`)
  return response.data
}

export default api
