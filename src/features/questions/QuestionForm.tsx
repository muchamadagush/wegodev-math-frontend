import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/ui/Button'
import { useTopics } from '../../hooks/useCurriculum'
import type { Question } from '../../types'

interface QuestionFormProps {
  initialData?: Question
  onSubmit: (data: Partial<Question>) => void
  isLoading?: boolean
}

export default function QuestionForm({ initialData, onSubmit, isLoading }: QuestionFormProps) {
  const navigate = useNavigate()
  const { data: topics } = useTopics()
  
  const [formData, setFormData] = useState({
    topic_id: initialData?.topic_id || '',
    difficulty: initialData?.difficulty || 1 as 1 | 2 | 3,
    type: initialData?.type || 'mcq' as 'mcq' | 'fill_in',
    content_text: initialData?.content?.text || '',
    content_image: initialData?.content?.image || '',
    content_latex: initialData?.content?.latex || '',
    explanation: initialData?.explanation || ''
  })

  const [options, setOptions] = useState(
    initialData?.options || [
      { id: 'A', value: '', is_correct: false },
      { id: 'B', value: '', is_correct: false },
      { id: 'C', value: '', is_correct: false },
      { id: 'D', value: '', is_correct: false }
    ]
  )

  useEffect(() => {
    if (initialData) {
      setFormData({
        topic_id: initialData.topic_id,
        difficulty: initialData.difficulty,
        type: initialData.type,
        content_text: initialData.content.text,
        content_image: initialData.content.image || '',
        content_latex: initialData.content.latex || '',
        explanation: initialData.explanation
      })
      if (initialData.options.length > 0) {
        setOptions(initialData.options)
      }
    }
  }, [initialData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const questionData: Partial<Question> = {
      topic_id: formData.topic_id,
      difficulty: formData.difficulty,
      type: formData.type,
      content: {
        text: formData.content_text,
        image: formData.content_image || undefined,
        latex: formData.content_latex || undefined
      },
      explanation: formData.explanation
    }

    if (formData.type === 'mcq') {
      questionData.options = options
    } else {
      questionData.options = []
    }

    onSubmit(questionData)
  }

  const updateOption = (index: number, value: string) => {
    const newOptions = [...options]
    newOptions[index].value = value
    setOptions(newOptions)
  }

  const setCorrectAnswer = (index: number) => {
    const newOptions = options.map((opt, i) => ({
      ...opt,
      is_correct: i === index
    }))
    setOptions(newOptions)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Topik <span className="text-red-500">*</span>
        </label>
        <select
          value={formData.topic_id}
          onChange={(e) => setFormData(prev => ({ ...prev, topic_id: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        >
          <option value="">-- Pilih Topik --</option>
          {topics?.map(topic => (
            <option key={topic.id} value={topic.id}>
              {topic.name} (Kelas {topic.grade_level})
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tingkat Kesulitan <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.difficulty}
            onChange={(e) => setFormData(prev => ({ ...prev, difficulty: Number(e.target.value) as 1 | 2 | 3 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value={1}>Mudah</option>
            <option value={2}>Sedang</option>
            <option value={3}>Sulit</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipe Soal <span className="text-red-500">*</span>
          </label>
          <select
            value={formData.type}
            onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value as 'mcq' | 'fill_in' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="mcq">Pilihan Ganda</option>
            <option value="fill_in">Isian</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Pertanyaan <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.content_text}
          onChange={(e) => setFormData(prev => ({ ...prev, content_text: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          required
          placeholder="Tulis pertanyaan soal di sini..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          URL Gambar (Opsional)
        </label>
        <input
          type="text"
          value={formData.content_image}
          onChange={(e) => setFormData(prev => ({ ...prev, content_image: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="https://example.com/image.png"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          LaTeX (Opsional)
        </label>
        <input
          type="text"
          value={formData.content_latex}
          onChange={(e) => setFormData(prev => ({ ...prev, content_latex: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Contoh: \frac{a}{b}"
        />
      </div>

      {formData.type === 'mcq' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Pilihan Jawaban <span className="text-red-500">*</span>
          </label>
          <div className="space-y-3">
            {options.map((option, index) => (
              <div key={option.id} className="flex items-center gap-3">
                <input
                  type="radio"
                  name="correct_answer"
                  checked={option.is_correct}
                  onChange={() => setCorrectAnswer(index)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-gray-700 w-8">{option.id}.</span>
                    <input
                      type="text"
                      value={option.value}
                      onChange={(e) => updateOption(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder={`Jawaban ${option.id}`}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2">Pilih radio button untuk menandai jawaban yang benar</p>
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Penjelasan <span className="text-red-500">*</span>
        </label>
        <textarea
          value={formData.explanation}
          onChange={(e) => setFormData(prev => ({ ...prev, explanation: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          required
          placeholder="Jelaskan mengapa jawaban tersebut benar..."
        />
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Menyimpan...' : 'Simpan'}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate('/dashboard/questions')}
        >
          Batal
        </Button>
      </div>
    </form>
  )
}
