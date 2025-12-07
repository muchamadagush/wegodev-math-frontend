import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import type { Topic } from '../../types'

interface TopicFormProps {
  initialData?: Topic
  onSubmit: (data: Partial<Topic>) => void
  isLoading?: boolean
}

export default function TopicForm({ initialData, onSubmit, isLoading }: TopicFormProps) {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    slug: initialData?.slug || '',
    gradeLevel: initialData?.gradeLevel || 1,
    subject: initialData?.subject || 'math' as 'math' | 'science' | 'english',
    order: initialData?.order || 1
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        slug: initialData.slug,
        gradeLevel: initialData.gradeLevel,
        subject: initialData.subject,
        order: initialData.order
      })
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleNameChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Topik <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => handleNameChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Contoh: Penjumlahan dan Pengurangan"
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
          placeholder="penjumlahan-dan-pengurangan"
        />
        <p className="text-xs text-gray-500 mt-1">URL-friendly identifier (auto-generated dari nama)</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Jenjang Kelas <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.gradeLevel}
          onChange={(e) => setFormData(prev => ({ ...prev, gradeLevel: Number(e.target.value) }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          {[1, 2, 3, 4, 5, 6].map(grade => (
            <option key={grade} value={grade}>Kelas {grade}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Mata Pelajaran <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-4">
          <label className="flex items-center">
            <input
              type="radio"
              value="math"
              checked={formData.subject === 'math'}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value as 'math' | 'science' | 'english' }))}
              className="mr-2"
            />
            Matematika
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="science"
              checked={formData.subject === 'science'}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value as 'math' | 'science' | 'english' }))}
              className="mr-2"
            />
            Sains
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              value="english"
              checked={formData.subject === 'english'}
              onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value as 'math' | 'science' | 'english' }))}
              className="mr-2"
            />
            Bahasa Inggris
          </label>
        </div>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/dashboard/curriculum')}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
