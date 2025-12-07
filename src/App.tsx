import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import AdminLayout from './components/layout/AdminLayout'
import Login from './features/auth/Login'
import UsersList from './features/users/ParentList'
import StudentDetail from './features/users/StudentDetail'
import StudentProfile from './features/users/StudentProfile'
import EditStudent from './features/users/EditStudent'
import Curriculum from './features/curriculum'
import CreateTopic from './features/curriculum/CreateTopic'
import EditTopic from './features/curriculum/EditTopic'
import PlanList from './features/subscriptions/PlanList'
import CreatePlan from './features/subscriptions/CreatePlan'
import EditPlan from './features/subscriptions/EditPlan'
import QuestionList from './features/questions/QuestionList'
import CreateQuestion from './features/questions/CreateQuestion'
import EditQuestion from './features/questions/EditQuestion'

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" richColors />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<AdminLayout />}>
          <Route path="/dashboard/parents" element={<UsersList />} />
          <Route path="/dashboard/parents/:id" element={<StudentDetail />} />
          <Route path="/dashboard/students/:id" element={<StudentProfile />} />
          <Route path="/dashboard/students/:id/edit" element={<EditStudent />} />
          <Route path="/dashboard/curriculum" element={<Curriculum />} />
          <Route path="/dashboard/curriculum/new" element={<CreateTopic />} />
          <Route path="/dashboard/curriculum/:id/edit" element={<EditTopic />} />
          <Route path="/dashboard/subscriptions" element={<PlanList />} />
          <Route path="/dashboard/subscriptions/new" element={<CreatePlan />} />
          <Route path="/dashboard/subscriptions/:id/edit" element={<EditPlan />} />
          <Route path="/dashboard/questions" element={<QuestionList />} />
          <Route path="/dashboard/questions/new" element={<CreateQuestion />} />
          <Route path="/dashboard/questions/:id/edit" element={<EditQuestion />} />
        </Route>
        <Route path="/" element={<Navigate to="/dashboard/parents" replace />} />
        <Route path="*" element={<div className="p-8 text-center">Halaman tidak ditemukan</div>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
