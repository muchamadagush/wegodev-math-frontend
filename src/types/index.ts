// src/types/index.ts

export interface Parent {
  id: string
  email: string
  full_name: string
  created_at: string
  subscription: {
    plan: string
    is_active: boolean
  }
  children_ids: string[]
}

export interface AdminLoginResponse {
  token: string
  user: {
    email: string
    role: string
  }
}

export interface Topic {
  id: string
  name: string
  slug: string
  grade_level: number
  subject: 'math' | 'science'
  question_count?: number
  created_at?: string
}

export interface SubscriptionPlan {
  id: string
  name: string
  slug: string
  price: number
  original_price: number
  duration_days: number
  features: string[]
  is_active: boolean
  is_recommended: boolean
}