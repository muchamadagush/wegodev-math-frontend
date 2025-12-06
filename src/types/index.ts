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