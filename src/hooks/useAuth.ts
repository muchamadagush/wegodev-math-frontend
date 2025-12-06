import { useState, useCallback } from 'react'
// import { api } from '../lib/axios'

interface User {
  id: string
  email: string
  role?: string
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)

  const login = useCallback(async (email: string, password: string) => {
    setLoading(true)
    try {
      // const { data } = await api.post('/auth/login', { email, password })
      // setUser(data.user)
      setUser({ id: 'demo', email }) // placeholder
    } finally {
      setLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    // await api.post('/auth/logout')
    setUser(null)
  }, [])

  return { user, loading, login, logout }
}
