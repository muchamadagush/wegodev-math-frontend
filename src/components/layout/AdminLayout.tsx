import { Outlet, Link } from 'react-router-dom'
import { LayoutDashboard, Users, BookOpen, LogOut } from 'lucide-react'

export default function AdminLayout() {
  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    window.location.href = '/login'
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-4 text-xl font-bold border-b border-slate-700">
          Wegodev Math Admin
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <Link to="/dashboard" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
            <LayoutDashboard size={20} /> Dashboard
          </Link>
          <Link to="/dashboard/parents" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
            <Users size={20} /> Data Parents
          </Link>
          <Link to="/dashboard/questions" className="flex items-center gap-2 p-2 hover:bg-slate-800 rounded">
            <BookOpen size={20} /> Bank Soal
          </Link>
        </nav>
        <div className="p-4 border-t border-slate-700">
          <button onClick={handleLogout} className="flex items-center gap-2 text-red-400 hover:text-red-300">
            <LogOut size={20} /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-8">
        <Outlet /> {/* Halaman child akan dirender di sini */}
      </main>
    </div>
  );
}