import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useStudent, useUpdateStudent } from '../../hooks/useStudents'
import { Button } from '../../components/ui/Button'
import StudentForm from './components/StudentForm'

export default function EditStudent() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const { data: student, isLoading: loadingStudent, error: errorStudent } = useStudent(id || '')
  const { mutate: updateStudent, isPending } = useUpdateStudent()

  const handleSubmit = async (formData: any) => {
    if (!id) return

    updateStudent(
      {
        studentId: id,
        updates: formData
      },
      {
        onSuccess: () => {
          alert('Data siswa berhasil diperbarui!')
          navigate(`/dashboard/students/${id}`)
        },
        onError: (error: any) => {
          alert(`Error: ${error.message}`)
        }
      }
    )
  }

  if (loadingStudent) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="animate-pulse">Loading data siswa...</div>
      </div>
    )
  }

  if (errorStudent) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="text-red-600 mb-4">Error: {errorStudent.message}</div>
        <Button onClick={() => navigate('/dashboard/parents')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>
    )
  }

  if (!student) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="text-red-600 mb-4">Data siswa tidak ditemukan</div>
        <Button onClick={() => navigate('/dashboard/parents')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded shadow">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/dashboard/students/${id}`)}
          className="mb-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit Siswa: {student.displayName}
        </h1>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow max-w-2xl">
        <StudentForm
          initialData={student}
          onSubmit={handleSubmit}
          isLoading={isPending}
          onCancel={() => navigate(`/dashboard/students/${id}`)}
        />
      </div>
    </div>
  )
}
