import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import Layout from './components/Layout';
import AdminProtectedRoute from './components/AdminProtectedRoute';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Departments from './pages/Departments';
import Billing from './pages/Billing';
import Pharmacy from './pages/Pharmacy';
import Login from './pages/Login';
import AdminLogin from './pages/AdminLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import NewPatientRecord from './pages/NewPatientRecord';
import DoctorRecords from './pages/DoctorRecords';
import DoctorAppointments from './pages/DoctorAppointments';

// Root redirect component
function RootRedirect() {
  const { isLoggedIn } = useAdminAuth();
  if (isLoggedIn) {
    return <Dashboard />;
  }
  return <Navigate to="/admin/login" replace />;
}

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Admin Login Route */}
        <Route path="/admin/login" element={<AdminLogin />} />

        {/* Doctor Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Doctor Portal Routes (Protected by Doctor Auth) */}
        <Route
          path="/doctor/dashboard"
          element={
            <ProtectedRoute>
              <DoctorDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/new-record"
          element={
            <ProtectedRoute>
              <NewPatientRecord />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/records"
          element={
            <ProtectedRoute>
              <DoctorRecords />
            </ProtectedRoute>
          }
        />
        <Route
          path="/doctor/appointments"
          element={
            <ProtectedRoute>
              <DoctorAppointments />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes (Protected by Admin Auth) */}
        <Route
          path="/"
          element={
            <AdminProtectedRoute>
              <Layout />
            </AdminProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="departments" element={<Departments />} />
          <Route path="billing" element={<Billing />} />
          <Route path="pharmacy" element={<Pharmacy />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </AdminAuthProvider>
  );
}
