import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import api from '../lib/axios'
import type { Question } from '../types'

// Data dummy untuk development
const DUMMY_QUESTIONS: Question[] = [
  {
    id: '1',
    topicId: '1',
    difficulty: 1,
    type: 'mcq',
    content: {
      text: 'Berapa hasil dari 2 + 3?',
      image: '',
      latex: ''
    },
    options: [
      { id: 'A', value: '4', isCorrect: false },
      { id: 'B', value: '5', isCorrect: true },
      { id: 'C', value: '6', isCorrect: false },
      { id: 'D', value: '7', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: 'Karena 2 ditambah 3 sama dengan 5'
  },
  {
    id: '2',
    topicId: '1',
    difficulty: 2,
    type: 'mcq',
    content: {
      text: 'Hasil dari 10 - 4 adalah?',
      image: '',
      latex: ''
    },
    options: [
      { id: 'A', value: '5', isCorrect: false },
      { id: 'B', value: '6', isCorrect: true },
      { id: 'C', value: '7', isCorrect: false },
      { id: 'D', value: '8', isCorrect: false }
    ],
    correctAnswer: 'B',
    explanation: '10 dikurangi 4 adalah 6'
  },
  {
    id: '3',
    topicId: '2',
    difficulty: 1,
    type: 'mcq',
    content: {
      text: '3 × 4 = ?',
      image: '',
      latex: ''
    },
    options: [
      { id: 'A', value: '10', isCorrect: false },
      { id: 'B', value: '11', isCorrect: false },
      { id: 'C', value: '12', isCorrect: true },
      { id: 'D', value: '13', isCorrect: false }
    ],
    correctAnswer: 'C',
    explanation: '3 dikali 4 sama dengan 12'
  }
]

const USE_DUMMY_DATA = true // Set ke false jika backend sudah siap

export function useQuestions(topicId?: string) {
  return useQuery<Question[]>({
    queryKey: ['questions', topicId],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        if (topicId) {
          return DUMMY_QUESTIONS.filter(q => q.topicId === topicId)
        }
        return DUMMY_QUESTIONS
      }
      const params = topicId ? `?topic_id=${topicId}` : ''
      const { data } = await api.get(`/admin/questions${params}`)
      return data
    },
    enabled: !!topicId // Only fetch if topicId is provided
  })
}

export function useQuestion(id: string) {
  return useQuery<Question>({
    queryKey: ['questions', id],
    queryFn: async () => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        const question = DUMMY_QUESTIONS.find(q => q.id === id)
        if (!question) throw new Error('Soal tidak ditemukan')
        return question
      }
      const { data } = await api.get(`/admin/questions/${id}`)
      return data
    },
    enabled: !!id
  })
}

export function useCreateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (questionData: Partial<Question>) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        const newQuestion: Question = {
          id: String(Date.now()),
          topicId: questionData.topicId!,
          difficulty: questionData.difficulty!,
          type: questionData.type!,
          content: questionData.content!,
          options: questionData.options || [],
          correctAnswer: questionData.correctAnswer,
          explanation: questionData.explanation || ''
        }
        return newQuestion
      }
      const { data } = await api.post('/admin/questions', questionData)
      return data
    },
    onSuccess: (newQuestion) => {
      toast.success('Soal berhasil ditambahkan')
      if (USE_DUMMY_DATA) {
        queryClient.setQueryData<Question[]>(['questions', newQuestion.topicId], (old) => 
          old ? [...old, newQuestion] : [newQuestion]
        )
      } else {
        queryClient.invalidateQueries({ queryKey: ['questions'] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal menambahkan soal'
      toast.error(message)
    }
  })
}

export function useUpdateQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }: { id: string, data: Partial<Question> }) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 500))
        return { id, ...data }
      }
      const response = await api.put(`/admin/questions/${id}`, data)
      return response.data
    },
    onSuccess: (_, variables) => {
      toast.success('Soal berhasil diupdate')
      if (USE_DUMMY_DATA) {
        const topicId = (variables.data as Question).topicId
        queryClient.setQueryData<Question[]>(['questions', topicId], (old) => 
          old ? old.map(question => 
            question.id === variables.id ? { ...question, ...variables.data } : question
          ) : []
        )
        queryClient.invalidateQueries({ queryKey: ['questions', variables.id] })
      } else {
        queryClient.invalidateQueries({ queryKey: ['questions'] })
        queryClient.invalidateQueries({ queryKey: ['questions', variables.id] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal mengupdate soal'
      toast.error(message)
    }
  })
}

export function useDeleteQuestion() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      if (USE_DUMMY_DATA) {
        await new Promise(resolve => setTimeout(resolve, 300))
        return
      }
      await api.delete(`/admin/questions/${id}`)
    },
    onSuccess: (_, id) => {
      toast.success('Soal dihapus')
      if (USE_DUMMY_DATA) {
        // Find the question to get topicId
        const allQuestions = DUMMY_QUESTIONS
        const question = allQuestions.find(q => q.id === id)
        if (question) {
          queryClient.setQueryData<Question[]>(['questions', question.topicId], (old) => 
            old ? old.filter(q => q.id !== id) : []
          )
        }
      } else {
        queryClient.invalidateQueries({ queryKey: ['questions'] })
      }
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Gagal menghapus soal'
      toast.error(message)
    }
  })
}
