import { useState } from 'react'
import type { Student } from '../../../types'
import { Button } from '../../../components/ui/Button'

interface StudentFormProps {
  initialData?: Student
  onSubmit: (data: FormData) => void | Promise<void>
  isLoading?: boolean
  onCancel?: () => void
}

interface FormData {
  displayName: string
  username: string
  grade: number
  schoolName: string
  password?: string
}

export default function StudentForm({
  initialData,
  onSubmit,
  isLoading = false,
  onCancel
}: StudentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    displayName: initialData?.displayName || '',
    username: initialData?.username || '',
    grade: initialData?.grade || 1,
    schoolName: initialData?.schoolName || '',
    password: ''
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.displayName.trim()) {
      newErrors.displayName = 'Nama lengkap tidak boleh kosong'
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Username tidak boleh kosong'
    } else if (formData.username.length < 3) {
      newErrors.username = 'Username minimal 3 karakter'
    }

    if (!formData.grade) {
      newErrors.grade = 'Kelas tidak boleh kosong'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'grade' ? parseInt(value) : value
    }))
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    await onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Display Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="displayName"
          placeholder="Masukkan nama lengkap siswa"
          value={formData.displayName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.displayName && (
          <p className="text-red-500 text-sm mt-1">{errors.displayName}</p>
        )}
      </div>

      {/* Username */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="username"
          placeholder="Masukkan username (contoh: ani_smart)"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">{errors.username}</p>
        )}
      </div>

      {/* Grade */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Kelas <span className="text-red-500">*</span>
        </label>
        <select
          name="grade"
          value={formData.grade}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        >
          <option value="">Pilih Kelas</option>
          <option value={1}>Kelas 1 SD</option>
          <option value={2}>Kelas 2 SD</option>
          <option value={3}>Kelas 3 SD</option>
          <option value={4}>Kelas 4 SD</option>
          <option value={5}>Kelas 5 SD</option>
          <option value={6}>Kelas 6 SD</option>
        </select>
        {errors.grade && (
          <p className="text-red-500 text-sm mt-1">{errors.grade}</p>
        )}
      </div>

      {/* School Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nama Sekolah
        </label>
        <input
          type="text"
          name="schoolName"
          placeholder="Masukkan nama sekolah"
          value={formData.schoolName}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
      </div>

      {/* Password/PIN */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password/PIN (Opsional)
        </label>
        <input
          type="password"
          name="password"
          placeholder="Biarkan kosong jika tidak ingin mengubah password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
        />
        <p className="text-xs text-gray-500 mt-1">
          Hanya isi jika ingin mereset password siswa
        </p>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1"
        >
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
