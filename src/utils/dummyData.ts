/**
 * Mock Data untuk Development
 * Data dummy Parents dan Students dengan relasi yang konsisten
 */

import type { Parent, Student } from '../types'

// Helper untuk generate epoch milliseconds
const daysAgo = (days: number): number => Date.now() - (days * 24 * 60 * 60 * 1000)
const daysFromNow = (days: number): number => Date.now() + (days * 24 * 60 * 60 * 1000)

/**
 * DUMMY DATA: Parents
 * 5 orang tua dengan data realistis
 */
export const DUMMY_PARENTS: Parent[] = [
  {
    id: 'parent-1',
    email: 'budi.santoso@gmail.com',
    fullName: 'Budi Santoso',
    phone: '081234567890',
    childrenIds: ['student-1', 'student-2'], // Budi punya 2 anak
    createdAt: daysAgo(120) // Terdaftar 120 hari lalu
  },
  {
    id: 'parent-2',
    email: 'siti.nurhaliza@yahoo.com',
    fullName: 'Siti Nurhaliza',
    phone: '081298765432',
    childrenIds: ['student-3'], // Siti punya 1 anak
    createdAt: daysAgo(90)
  },
  {
    id: 'parent-3',
    email: 'agus.wijaya@gmail.com',
    fullName: 'Agus Wijaya',
    phone: '085612345678',
    childrenIds: ['student-4', 'student-5'], // Agus punya 2 anak
    createdAt: daysAgo(75)
  },
  {
    id: 'parent-4',
    email: 'rina.kusuma@gmail.com',
    fullName: 'Rina Kusuma',
    phone: '087765432109',
    childrenIds: ['student-6', 'student-7'], // Rina punya 2 anak
    createdAt: daysAgo(60)
  },
  {
    id: 'parent-5',
    email: 'ahmad.fauzi@outlook.com',
    fullName: 'Ahmad Fauzi',
    phone: '082334455667',
    childrenIds: ['student-8'], // Ahmad punya 1 anak
    createdAt: daysAgo(30)
  }
]

/**
 * DUMMY DATA: Students
 * 8 siswa dengan variasi status subscription dan stats gamification
 */
export const DUMMY_STUDENTS: Student[] = [
  // Anak-anak Budi Santoso (parent-1)
  {
    id: 'student-1',
    parentId: 'parent-1',
    username: 'ani_smart',
    displayName: 'Ani Santoso',
    grade: 5,
    schoolName: 'SDN 01 Jakarta Selatan',
    // Subscription: Active - Paket Juara (Yearly)
    subPlanId: 'plan-yearly',
    subStatus: 'active',
    subValidUntil: daysFromNow(180), // Valid 180 hari lagi (6 bulan)
    // Gamification
    xpTotal: 15600,
    level: 18,
    coins: 4250,
    avatarEquipped: {
      head: 'item-1',
      outfit: 'item-2',
      background: 'item-3'
    },
    createdAt: daysAgo(110)
  },
  {
    id: 'student-2',
    parentId: 'parent-1',
    username: 'tono_genius',
    displayName: 'Tono Santoso',
    grade: 3,
    schoolName: 'SDN 01 Jakarta Selatan',
    // Subscription: Active - Paket Bulanan
    subPlanId: 'plan-monthly',
    subStatus: 'active',
    subValidUntil: daysFromNow(20), // Valid 20 hari lagi
    // Gamification
    xpTotal: 8900,
    level: 12,
    coins: 2100,
    avatarEquipped: {
      head: 'item-4',
      background: 'item-5'
    },
    createdAt: daysAgo(100)
  },

  // Anak Siti Nurhaliza (parent-2)
  {
    id: 'student-3',
    parentId: 'parent-2',
    username: 'dewi_pintar',
    displayName: 'Dewi Anggraini',
    grade: 6,
    schoolName: 'SDN 05 Bandung',
    // Subscription: Expired
    subPlanId: 'plan-monthly',
    subStatus: 'expired',
    subValidUntil: daysAgo(10), // Expired 10 hari lalu
    // Gamification
    xpTotal: 12400,
    level: 15,
    coins: 3100,
    avatarEquipped: {},
    createdAt: daysAgo(85)
  },

  // Anak-anak Agus Wijaya (parent-3)
  {
    id: 'student-4',
    parentId: 'parent-3',
    username: 'fikri_math',
    displayName: 'Fikri Wijaya',
    grade: 4,
    schoolName: 'SDN 10 Surabaya',
    // Subscription: Active - Paket Juara
    subPlanId: 'plan-yearly',
    subStatus: 'active',
    subValidUntil: daysFromNow(300), // Valid 300 hari lagi (~10 bulan)
    // Gamification
    xpTotal: 18200,
    level: 21,
    coins: 5600,
    avatarEquipped: {
      head: 'item-1',
      outfit: 'item-2',
      background: 'item-3'
    },
    createdAt: daysAgo(70)
  },
  {
    id: 'student-5',
    parentId: 'parent-3',
    username: 'zara_cerdas',
    displayName: 'Zara Wijaya',
    grade: 2,
    schoolName: 'SDN 10 Surabaya',
    // Subscription: None (belum berlangganan)
    subStatus: 'none',
    // Gamification
    xpTotal: 2400,
    level: 5,
    coins: 650,
    avatarEquipped: {},
    createdAt: daysAgo(60)
  },

  // Anak-anak Rina Kusuma (parent-4)
  {
    id: 'student-6',
    parentId: 'parent-4',
    username: 'rafli_cool',
    displayName: 'Rafli Kusuma',
    grade: 5,
    schoolName: 'SDN 03 Medan',
    // Subscription: Active - Paket 3 Bulan
    subPlanId: 'plan-quarterly',
    subStatus: 'active',
    subValidUntil: daysFromNow(45), // Valid 45 hari lagi
    // Gamification
    xpTotal: 11200,
    level: 14,
    coins: 2800,
    avatarEquipped: {
      head: 'item-4',
      outfit: 'item-2'
    },
    createdAt: daysAgo(55)
  },
  {
    id: 'student-7',
    parentId: 'parent-4',
    username: 'luna_star',
    displayName: 'Luna Kusuma',
    grade: 4,
    schoolName: 'SDN 03 Medan',
    // Subscription: Expired
    subPlanId: 'plan-monthly',
    subStatus: 'expired',
    subValidUntil: daysAgo(5), // Expired 5 hari lalu
    // Gamification
    xpTotal: 9600,
    level: 13,
    coins: 2200,
    avatarEquipped: {
      background: 'item-5'
    },
    createdAt: daysAgo(50)
  },

  // Anak Ahmad Fauzi (parent-5)
  {
    id: 'student-8',
    parentId: 'parent-5',
    username: 'farhan_pro',
    displayName: 'Farhan Fauzi',
    grade: 6,
    schoolName: 'SDN 07 Yogyakarta',
    // Subscription: Active - Paket Bulanan
    subPlanId: 'plan-monthly',
    subStatus: 'active',
    subValidUntil: daysFromNow(25), // Valid 25 hari lagi
    // Gamification
    xpTotal: 14800,
    level: 17,
    coins: 3900,
    avatarEquipped: {
      head: 'item-1',
      background: 'item-3'
    },
    createdAt: daysAgo(28)
  }
]

/**
 * Helper Functions untuk Query Data
 */

export function getParentById(id: string): Parent | undefined {
  return DUMMY_PARENTS.find(p => p.id === id)
}

export function getStudentById(id: string): Student | undefined {
  return DUMMY_STUDENTS.find(s => s.id === id)
}

export function getStudentsByParentId(parentId: string): Student[] {
  return DUMMY_STUDENTS.filter(s => s.parentId === parentId)
}

export function getAllParents(): Parent[] {
  return DUMMY_PARENTS
}

export function getAllStudents(): Student[] {
  return DUMMY_STUDENTS
}
