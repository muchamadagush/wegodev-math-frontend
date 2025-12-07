import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, X } from 'lucide-react'
import Button from '../../components/ui/Button'
import type { SubscriptionPlan } from '../../types'

interface PlanFormProps {
  initialData?: SubscriptionPlan
  onSubmit: (data: Partial<SubscriptionPlan>) => void
  isLoading?: boolean
}

export default function PlanForm({ initialData, onSubmit, isLoading }: PlanFormProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    price: initialData?.price || 0,
    original_price: initialData?.original_price || 0,
    duration_days: initialData?.duration_days || 30,
    is_active: initialData?.is_active ?? true,
    is_recommended: initialData?.is_recommended ?? false
  })
  
  const [features, setFeatures] = useState<string[]>(initialData?.features || [''])

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        slug: initialData.slug,
        price: initialData.price,
        original_price: initialData.original_price,
        duration_days: initialData.duration_days,
        is_active: initialData.is_active,
        is_recommended: initialData.is_recommended
      })
      setFeatures(initialData.features.length > 0 ? initialData.features : [''])
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const filteredFeatures = features.filter(f => f.trim() !== '')
    onSubmit({ ...formData, features: filteredFeatures })
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }))
  }

  const addFeature = () => {
    setFeatures([...features, ''])
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Paket <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Contoh: Premium Monthly"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Slug <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.slug}
          onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50"
          required
          placeholder="premium-monthly"
        />
        <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (auto-generated dari nama)</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga (IDR) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.price}
            onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            placeholder="50000"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Harga Asli (IDR) <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={formData.original_price}
            onChange={(e) => setFormData(prev => ({ ...prev, original_price: Number(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            min="0"
            placeholder="75000"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Durasi (Hari) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={formData.duration_days}
          onChange={(e) => setFormData(prev => ({ ...prev, duration_days: Number(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          min="1"
          placeholder="30"
        />
        <p className="text-xs text-gray-500 mt-1">Contoh: 30 untuk bulanan, 365 untuk tahunan</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Fitur-fitur <span className="text-red-500">*</span>
        </label>
        <div className="space-y-2">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => updateFeature(index, e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Contoh: Akses semua materi pelajaran"
              />
              {features.length > 1 && (
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  onClick={() => removeFeature(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
          ))}
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addFeature}
          className="mt-2"
        >
          <Plus className="w-4 h-4 mr-2" />
          Tambah Fitur
        </Button>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_active}
            onChange={(e) => setFormData(prev => ({ ...prev, is_active: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Aktif</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.is_recommended}
            onChange={(e) => setFormData(prev => ({ ...prev, is_recommended: e.target.checked }))}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Paket Rekomendasi</span>
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/dashboard/subscriptions')}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
