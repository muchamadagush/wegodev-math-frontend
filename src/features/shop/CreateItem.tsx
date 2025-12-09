import { useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ItemForm from './components/ItemForm'
import { useCreateItem } from '../../hooks/useItems'

export default function CreateItem() {
  const navigate = useNavigate()
  const createItem = useCreateItem()

  const handleSubmit = async (data: any) => {
    createItem.mutate(data, {
      onSuccess: () => {
        navigate('/dashboard/shop')
      },
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard/shop')}
          className="inline-flex items-center gap-1 rounded px-2 py-1 text-gray-600 hover:bg-gray-200"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Tambah Item Baru</h1>
          <p className="mt-2 text-gray-600">Buat item avatar baru untuk toko</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-lg bg-white shadow-sm p-6">
        <ItemForm
          onSubmit={handleSubmit}
          isLoading={createItem.isPending}
          onCancel={() => navigate('/dashboard/shop')}
        />
      </div>
    </div>
  )
}
