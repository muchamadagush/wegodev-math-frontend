import { Plus, Trash2, Pencil } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import { useTopics, useDeleteTopic } from '../../hooks/useCurriculum'

export default function Curriculum() {
  const navigate = useNavigate()
  const { data: topics, isLoading, error } = useTopics()
  const deleteTopic = useDeleteTopic()

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Memuat data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Gagal memuat data kurikulum</p>
      </div>
    )
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus topik "${name}"?`)) {
      deleteTopic.mutate(id)
    }
  }

  return (
    <div className="text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manajemen Kurikulum</h1>
        <Button onClick={() => navigate('/dashboard/curriculum/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Topik
        </Button>
      </div>

      <Table headers={['Nama Topik', 'Jenjang', 'Mapel', 'Jml Soal', 'Aksi']}>
        {topics?.map(topic => (
          <tr key={topic.id} className="hover:bg-gray-50">
            <td className="px-3 py-2">{topic.name}</td>
            <td className="px-3 py-2">Kelas {topic.grade_level}</td>
            <td className="px-3 py-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                topic.subject === 'math' 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-green-100 text-green-700'
              }`}>
                {topic.subject === 'math' ? 'Matematika' : 'Sains'}
              </span>
            </td>
            <td className="px-3 py-2">{topic.question_count || 0}</td>
            <td className="px-3 py-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/dashboard/curriculum/${topic.id}/edit`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(topic.id, topic.name)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  )
}
