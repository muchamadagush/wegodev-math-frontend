import { Plus, Trash2, Pencil, Star } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Table } from '../../components/ui/Table'
import Button from '../../components/ui/Button'
import { useSubscriptionPlans, useDeletePlan } from '../../hooks/useSubscriptions'

const formatRupiah = (price: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(price)
}

export default function PlanList() {
  const navigate = useNavigate()
  const { data: plans, isLoading, error } = useSubscriptionPlans()
  const deletePlan = useDeletePlan()

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
        <p className="text-red-600">Gagal memuat data paket langganan</p>
      </div>
    )
  }

  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus paket "${name}"?`)) {
      deletePlan.mutate(id)
    }
  }

  return (
    <div className="text-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Manajemen Paket Langganan</h1>
        <Button onClick={() => navigate('/dashboard/subscriptions/new')}>
          <Plus className="w-4 h-4 mr-2" />
          Tambah Paket
        </Button>
      </div>

      <Table headers={['Nama Paket', 'Harga', 'Harga Asli', 'Durasi', 'Status', 'Aksi']}>
        {plans?.map(plan => (
          <tr key={plan.id} className="hover:bg-gray-50">
            <td className="px-3 py-2">
              <div className="flex items-center gap-2">
                {plan.name}
                {plan.isRecomended && (
                  <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                )}
              </div>
            </td>
            <td className="px-3 py-2 font-semibold text-green-600">
              {formatRupiah(plan.price)}
            </td>
            <td className="px-3 py-2 text-gray-500 line-through">
              {formatRupiah(plan.originalPrice || plan.price)}
            </td>
            <td className="px-3 py-2">
              {plan.durationDays} hari
            </td>
            <td className="px-3 py-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                plan.isActive 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </td>
            <td className="px-3 py-2">
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate(`/dashboard/subscriptions/${plan.id}/edit`)}
                >
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(plan.id, plan.name)}
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
