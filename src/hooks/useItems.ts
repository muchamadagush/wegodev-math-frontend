import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { DUMMY_ITEMS, getItemById, getAllItems } from '../utils/dummyData'
import type { Item } from '../types'

const USE_DUMMY_DATA = true

/**
 * Hook untuk fetch semua items
 */
export function useItems() {
  return useQuery({
    queryKey: ['items'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        return getAllItems()
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/items')
      if (!response.ok) throw new Error('Failed to fetch items')
      return response.json()
    },
  })
}

/**
 * Hook untuk fetch single item by ID
 */
export function useItem(id: string) {
  return useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 300))
        const item = getItemById(id)
        if (!item) throw new Error('Item not found')
        return item
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch(`/api/items/${id}`)
      if (!response.ok) throw new Error('Failed to fetch item')
      return response.json()
    },
  })
}

/**
 * Hook untuk membuat item baru
 */
export function useCreateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: Partial<Item>) => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        // Generate ID baru
        const newId = `item-${Date.now()}`
        const newItem: Item = {
          id: newId,
          name: data.name || '',
          type: data.type || 'head',
          costCoins: data.costCoins || 0,
          assetUrl: data.assetUrl || '',
          isPremium: data.isPremium || false,
          createdAt: Date.now(),
        }
        // Add ke DUMMY_ITEMS
        DUMMY_ITEMS.push(newItem)
        return newItem
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!response.ok) throw new Error('Failed to create item')
      return response.json()
    },
    onSuccess: () => {
      // Invalidate queries untuk refetch data
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success('Item berhasil ditambahkan!')
    },
    onError: () => {
      toast.error('Gagal menambahkan item')
    },
  })
}

/**
 * Hook untuk update item
 */
export function useUpdateItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { itemId: string; updates: Partial<Item> }) => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        const itemIndex = DUMMY_ITEMS.findIndex((item) => item.id === data.itemId)
        if (itemIndex === -1) throw new Error('Item not found')
        // Update item
        DUMMY_ITEMS[itemIndex] = {
          ...DUMMY_ITEMS[itemIndex],
          ...data.updates,
        }
        return DUMMY_ITEMS[itemIndex]
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch(`/api/items/${data.itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data.updates),
      })
      if (!response.ok) throw new Error('Failed to update item')
      return response.json()
    },
    onSuccess: (item) => {
      // Invalidate queries untuk refetch data
      queryClient.invalidateQueries({ queryKey: ['items'] })
      queryClient.invalidateQueries({ queryKey: ['item', item.id] })
      toast.success('Item berhasil diupdate!')
    },
    onError: () => {
      toast.error('Gagal mengupdate item')
    },
  })
}

/**
 * Hook untuk delete item
 */
export function useDeleteItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (itemId: string) => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 800))
        const itemIndex = DUMMY_ITEMS.findIndex((item) => item.id === itemId)
        if (itemIndex === -1) throw new Error('Item not found')
        // Remove item
        DUMMY_ITEMS.splice(itemIndex, 1)
        return { id: itemId }
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch(`/api/items/${itemId}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete item')
      return response.json()
    },
    onSuccess: () => {
      // Invalidate queries untuk refetch data
      queryClient.invalidateQueries({ queryKey: ['items'] })
      toast.success('Item berhasil dihapus!')
    },
    onError: () => {
      toast.error('Gagal menghapus item')
    },
  })
}
