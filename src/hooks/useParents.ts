import { useQuery } from '@tanstack/react-query'
import api from '../lib/axios'
import type { Parent } from '../types'

export function useParents() {
  return useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      const { data } = await api.get<Parent[]>('/admin/parents')
      return data
    },
  })
}

export function useParentById(id: string) {
  return useQuery({
    queryKey: ['parent', id],
    queryFn: async () => {
      const { data } = await api.get<Parent>(`/admin/parents/${id}`)
      return data
    },
    enabled: !!id,
  })
}
