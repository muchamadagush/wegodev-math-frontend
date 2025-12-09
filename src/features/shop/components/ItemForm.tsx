import { useState } from 'react'
import { Button } from '../../../components/ui/Button'
import type { Item } from '../../../types'

interface ItemFormProps {
  initialData?: Item
  onSubmit: (data: Partial<Item>) => Promise<void>
  isLoading?: boolean
  onCancel?: () => void
}

type FormData = Partial<Item>

export default function ItemForm({ initialData, onSubmit, isLoading, onCancel }: ItemFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: initialData?.name || '',
    type: initialData?.type || 'head',
    costCoins: initialData?.costCoins || 0,
    assetUrl: initialData?.assetUrl || '',
    isPremium: initialData?.isPremium || false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewUrl, setPreviewUrl] = useState(initialData?.assetUrl || '')

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name || formData.name.trim() === '') {
      newErrors.name = 'Nama item diperlukan'
    }

    if (!formData.type) {
      newErrors.type = 'Tipe item diperlukan'
    }

    if (formData.costCoins === undefined || formData.costCoins < 0) {
      newErrors.costCoins = 'Harga harus 0 atau lebih'
    }

    if (!formData.assetUrl || formData.assetUrl.trim() === '') {
      newErrors.assetUrl = 'URL gambar diperlukan'
    } else if (!formData.assetUrl.startsWith('http://') && !formData.assetUrl.startsWith('https://')) {
      newErrors.assetUrl = 'URL harus dimulai dengan http:// atau https://'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return
    await onSubmit(formData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const inputElement = e.target as HTMLInputElement

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === 'checkbox' ? inputElement.checked : type === 'number' ? Number(value) : value,
    }))

    // Update preview URL jika asset URL berubah
    if (name === 'assetUrl') {
      setPreviewUrl(value)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {/* Nama Item */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Nama Item</label>
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          onChange={handleChange}
          placeholder="Contoh: Topi Wisuda"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
      </div>

      {/* Tipe Item */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tipe Item</label>
        <select
          name="type"
          value={formData.type || 'head'}
          onChange={handleChange}
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <option value="head">Kepala (Head)</option>
          <option value="outfit">Pakaian (Outfit)</option>
          <option value="background">Latar Belakang (Background)</option>
        </select>
        {errors.type && <p className="mt-1 text-sm text-red-600">{errors.type}</p>}
      </div>

      {/* Harga Koin */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Harga (Koin)</label>
        <input
          type="number"
          name="costCoins"
          value={formData.costCoins || 0}
          onChange={handleChange}
          placeholder="500"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.costCoins && <p className="mt-1 text-sm text-red-600">{errors.costCoins}</p>}
      </div>

      {/* Premium Only */}
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          name="isPremium"
          checked={formData.isPremium || false}
          onChange={handleChange}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">Hanya untuk Subscriber (Premium)</label>
      </div>

      {/* Asset URL */}
      <div>
        <label className="block text-sm font-medium text-gray-700">URL Gambar</label>
        <input
          type="url"
          name="assetUrl"
          value={formData.assetUrl || ''}
          onChange={handleChange}
          placeholder="https://example.com/image.png"
          className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        {errors.assetUrl && <p className="mt-1 text-sm text-red-600">{errors.assetUrl}</p>}
      </div>

      {/* Preview Gambar */}
      {previewUrl && (
        <div className="rounded-lg bg-gray-50 p-4">
          <p className="mb-3 text-sm font-medium text-gray-700">Preview Gambar</p>
          <div className="flex items-center justify-center">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 max-w-48 rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.src = 'https://via.placeholder.com/100?text=Invalid'
              }}
            />
          </div>
        </div>
      )}

      {/* Buttons */}
      <div className="flex gap-3 pt-6">
        <Button type="submit" disabled={isLoading} className="flex-1">
          {isLoading ? 'Menyimpan...' : 'Simpan Item'}
        </Button>
        {onCancel && (
          <Button type="button" onClick={onCancel} className="flex-1">
            Batal
          </Button>
        )}
      </div>
    </form>
  )
}
