// src/types/index.ts

export interface Admin {
  id: string
  email: string
  fullName: string
  role: string
  isActive: boolean
  createdAt: number // Changed from string to number (epoch ms)
}

export interface AdminLoginResponse {
  token: string
  admin: Admin
}

export interface Parent {
  id: string
  email: string
  fullName: string
  phone: string
  childrenIds: string[]
  createdAt: number // Changed from string to number (epoch ms)
  // Note: Subscription dihapus dari sini, pindah ke Student
}

export interface Student {
  id: string
  parentId: string
  username: string
  displayName: string
  grade: number
  schoolName: string
  
  // New Subscription Fields (per-child)
  subPlanId?: string
  subStatus: 'active' | 'expired' | 'past_due' | 'none'
  subValidUntil?: number // Changed from string to number (epoch ms)

  // Gamification
  xpTotal: number
  level: number
  coins: number
  avatarEquipped?: Record<string, string>
  createdAt: number // Changed from string to number (epoch ms)
}

export interface Topic {
  id: string
  name: string
  subject: 'math' | 'science' | 'english'
  gradeLevel: number
  order: number
  slug: string
  iconUrl?: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  price: number
  originalPrice?: number
  durationDays: number
  features: string[]
  isActive: boolean
  isRecomended: boolean
}

export interface Question {
  id: string
  topicId: string
  difficulty: 1 | 2 | 3
  type: 'mcq' | 'fill_in'
  content: {
    text: string
    image?: string
    latex?: string
  }
  options?: {
    id: string
    value: string
    isCorrect?: boolean
  }[]
  correctAnswer: any
  explanation?: string
}

export interface Payment {
  id: string
  orderId: string
  parentId: string
  studentId: string
  amount: number
  status: 'pending' | 'paid' | 'failed'
  planPurchased: string
  paidAt?: number // Changed from string to number (epoch ms)
  createdAt: number // Changed from string to number (epoch ms)
}