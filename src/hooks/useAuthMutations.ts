import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import api from '../lib/axios'

interface LoginCredentials {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user?: {
    id: string
    email: string
    role: string
  }
}

export function useLogin() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const { data } = await api.post<LoginResponse>('/admin/login', credentials)
      return data
    },
    onSuccess: (data) => {
      localStorage.setItem('admin_token', data.token)
      navigate('/dashboard')
    },
    onError: (error: any) => {
      console.error('Login failed:', error)
      alert('Login gagal: ' + (error.response?.data?.message || 'Cek email/password'))
    },
  })
}

export function useLogout() {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async () => {
      await api.post('/admin/logout')
    },
    onSuccess: () => {
      localStorage.removeItem('admin_token')
      navigate('/login')
    },
  })
}
