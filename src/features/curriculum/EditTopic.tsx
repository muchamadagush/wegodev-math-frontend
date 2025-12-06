import { useParams, useNavigate } from 'react-router-dom'
import TopicForm from './TopicForm'
import { useTopic, useUpdateTopic } from '../../hooks/useCurriculum'
import type { Topic } from '../../types'

export default function EditTopic() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { data: topic, isLoading, error } = useTopic(id!)
  const updateTopic = useUpdateTopic()

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Memuat data topik...</p>
      </div>
    )
  }

  if (error || !topic) {
    return (
      <div className="p-8 text-center">
        <p className="text-red-600">Topik tidak ditemukan</p>
      </div>
    )
  }

  const handleSubmit = (data: Partial<Topic>) => {
    updateTopic.mutate(
      { id: id!, data },
      {
        onSuccess: () => {
          navigate('/dashboard/curriculum')
        }
      }
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Edit Topik</h1>
      <TopicForm 
        initialData={topic}
        onSubmit={handleSubmit}
        isLoading={updateTopic.isPending}
      />
    </div>
  )
}
