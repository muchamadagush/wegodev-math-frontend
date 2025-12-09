import { useNavigate } from 'react-router-dom'
import { Edit2, Trash2, Plus, Coins } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useItems, useDeleteItem } from '../../hooks/useItems'
import { formatDate } from '../../utils/date'

export default function ItemList() {
  const navigate = useNavigate()
  const { data: items, isLoading } = useItems()
  const deleteItem = useDeleteItem()

  const handleDelete = (itemId: string, itemName: string) => {
    if (confirm(`Hapus item "${itemName}"?`)) {
      deleteItem.mutate(itemId)
    }
  }

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case 'head':
        return 'bg-blue-100 text-blue-700'
      case 'outfit':
        return 'bg-purple-100 text-purple-700'
      case 'background':
        return 'bg-amber-100 text-amber-700'
      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'head':
        return 'Kepala'
      case 'outfit':
        return 'Pakaian'
      case 'background':
        return 'Latar'
      default:
        return type
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      {/* Header */}
      <div className="mb-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manajemen Toko Item</h1>
          <p className="mt-2 text-gray-600">Kelola item avatar yang tersedia di toko</p>
        </div>

        <Button onClick={() => navigate('/dashboard/shop/new')} className="flex items-center gap-2">
          <Plus size={18} />
          Tambah Item
        </Button>
      </div>

      {/* Table */}
      <div className="rounded-lg bg-white shadow-sm overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-gray-500">Memuat data...</div>
          </div>
        ) : !items || items.length === 0 ? (
          <div className="flex items-center justify-center p-12">
            <div className="text-center">
              <p className="text-gray-500">Belum ada item</p>
              <Button
                onClick={() => navigate('/dashboard/shop/new')}
                className="mt-4 flex items-center gap-2 mx-auto"
              >
                <Plus size={18} />
                Buat Item Pertama
              </Button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-gray-200 bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Nama
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Tipe
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Harga
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Premium
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Dibuat
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-700">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((item: any) => (
                  <tr key={item.id} className="hover:bg-gray-50 transition">
                    {/* Preview */}
                    <td className="px-6 py-4">
                      <img
                        src={item.assetUrl}
                        alt={item.name}
                        className="h-10 w-10 rounded object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://via.placeholder.com/40?text=No+Image'
                        }}
                      />
                    </td>

                    {/* Nama */}
                    <td className="px-6 py-4">
                      <p className="font-medium text-gray-900">{item.name}</p>
                    </td>

                    {/* Tipe */}
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getTypeBadgeColor(item.type)}`}>
                        {getTypeLabel(item.type)}
                      </span>
                    </td>

                    {/* Harga */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <Coins size={16} className="text-yellow-600" />
                        <span className="font-medium text-gray-900">{item.costCoins}</span>
                      </div>
                    </td>

                    {/* Premium */}
                    <td className="px-6 py-4">
                      <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        item.isPremium
                          ? 'bg-purple-100 text-purple-700'
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {item.isPremium ? 'Ya' : 'Tidak'}
                      </span>
                    </td>

                    {/* Dibuat */}
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-500">{formatDate(item.createdAt)}</p>
                    </td>

                    {/* Aksi */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/shop/${item.id}/edit`)}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-blue-600 hover:bg-blue-50"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id, item.name)}
                          disabled={deleteItem.isPending}
                          className="inline-flex items-center gap-1 rounded px-2 py-1 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
                        >
                          <Trash2 size={16} />
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
