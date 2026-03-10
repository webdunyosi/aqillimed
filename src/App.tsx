import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import DoctorLayout from './layouts/DoctorLayout'
import PatientLayout from './layouts/PatientLayout'
import DashboardPage from './pages/DashboardPage'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminDashboard from './pages/AdminDashboard'
import DoctorDashboard from './pages/DoctorDashboard'
import UserDashboard from './pages/UserDashboard'
import ProtectedRoute from './components/ProtectedRoute'
import { getCurrentUser } from './services/auth'

const RoleRedirect = () => {
  const user = getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  if (user.role === 'admin') return <Navigate to="/admin" replace />
  if (user.role === 'doctor') return <Navigate to="/doctor" replace />
  return <Navigate to="/patient" replace />
}

const App = () => (
  <Router>
    <Routes>
      {/* Public auth routes — no Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Admin routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <AdminDashboard />
            </AdminLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/management"
        element={
          <ProtectedRoute allowedRoles={['admin']}>
            <AdminLayout>
              <DashboardPage />
            </AdminLayout>
          </ProtectedRoute>
        }
      />

      {/* Doctor routes */}
      <Route
        path="/doctor"
        element={
          <ProtectedRoute allowedRoles={['doctor']}>
            <DoctorLayout>
              <DoctorDashboard />
            </DoctorLayout>
          </ProtectedRoute>
        }
      />

      {/* Patient routes */}
      <Route
        path="/patient"
        element={
          <ProtectedRoute allowedRoles={['user']}>
            <PatientLayout>
              <UserDashboard />
            </PatientLayout>
          </ProtectedRoute>
        }
      />

      {/* Root: redirect to role-specific page */}
      <Route path="/" element={<RoleRedirect />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </Router>
)

export default App