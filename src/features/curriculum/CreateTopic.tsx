import { useNavigate } from 'react-router-dom'
import TopicForm from './TopicForm'
import { useCreateTopic } from '../../hooks/useCurriculum'
import type { Topic } from '../../types'

export default function CreateTopic() {
  const navigate = useNavigate()
  const createTopic = useCreateTopic()

  const handleSubmit = (data: Partial<Topic>) => {
    createTopic.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard/curriculum')
      }
    })
  }

  return (
    <div>
      <h1 className="text-2xl font-semibold mb-6">Tambah Topik Baru</h1>
      <TopicForm 
        onSubmit={handleSubmit}
        isLoading={createTopic.isPending}
      />
    </div>
  )
}
