// src/lib/api.ts
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1', // URL Backend
})

// Interceptor: Sisipkan Token otomatis
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Interceptor: Handle jika Token Expired (401)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('admin_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default api