import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useParentById } from '../../hooks/useParents'
import { useStudentsByParent } from '../../hooks/useStudents'
import { formatDate } from '../../utils/date'
import { Button } from '../../components/ui/Button'

export default function ParentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const { data: parent, isLoading: loadingParent, error: errorParent } = useParentById(id || '')
  const { data: students, isLoading: loadingStudents } = useStudentsByParent(id || '')

  if (loadingParent) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="animate-pulse">Loading data keluarga...</div>
      </div>
    )
  }

  if (errorParent) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="text-red-600">Error: {errorParent.message}</div>
        <Button onClick={() => navigate('/dashboard/users/parents')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>
    )
  }

  if (!parent) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="text-red-600">Data orang tua tidak ditemukan</div>
        <Button onClick={() => navigate('/dashboard/users/parents')} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
      </div>
    )
  }

  // Helper function untuk status badge
  const getStatusBadge = (status: string) => {
    const styles = {
      active: 'bg-green-100 text-green-800 border-green-300',
      expired: 'bg-red-100 text-red-800 border-red-300',
      past_due: 'bg-orange-100 text-orange-800 border-orange-300',
      none: 'bg-gray-100 text-gray-800 border-gray-300'
    }
    
    const labels = {
      active: 'Aktif',
      expired: 'Kedaluwarsa',
      past_due: 'Tertunggak',
      none: 'Tidak Ada'
    }
    
    return (
      <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded shadow">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/dashboard/users/parents')}
          className="mb-3"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Kembali
        </Button>
        <h1 className="text-2xl font-bold text-gray-900">
          Detail Keluarga {parent.fullName}
        </h1>
      </div>

      {/* Info Parent */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          👤 Informasi Orang Tua
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Nama Lengkap</p>
            <p className="font-medium text-gray-900">{parent.fullName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium text-gray-900">{parent.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">No. Telepon</p>
            <p className="font-medium text-gray-900">{parent.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Jumlah Anak</p>
            <p className="font-medium text-gray-900">{parent.childrenIds?.length || 0} Anak</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Terdaftar</p>
            <p className="font-medium text-gray-900">{formatDate(parent.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* List Anak */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          👨‍👩‍👧‍👦 Daftar Anak
        </h2>

        {loadingStudents ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-pulse">Loading data anak...</div>
          </div>
        ) : !students || students.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada data anak terdaftar
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {students.map((student) => (
              <div
                key={student.id}
                className="bg-gradient-to-br from-blue-50 to-purple-50 border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Avatar & Nama */}
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
                    {student.displayName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">
                      {student.displayName}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Kelas {student.grade} • {student.username}
                    </p>
                  </div>
                </div>

                {/* Sekolah */}
                <div className="mb-4">
                  <p className="text-xs text-gray-500">Sekolah</p>
                  <p className="text-sm font-medium text-gray-700">{student.schoolName}</p>
                </div>

                {/* Status Subscription */}
                <div className="mb-4 bg-white rounded-lg p-3 border border-gray-200">
                  <p className="text-xs text-gray-500 mb-2">Status Langganan</p>
                  <div className="flex items-center justify-between mb-2">
                    {getStatusBadge(student.subStatus)}
                  </div>
                  
                  {student.subPlanId && (
                    <p className="text-xs text-gray-600 mb-1">
                      Paket: <span className="font-medium">{student.subPlanId}</span>
                    </p>
                  )}
                  
                  {student.subValidUntil && (
                    <p className="text-xs text-gray-600">
                      {student.subStatus === 'active' ? 'Berlaku sampai' : 'Berakhir pada'}: 
                      <span className="font-medium ml-1">{formatDate(student.subValidUntil)}</span>
                    </p>
                  )}
                  
                  {student.subStatus === 'active' && student.subValidUntil && (
                    <p className="text-xs text-green-600 mt-1">
                      {Math.ceil((student.subValidUntil - Date.now()) / (1000 * 60 * 60 * 24))} hari lagi
                    </p>
                  )}
                  
                  {student.subStatus === 'expired' && student.subValidUntil && (
                    <p className="text-xs text-red-600 mt-1">
                      {Math.abs(Math.ceil((student.subValidUntil - Date.now()) / (1000 * 60 * 60 * 24)))} hari lalu
                    </p>
                  )}
                </div>

                {/* Stats Gamification */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-white rounded p-2 text-center border border-yellow-200">
                    <p className="text-xs text-gray-500">Koin</p>
                    <p className="font-bold text-yellow-600">{student.coins}</p>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-purple-200">
                    <p className="text-xs text-gray-500">XP</p>
                    <p className="font-bold text-purple-600">{student.xpTotal.toLocaleString()}</p>
                  </div>
                  <div className="bg-white rounded p-2 text-center border border-blue-200">
                    <p className="text-xs text-gray-500">Level</p>
                    <p className="font-bold text-blue-600">{student.level}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => navigate(`/dashboard/students/${student.id}`)}
                    className="flex-1 text-xs"
                  >
                    Lihat Detail
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => {
                      // TODO: Implement edit student
                      alert('Fitur Edit Anak akan segera hadir')
                    }}
                    className="flex-1 text-xs"
                  >
                    Edit Anak
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
