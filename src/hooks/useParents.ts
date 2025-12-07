import { useQuery } from '@tanstack/react-query'
import api from '../lib/axios'
import type { Parent } from '../types'
import { getAllParents, getParentById } from '../utils/dummyData'

// Flag untuk toggle dummy data (set false untuk gunakan API real)
const USE_DUMMY_DATA = true

export function useParents() {
  return useQuery({
    queryKey: ['parents'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return getAllParents()
      }
      
      const { data } = await api.get<Parent[]>('/admin/parents')
      return data
    },
  })
}

export function useParentById(id: string) {
  return useQuery({
    queryKey: ['parent', id],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        const parent = getParentById(id)
        if (!parent) {
          throw new Error('Parent not found')
        }
        return parent
      }
      
      const { data } = await api.get<Parent>(`/admin/parents/${id}`)
      return data
    },
    enabled: !!id,
  })
}
