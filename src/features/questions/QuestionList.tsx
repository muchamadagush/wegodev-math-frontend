import { useState } from 'react'
import { Plus, Trash2, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import { useQuestions, useDeleteQuestion } from '../../hooks/useQuestions'
import { useTopics } from '../../hooks/useCurriculum'

const difficultyLabels = {
  1: 'Mudah',
  2: 'Sedang',
  3: 'Sulit'
}

const difficultyColors = {
  1: 'bg-green-100 text-green-700',
  2: 'bg-yellow-100 text-yellow-700',
  3: 'bg-red-100 text-red-700'
}

const typeLabels = {
  'mcq': 'Pilihan Ganda',
  'fill_in': 'Isian'
}

export default function QuestionList() {
  const navigate = useNavigate()
  const [selectedTopicId, setSelectedTopicId] = useState<string>('')
  
  const { data: topics } = useTopics()
  const { data: questions, isLoading, error } = useQuestions(selectedTopicId)
  const deleteQuestion = useDeleteQuestion()

  const handleDelete = (id: string) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus soal ini?')) {
      deleteQuestion.mutate(id)
    }
  }

  return (
    <div className="text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Bank Soal</h1>
        <Button 
          onClick={() => navigate('/dashboard/questions/new')}
          disabled={!selectedTopicId}
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Soal
        </Button>
      </div>

      {/* Filter Topik */}
      <div className="mb-6 max-w-md">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pilih Topik <span className="text-red-500">*</span>
        </label>
        <select
          value={selectedTopicId}
          onChange={(e) => setSelectedTopicId(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Pilih Topik --</option>
          {topics?.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name} (Kelas {topic.gradeLevel})
            </option>
          ))}
        </select>
      </div>

      {!selectedTopicId && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-500">Silakan pilih topik terlebih dahulu untuk melihat daftar soal</p>
        </div>
      )}

      {selectedTopicId && isLoading && (
        <div className="p-8 text-center">
          <p className="text-gray-600">Memuat data soal...</p>
        </div>
      )}

      {selectedTopicId && error && (
        <div className="p-8 text-center">
          <p className="text-red-600">Gagal memuat data soal</p>
        </div>
      )}

      {selectedTopicId && !isLoading && !error && questions && (
        <>
          {questions.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-500">Belum ada soal untuk topik ini</p>
              <Button 
                onClick={() => navigate('/dashboard/questions/new')}
                className="mt-4"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Soal Pertama
              </Button>
            </div>
          ) : (
            <Table headers={['Preview Soal', 'Tipe', 'Kesulitan', 'Aksi']}>
              {questions.map(question => (
                <tr key={question.id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 max-w-md">
                    <p className="truncate">{question.content.text}</p>
                  </td>
                  <td className="px-3 py-2">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      {typeLabels[question.type]}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${difficultyColors[question.difficulty]}`}>
                      {difficultyLabels[question.difficulty]}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => navigate(`/dashboard/questions/${question.id}/edit`)}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDelete(question.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
          )}
        </>
      )}
    </div>
  )
}
