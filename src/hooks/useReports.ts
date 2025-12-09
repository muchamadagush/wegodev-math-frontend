import { useQuery } from '@tanstack/react-query'
import {
  DUMMY_REVENUE_DATA,
  DUMMY_STUDENT_GROWTH,
  DUMMY_TOPIC_PERFORMANCE,
  DUMMY_DIFFICULT_QUESTIONS,
} from '../utils/dummyData'

const USE_DUMMY_DATA = true

/**
 * Hook untuk fetch laporan keuangan (revenue)
 * Mengembalikan data pendapatan bulanan
 */
export function useRevenueReport() {
  return useQuery({
    queryKey: ['revenueReport'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        return DUMMY_REVENUE_DATA
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/reports/revenue')
      if (!response.ok) throw new Error('Failed to fetch revenue report')
      return response.json()
    },
  })
}

/**
 * Hook untuk fetch laporan pertumbuhan pengguna
 * Mengembalikan data pertumbuhan siswa per bulan
 */
export function useUserGrowthReport() {
  return useQuery({
    queryKey: ['userGrowthReport'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        return DUMMY_STUDENT_GROWTH
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/reports/user-growth')
      if (!response.ok) throw new Error('Failed to fetch user growth report')
      return response.json()
    },
  })
}

/**
 * Hook untuk fetch laporan akademik
 * Mengembalikan data performa topik dan soal tersulit
 */
export function useAcademicReport() {
  return useQuery({
    queryKey: ['academicReport'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulasi delay API call
        await new Promise((resolve) => setTimeout(resolve, 500))
        return {
          topicPerformance: DUMMY_TOPIC_PERFORMANCE,
          difficultQuestions: DUMMY_DIFFICULT_QUESTIONS,
        }
      }
      // TODO: Replace dengan API call ke backend
      const response = await fetch('/api/reports/academic')
      if (!response.ok) throw new Error('Failed to fetch academic report')
      return response.json()
    },
  })
}

/**
 * Hook untuk fetch total revenue tahun ini
 */
export function useTotalRevenueThisYear() {
  const { data: revenueData } = useRevenueReport()

  const totalRevenue = revenueData?.reduce((sum: number, item: any) => sum + item.revenue, 0) || 0

  return {
    totalRevenue,
  }
}
