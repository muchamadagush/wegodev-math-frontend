import { useParents } from '../../hooks/useParents'

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
            <th className="p-3">Jumlah Anak</th>
            <th className="p-3">Status</th>
            <th className="p-3">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((parent) => (
            <tr key={parent.id} className="border-b hover:bg-gray-50">
              <td className="p-3">{parent.full_name}</td>
              <td className="p-3">{parent.email}</td>
              <td className="p-3 text-center">{parent.children_ids?.length || 0}</td>
              <td className="p-3">
                <span className={`px-2 py-1 rounded text-xs ${
                  parent.subscription.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {parent.subscription.is_active ? 'Premium' : 'Free'}
                </span>
              </td>
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