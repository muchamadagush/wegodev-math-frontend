import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Edit2 } from 'lucide-react'
import { useStudent, useStudentInventory } from '../../hooks/useStudents'
import { formatDate } from '../../utils/date'
import { Button } from '../../components/ui/Button'

export default function StudentProfile() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const { data: student, isLoading: loadingStudent, error: errorStudent } = useStudent(id || '')
  const { data: inventory, isLoading: loadingInventory } = useStudentInventory(id || '')

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

  // Helper function untuk type badge
  const getTypeBadge = (type: string) => {
    const styles = {
      head: 'bg-purple-100 text-purple-800',
      outfit: 'bg-blue-100 text-blue-800',
      background: 'bg-green-100 text-green-800'
    }
    
    const labels = {
      head: 'Kepala',
      outfit: 'Pakaian',
      background: 'Latar'
    }
    
    return (
      <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${styles[type as keyof typeof styles]}`}>
        {labels[type as keyof typeof labels]}
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded shadow">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/dashboard/parents')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Kembali
          </Button>
          <Button
            size="sm"
            onClick={() => navigate(`/dashboard/students/${id}/edit`)}
          >
            <Edit2 className="w-4 h-4 mr-2" />
            Edit Siswa
          </Button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {student.displayName}
        </h1>
      </div>

      {/* Profil Header dengan Avatar Besar */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow p-8 text-white">
        <div className="flex items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-4xl font-bold text-blue-600 shadow-lg">
            {student.displayName.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-blue-100 text-sm">Username: <span className="font-medium">{student.username}</span></p>
            <p className="text-white text-lg font-semibold mt-1">{student.displayName}</p>
            <p className="text-blue-100 text-sm mt-1">Kelas {student.grade} • {student.schoolName}</p>
            <p className="text-blue-100 text-sm mt-2">Terdaftar: {formatDate(student.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* XP Total */}
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total XP</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {student.xpTotal.toLocaleString()}
              </p>
            </div>
            <div className="text-5xl">⭐</div>
          </div>
        </div>

        {/* Level */}
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Level</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {student.level}
              </p>
            </div>
            <div className="text-5xl">🏆</div>
          </div>
        </div>

        {/* Koin */}
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Koin</p>
              <p className="text-3xl font-bold text-yellow-600 mt-2">
                {student.coins.toLocaleString()}
              </p>
            </div>
            <div className="text-5xl">🪙</div>
          </div>
        </div>

        {/* Daily Streak */}
        <div className="bg-white p-6 rounded shadow hover:shadow-lg transition">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Streak Hari</p>
              <p className="text-3xl font-bold text-orange-600 mt-2">
                7
              </p>
            </div>
            <div className="text-5xl">🔥</div>
          </div>
        </div>
      </div>

      {/* Subscription Card */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          💎 Status Langganan
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-500 mb-2">Status Paket</p>
            {getStatusBadge(student.subStatus)}
            
            {student.subPlanId && (
              <div className="mt-4">
                <p className="text-sm text-gray-500">Nama Paket</p>
                <p className="font-medium text-gray-900 text-lg mt-1">
                  {student.subPlanId}
                </p>
              </div>
            )}
          </div>

          <div>
            {student.subStatus === 'active' && student.subValidUntil && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium mb-2">Berlaku Sampai</p>
                <p className="text-2xl font-bold text-green-800">
                  {formatDate(student.subValidUntil)}
                </p>
                <p className="text-sm text-green-600 mt-3">
                  ✓ {Math.ceil((student.subValidUntil - Date.now()) / (1000 * 60 * 60 * 24))} hari lagi
                </p>
              </div>
            )}

            {student.subStatus === 'expired' && student.subValidUntil && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-gray-700 font-medium mb-2">Kedaluwarsa Sejak</p>
                <p className="text-2xl font-bold text-red-800">
                  {formatDate(student.subValidUntil)}
                </p>
                <p className="text-sm text-red-600 mt-3">
                  ✗ {Math.abs(Math.ceil((student.subValidUntil - Date.now()) / (1000 * 60 * 60 * 24)))} hari lalu
                </p>
              </div>
            )}

            {student.subStatus === 'none' && (
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-sm text-gray-600 text-center py-8">
                  Belum berlangganan paket apapun
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Inventory Tabel */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          🎒 Inventory Item
        </h2>
        
        {loadingInventory ? (
          <div className="text-center py-8 text-gray-500">
            <div className="animate-pulse">Loading inventory...</div>
          </div>
        ) : !inventory || inventory.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Belum ada item dalam inventory
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b bg-gray-50">
                  <th className="p-3 text-gray-700">Nama Item</th>
                  <th className="p-3 text-gray-700">Tipe</th>
                  <th className="p-3 text-gray-700">Harga Koin</th>
                  <th className="p-3 text-gray-700">Premium</th>
                  <th className="p-3 text-gray-700">Tanggal Didapat</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((inv) => (
                  <tr key={inv.id} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-medium text-gray-900">
                      {inv.item?.name || 'Unknown'}
                    </td>
                    <td className="p-3">
                      {inv.item?.type && getTypeBadge(inv.item.type)}
                    </td>
                    <td className="p-3 text-gray-700">
                      {inv.item?.costCoins.toLocaleString() || '-'} 🪙
                    </td>
                    <td className="p-3">
                      {inv.item?.isPremium ? (
                        <span className="text-yellow-600 font-medium">⭐ Ya</span>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="p-3 text-gray-700">
                      {formatDate(inv.acquiredAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* History Table (Optional) */}
      <div className="bg-white p-6 rounded shadow">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 border-b pb-2">
          📊 Riwayat Pengerjaan Soal
        </h2>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="p-3 text-gray-700">Topik</th>
                <th className="p-3 text-gray-700">Tingkat</th>
                <th className="p-3 text-gray-700">Hasil</th>
                <th className="p-3 text-gray-700">Waktu</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-900">Penjumlahan Bilangan Cacah</td>
                <td className="p-3"><span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">Mudah</span></td>
                <td className="p-3"><span className="text-green-600 font-medium">✓ Benar</span></td>
                <td className="p-3 text-gray-700">7 Desember 2025</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-900">Pengurangan Bilangan Cacah</td>
                <td className="p-3"><span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium">Sedang</span></td>
                <td className="p-3"><span className="text-red-600 font-medium">✗ Salah</span></td>
                <td className="p-3 text-gray-700">6 Desember 2025</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="p-3 text-gray-900">Perkalian Bilangan Cacah</td>
                <td className="p-3"><span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs font-medium">Sulit</span></td>
                <td className="p-3"><span className="text-green-600 font-medium">✓ Benar</span></td>
                <td className="p-3 text-gray-700">5 Desember 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
