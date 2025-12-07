import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import type { StudentInventory, Item } from '../types'
import { getAllStudents, getStudentById, getStudentsByParentId } from '../utils/dummyData'

// Flag untuk toggle dummy data (set false untuk gunakan API real)
const USE_DUMMY_DATA = true

// Dummy data items untuk inventory
const mockItems: Item[] = [
  {
    id: 'item-1',
    name: 'Topi Graduation',
    type: 'head',
    costCoins: 500,
    assetUrl: '/assets/items/hat-graduation.png',
    isPremium: false
  },
  {
    id: 'item-2',
    name: 'Baju Superhero',
    type: 'outfit',
    costCoins: 1000,
    assetUrl: '/assets/items/outfit-hero.png',
    isPremium: true
  },
  {
    id: 'item-3',
    name: 'Background Luar Angkasa',
    type: 'background',
    costCoins: 1500,
    assetUrl: '/assets/items/bg-space.png',
    isPremium: true
  },
  {
    id: 'item-4',
    name: 'Topi Wizard',
    type: 'head',
    costCoins: 750,
    assetUrl: '/assets/items/hat-wizard.png',
    isPremium: false
  },
  {
    id: 'item-5',
    name: 'Background Hutan',
    type: 'background',
    costCoins: 800,
    assetUrl: '/assets/items/bg-forest.png',
    isPremium: false
  }
]

// Dummy inventory data per student
const mockInventories: Record<string, StudentInventory[]> = {
  'student-1': [
    {
      id: 'inv-1',
      itemId: 'item-1',
      acquiredAt: Date.now() - (80 * 24 * 60 * 60 * 1000),
      item: mockItems[0]
    },
    {
      id: 'inv-2',
      itemId: 'item-2',
      acquiredAt: Date.now() - (60 * 24 * 60 * 60 * 1000),
      item: mockItems[1]
    },
    {
      id: 'inv-3',
      itemId: 'item-3',
      acquiredAt: Date.now() - (45 * 24 * 60 * 60 * 1000),
      item: mockItems[2]
    },
    {
      id: 'inv-4',
      itemId: 'item-5',
      acquiredAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
      item: mockItems[4]
    }
  ],
  'student-2': [
    {
      id: 'inv-5',
      itemId: 'item-4',
      acquiredAt: Date.now() - (50 * 24 * 60 * 60 * 1000),
      item: mockItems[3]
    },
    {
      id: 'inv-6',
      itemId: 'item-5',
      acquiredAt: Date.now() - (30 * 24 * 60 * 60 * 1000),
      item: mockItems[4]
    },
    {
      id: 'inv-7',
      itemId: 'item-1',
      acquiredAt: Date.now() - (10 * 24 * 60 * 60 * 1000),
      item: mockItems[0]
    }
  ],
  'student-4': [
    {
      id: 'inv-8',
      itemId: 'item-1',
      acquiredAt: Date.now() - (65 * 24 * 60 * 60 * 1000),
      item: mockItems[0]
    },
    {
      id: 'inv-9',
      itemId: 'item-2',
      acquiredAt: Date.now() - (50 * 24 * 60 * 60 * 1000),
      item: mockItems[1]
    },
    {
      id: 'inv-10',
      itemId: 'item-3',
      acquiredAt: Date.now() - (30 * 24 * 60 * 60 * 1000),
      item: mockItems[2]
    }
  ],
  'student-6': [
    {
      id: 'inv-11',
      itemId: 'item-4',
      acquiredAt: Date.now() - (40 * 24 * 60 * 60 * 1000),
      item: mockItems[3]
    },
    {
      id: 'inv-12',
      itemId: 'item-2',
      acquiredAt: Date.now() - (25 * 24 * 60 * 60 * 1000),
      item: mockItems[1]
    }
  ],
  'student-8': [
    {
      id: 'inv-13',
      itemId: 'item-1',
      acquiredAt: Date.now() - (20 * 24 * 60 * 60 * 1000),
      item: mockItems[0]
    },
    {
      id: 'inv-14',
      itemId: 'item-3',
      acquiredAt: Date.now() - (15 * 24 * 60 * 60 * 1000),
      item: mockItems[2]
    }
  ]
}

/**
 * Hook untuk fetch all students
 */
export function useStudents() {
  return useQuery({
    queryKey: ['students'],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return getAllStudents()
      }
      
      // TODO: Implement real API call
      throw new Error('Real API not implemented yet')
    }
  })
}

/**
 * Hook untuk fetch detail student by ID
 */
export function useStudent(id: string) {
  return useQuery({
    queryKey: ['student', id],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        
        const student = getStudentById(id)
        if (!student) {
          throw new Error('Student not found')
        }
        
        return student
      }
      
      // TODO: Implement real API call
      throw new Error('Real API not implemented yet')
    },
    enabled: !!id
  })
}

/**
 * Hook untuk fetch students by parent ID
 */
export function useStudentsByParent(parentId: string) {
  return useQuery({
    queryKey: ['students', 'parent', parentId],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return getStudentsByParentId(parentId)
      }
      
      // TODO: Implement real API call
      throw new Error('Real API not implemented yet')
    },
    enabled: !!parentId
  })
}

/**
 * Hook untuk fetch inventory student by ID
 */
export function useStudentInventory(studentId: string) {
  return useQuery({
    queryKey: ['student-inventory', studentId],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500))
        return mockInventories[studentId] || []
      }
      
      // TODO: Implement real API call
      throw new Error('Real API not implemented yet')
    },
    enabled: !!studentId
  })
}

/**
 * Hook untuk update/edit student
 */
export function useUpdateStudent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: { studentId: string; updates: Partial<any> }) => {
      if (USE_DUMMY_DATA) {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const student = getStudentById(data.studentId)
        if (!student) {
          throw new Error('Student not found')
        }
        
        // Merge updates dengan existing data (dummy update)
        return { ...student, ...data.updates }
      }
      
      // TODO: Implement real API call
      throw new Error('Real API not implemented yet')
    },
    onSuccess: (data) => {
      // Invalidate queries agar data ter-update
      queryClient.invalidateQueries({ queryKey: ['student', data.id] })
      queryClient.invalidateQueries({ queryKey: ['students'] })
    }
  })
}
