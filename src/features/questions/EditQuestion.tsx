import { useParams, useNavigate } from 'react-router-dom'
import QuestionForm from './QuestionForm'
import { useQuestion, useUpdateQuestion } from '../../hooks/useQuestions'
import type { Question } from '../../types'

export default function EditQuestion() {
  try {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()
    
    // Add safety check
    if (!id) {
      return (
        <div className="p-8 text-center text-gray-900">
          <p className="text-red-600">ID soal tidak ditemukan di URL</p>
        </div>
      )
    }

    const { data: question, isLoading, error } = useQuestion(id)
    const updateQuestion = useUpdateQuestion()

    if (isLoading) {
      return (
        <div className="p-8 text-center text-gray-900">
          <p className="text-gray-600">Memuat data soal...</p>
        </div>
      )
    }

    if (error || !question) {
      return (
        <div className="p-8 text-center text-gray-900">
          <p className="text-red-600">Soal tidak ditemukan (ID: {id})</p>
          <button 
            onClick={() => navigate('/dashboard/questions')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Kembali ke Daftar Soal
          </button>
        </div>
      )
    }

    const handleSubmit = (data: Partial<Question>) => {
      updateQuestion.mutate(
        { id, data },
        {
          onSuccess: () => {
            navigate('/dashboard/questions')
          }
        }
      )
    }

    return (
      <div className="text-gray-900">
        <h1 className="text-2xl font-semibold mb-6">Edit Soal (ID: {id})</h1>
        <QuestionForm 
          initialData={question}
          onSubmit={handleSubmit}
          isLoading={updateQuestion.isPending}
        />
      </div>
    )
  } catch (err) {
    console.error('EditQuestion error:', err)
    return (
      <div className="p-8 text-center text-gray-900">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Error</h1>
        <p className="text-red-600 mb-4">Terjadi kesalahan saat memuat halaman</p>
        <pre className="text-left bg-gray-100 p-4 rounded overflow-auto text-sm">
          {String(err)}
        </pre>
      </div>
    )
  }
}
