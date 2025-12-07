import { useNavigate } from 'react-router-dom'
import QuestionForm from './QuestionForm'
import { useCreateQuestion } from '../../hooks/useQuestions'
import type { Question } from '../../types'

export default function CreateQuestion() {
  const navigate = useNavigate()
  const createQuestion = useCreateQuestion()

  const handleSubmit = (data: Partial<Question>) => {
    createQuestion.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard/questions')
      }
    })
  }

  return (
    <div className="text-gray-900">
      <h1 className="text-2xl font-semibold mb-6">Tambah Soal Baru</h1>
      <QuestionForm 
        onSubmit={handleSubmit}
        isLoading={createQuestion.isPending}
      />
    </div>
  )
}
