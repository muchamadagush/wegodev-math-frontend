import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../lib/axios'
import type { Topic } from '../types'

// Data dummy untuk development
const DUMMY_TOPICS: Topic[] = [
  {
    id: '1',
    name: 'Penjumlahan dan Pengurangan',
    slug: 'penjumlahan-pengurangan',
    gradeLevel: 1,
    subject: 'math',
    order: 1,
    iconUrl: 'https://via.placeholder.com/100'
  },
  {
    id: '2',
    name: 'Perkalian Dasar',
    slug: 'perkalian-dasar',
    gradeLevel: 2,
    subject: 'math',
    order: 2,
    iconUrl: 'https://via.placeholder.com/100'
  },
  {
    id: '3',
    name: 'Pembagian Bilangan',
    slug: 'pembagian-bilangan',
    gradeLevel: 3,
    subject: 'math',
    order: 3,
    iconUrl: 'https://via.placeholder.com/100'
  },
  {
    id: '4',
    name: 'Pecahan Sederhana',
    slug: 'pecahan-sederhana',
    gradeLevel: 4,
    subject: 'math',
    order: 4,
    iconUrl: 'https://via.placeholder.com/100'
  },
  {
    id: '5',
    name: 'Makhluk Hidup',
    slug: 'makhluk-hidup',
    gradeLevel: 1,
    subject: 'science',
    order: 5,
    iconUrl: 'https://via.placeholder.com/100'
  }
]

const USE_DUMMY_DATA = true // Set ke false jika backend sudah siap

export function useTopics() {
  return useQuery<Topic[]>({
    queryKey: ['topics'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay network
        await new Promise(resolve => setTimeout(resolve, 500))
        return DUMMY_TOPICS
      }
      const { data } = await api.get('/admin/topics')
      return data
    }
  })
}

export function useDeleteTopic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay network
        await new Promise(resolve => setTimeout(resolve, 300))
        return
      }
      await api.delete(`/admin/topics/${id}`)
    },
    onSuccess: () => {
      toast.success('Topik dihapus')
      if (USE_DUMMY_DATA) {
        // Untuk dummy data, update cache manual
        queryClient.setQueryData<Topic[]>(['topics'], (old) => 
          old ? old.filter(topic => topic.id !== arguments[1]) : []
        )
      } else {
        queryClient.invalidateQueries({ queryKey: ['topics'] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal menghapus topik'
      toast.error(message)
    }
  })
}

export function useTopic(id: string) {
  return useQuery<Topic>({
    queryKey: ['topics', id],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const topic = DUMMY_TOPICS.find(t => t.id === id)
        if (!topic) throw new Error('Topik tidak ditemukan')
        return topic
      }
      const { data } = await api.get(`/admin/topics/${id}`)
      return data
    },
    enabled: !!id
  })
}

export function useCreateTopic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (topicData: Partial<Topic>) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newTopic: Topic = {
          id: String(Date.now()),
          name: topicData.name!,
          slug: topicData.slug!,
          gradeLevel: topicData.gradeLevel!,
          subject: topicData.subject!,
          order: topicData.order || 1,
          iconUrl: topicData.iconUrl
        }
        return newTopic
      }
      const { data } = await api.post('/admin/topics', topicData)
      return data
    },
    onSuccess: (newTopic) => {
      toast.success('Topik berhasil ditambahkan')
      if (USE_DUMMY_DATA) {
        queryClient.setQueryData<Topic[]>(['topics'], (old) => 
          old ? [...old, newTopic] : [newTopic]
        )
      } else {
        queryClient.invalidateQueries({ queryKey: ['topics'] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal menambahkan topik'
      toast.error(message)
    }
  })
}

export function useUpdateTopic() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<Topic> }) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { id, ...data }
      }
      const response = await api.put(`/admin/topics/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      toast.success('Topik berhasil diupdate')
      if (USE_DUMMY_DATA) {
        queryClient.setQueryData<Topic[]>(['topics'], (old) => 
          old ? old.map(topic => 
            topic.id === variables.id ? { ...topic, ...variables.data } : topic
          ) : []
        )
        queryClient.invalidateQueries({ queryKey: ['topics', variables.id] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['topics'] })
        queryClient.invalidateQueries({ queryKey: ['topics', variables.id] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal mengupdate topik'
      toast.error(message)
    }
  })
}
