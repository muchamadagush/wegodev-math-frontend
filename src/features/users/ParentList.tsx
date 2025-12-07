import { useParents } from '../../hooks/useParents'
import { formatDate } from '../../utils/date'

export default function ParentList() {
  const { data, isLoading, error } = useParents()

  if (isLoading) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="animate-pulse">Loading data...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded shadow text-black">
        <div className="text-red-600">Error loading data: {error.message}</div>
      </div>
    )
  }

  return (
    <div className="bg-white p-6 rounded shadow text-black">
      <h1 className="text-2xl font-bold mb-4">Daftar Orang Tua</h1>
      
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b bg-gray-50">
            <th className="p-3">Nama Lengkap</th>
            <th className="p-3">Email</th>
            <th className="p-3">No. Telepon</th>
            <th className="p-3">Jumlah Anak</th>
            <th className="p-3">Terdaftar</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((parent) => (
            <tr key={parent.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{parent.fullName}</td>
              <td className="p-3">{parent.email}</td>
              <td className="p-3">{parent.phone}</td>
              <td className="p-3 text-center">{parent.childrenIds?.length || 0}</td>
              <td className="p-3">{formatDate(parent.createdAt)}</td>
              <td className="p-3">
                <button className="text-blue-600 hover:underline">Detail</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}