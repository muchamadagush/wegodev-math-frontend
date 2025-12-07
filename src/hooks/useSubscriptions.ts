import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../lib/axios'
import type { SubscriptionPlan } from '../types'

// Data dummy untuk development
const DUMMY_PLANS: SubscriptionPlan[] = [
  {
    id: '1',
    name: 'Premium Monthly',
    slug: 'premium-monthly',
    price: 50000,
    originalPrice: 75000,
    durationDays: 30,
    features: [
      'Akses semua materi pelajaran',
      'Latihan soal unlimited',
      'Progress tracking',
      'Leaderboard global'
    ],
    isActive: true,
    isRecomended: false
  },
  {
    id: '2',
    name: 'Premium Yearly',
    slug: 'premium-yearly',
    price: 500000,
    originalPrice: 900000,
    durationDays: 365,
    features: [
      'Akses semua materi pelajaran',
      'Latihan soal unlimited',
      'Progress tracking',
      'Leaderboard global',
      'Konsultasi dengan tutor',
      'Sertifikat digital'
    ],
    isActive: true,
    isRecomended: true
  },
  {
    id: '3',
    name: 'Basic Plan',
    slug: 'basic-plan',
    price: 0,
    originalPrice: 0,
    durationDays: 365,
    features: [
      'Akses materi terbatas',
      '10 latihan soal per hari'
    ],
    isActive: true,
    isRecomended: false
  }
]

const USE_DUMMY_DATA = true // Set ke false jika backend sudah siap

export function useSubscriptionPlans() {
  return useQuery<SubscriptionPlan[]>({
    queryKey: ['subscription-plans'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return DUMMY_PLANS
      }
      const { data } = await api.get('/admin/subscription-plans')
      return data
    }
  })
}

export function useSubscriptionPlan(id: string) {
  return useQuery<SubscriptionPlan>({
    queryKey: ['subscription-plans', id],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const plan = DUMMY_PLANS.find(p => p.id === id)
        if (!plan) throw new Error('Paket tidak ditemukan')
        return plan
      }
      const { data } = await api.get(`/admin/subscription-plans/${id}`)
      return data
    },
    enabled: !!id
  })
}

export function useCreatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (planData: Partial<SubscriptionPlan>) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newPlan: SubscriptionPlan = {
          id: String(Date.now()),
          name: planData.name!,
          slug: planData.slug!,
          price: planData.price!,
          originalPrice: planData.originalPrice!,
          durationDays: planData.durationDays!,
          features: planData.features || [],
          isActive: planData.isActive ?? true,
          isRecomended: planData.isRecomended ?? false
        }
        return newPlan
      }
      const { data } = await api.post('/admin/subscription-plans', planData)
      return data
    },
    onSuccess: (newPlan) => {
      toast.success('Paket langganan berhasil ditambahkan')
      if (USE_DUMMY_DATA) {
        queryClient.setQueryData<SubscriptionPlan[]>(['subscription-plans'], (old) => 
          old ? [...old, newPlan] : [newPlan]
        )
      } else {
        queryClient.invalidateQueries({ queryKey: ['subscription-plans'] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal menambahkan paket'
      toast.error(message)
    }
  })
}

export function useUpdatePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<SubscriptionPlan> }) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { id, ...data }
      }
      const response = await api.put(`/admin/subscription-plans/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      toast.success('Paket langganan berhasil diupdate')
      if (USE_DUMMY_DATA) {
        queryClient.setQueryData<SubscriptionPlan[]>(['subscription-plans'], (old) => 
          old ? old.map(plan => 
            plan.id === variables.id ? { ...plan, ...variables.data } : plan
          ) : []
        )
        queryClient.invalidateQueries({ queryKey: ['subscription-plans', variables.id] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['subscription-plans'] })
        queryClient.invalidateQueries({ queryKey: ['subscription-plans', variables.id] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal mengupdate paket'
      toast.error(message)
    }
  })
}

export function useDeletePlan() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return
      }
      await api.delete(`/admin/subscription-plans/${id}`)
    },
    onSuccess: (_, id) => {
      toast.success('Paket langganan dihapus')
      if (USE_DUMMY_DATA) {
        queryClient.setQueryData<SubscriptionPlan[]>(['subscription-plans'], (old) => 
          old ? old.filter(plan => plan.id !== id) : []
        )
      } else {
        queryClient.invalidateQueries({ queryKey: ['subscription-plans'] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal menghapus paket'
      toast.error(message)
    }
  })
}
