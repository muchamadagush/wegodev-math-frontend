import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import AdminLayout from './components/layout/AdminLayout'
import Login from './features/auth/Login'
import UsersList from './features/users/ParentList'
import StudentDetail from './features/users/StudentDetail'
import Curriculum from './features/curriculum'
import CreateTopic from './features/curriculum/CreateTopic'
import EditTopic from './features/curriculum/EditTopic'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/parents" element={<UsersList />} />
          <Route path="/dashboard/parents/:id" element={<StudentDetail />} />
          <Route path="/dashboard/curriculum" element={<Curriculum />} />
          <Route path="/dashboard/curriculum/new" element={<CreateTopic />} />
          <Route path="/dashboard/curriculum/:id/edit" element={<EditTopic />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard/parents" replace />} />
        <Route path="*" element={<div className="p-8 text-center">Halaman tidak ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
