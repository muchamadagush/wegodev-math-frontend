import { useQuery } from '@tanstack/react-query'

export interface DashboardStats {
  totalParents: number
  totalStudents: number
  activeSubscriptions: number
  totalRevenue: number
}

export interface ActivityItem {
  id: string
  user: string
  action: string
  timestamp: number
}

const USE_DUMMY_DATA = true

// Mock data untuk recent activities
const DUMMY_ACTIVITIES: ActivityItem[] = [
  {
    id: '1',
    user: 'Budi Santoso',
    action: 'mendaftar sebagai orang tua',
    timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 jam lalu
  },
  {
    id: '2',
    user: 'Siti Nurhaliza',
    action: 'membeli paket tahunan senilai Rp 299.000',
    timestamp: Date.now() - 5 * 60 * 60 * 1000, // 5 jam lalu
  },
  {
    id: '3',
    user: 'Ahmad Fauzi',
    action: 'selesai menjawab 10 soal hari ini',
    timestamp: Date.now() - 8 * 60 * 60 * 1000, // 8 jam lalu
  },
  {
    id: '4',
    user: 'Rina Kusuma',
    action: 'membeli paket bulanan senilai Rp 49.000',
    timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, // 1 hari lalu
  },
  {
    id: '5',
    user: 'Agus Wijaya',
    action: 'mencapai level 20',
    timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 hari lalu
  },
]

// Mock dashboard stats
const DUMMY_STATS: DashboardStats = {
  totalParents: 5,
  totalStudents: 8,
  activeSubscriptions: 4,
  totalRevenue: 897000, // Rp 897.000
}

/**
 * Hook untuk fetch dashboard statistics
 * Mengembalikan ringkasan data admin panel
 */
export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboardStats'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        return DUMMY_STATS
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/dashboard/stats')
      if (!response.ok) throw new Error('Failed to fetch dashboard stats')
      return response.json()
    },
  })
}

/**
 * Hook untuk fetch recent activities
 * Mengembalikan list aktivitas terbaru user
 */
export function useRecentActivities() {
  return useQuery({
    queryKey: ['recentActivities'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        return DUMMY_ACTIVITIES
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/dashboard/activities')
      if (!response.ok) throw new Error('Failed to fetch activities')
      return response.json()
    },
  })
}

/**
 * Format relative time (contoh: "2 jam lalu", "1 hari lalu")
 */
export function formatRelativeTime(timestamp: number): string {
  const now = Date.now()
  const diff = now - timestamp
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(diff / 3600000)
  const days = Math.floor(diff / 86400000)

  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit lalu`
  if (hours < 24) return `${hours} jam lalu`
  if (days < 7) return `${days} hari lalu`
  return new Date(timestamp).toLocaleDateString('id-ID')
}

/**
 * Format currency to IDR
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}
