import { useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import ItemForm from './components/ItemForm'
import { useItem, useUpdateItem } from '../../hooks/useItems'

export default function EditItem() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  const { data: item, isLoading: itemLoading } = useItem(id || '')
  const updateItem = useUpdateItem()

  const handleSubmit = async (data: any) => {
    if (!id) return
    updateItem.mutate(
      { itemId: id, updates: data },
      {
        onSuccess: () => {
          navigate('/dashboard/shop')
        },
      }
    )
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
          <h1 className="text-3xl font-bold text-gray-900">Edit Item</h1>
          <p className="mt-2 text-gray-600">Ubah detail item</p>
        </div>
      </div>

      {/* Form */}
      <div className="rounded-lg bg-white shadow-sm p-6">
        {itemLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Memuat data...</div>
          </div>
        ) : !item ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-gray-500">Item tidak ditemukan</div>
          </div>
        ) : (
          <ItemForm
            initialData={item}
            onSubmit={handleSubmit}
            isLoading={updateItem.isPending}
            onCancel={() => navigate('/dashboard/shop')}
          />
        )}
      </div>
    </div>
  )
}
