import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/Dashboard';
import Patients from './pages/Patients';
import Appointments from './pages/Appointments';
import Doctors from './pages/Doctors';
import Departments from './pages/Departments';
import Billing from './pages/Billing';
import Pharmacy from './pages/Pharmacy';
import Login from './pages/Login';
import DoctorDashboard from './pages/DoctorDashboard';
import NewPatientRecord from './pages/NewPatientRecord';
import DoctorRecords from './pages/DoctorRecords';
import DoctorAppointments from './pages/DoctorAppointments';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Doctor Portal Routes (Protected) */}
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

          {/* Admin Routes */}
          <Route path="/" element={<Layout />}>
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
    </AuthProvider>
  );
}
