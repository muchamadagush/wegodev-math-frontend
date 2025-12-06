import { useParams } from 'react-router-dom'

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>()
  // TODO: fetch student detail by id
  return (
    <div>
      <h2 className="text-xl font-semibold mb-2">Detail Siswa #{id}</h2>
      <p className="text-sm text-gray-600">Informasi siswa akan ditampilkan di sini.</p>
    </div>
  )
}
