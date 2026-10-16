import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Calendar,
  Users,
  Clock,
  Plus,
  Activity,
  TrendingUp,
  LogOut,
  Heart,
  Stethoscope,
  ClipboardList,
  Bell,
} from 'lucide-react';
import { patientRecords, appointments } from '../data/mockData';

export default function DoctorDashboard() {
  const { currentDoctor, logout } = useAuth();
  const navigate = useNavigate();

  if (!currentDoctor) {
    navigate('/login');
    return null;
  }

  const myAppointments = appointments.filter(
    (a) => a.doctorName === currentDoctor.name
  );

  const myRecords = patientRecords.filter(
    (r) => r.doctorName === currentDoctor.name
  );

  const stats = [
    {
      label: 'Today\'s Patients',
      value: myAppointments.filter(a => a.date === '2024-12-20').length,
      icon: Users,
      color: 'bg-blue-500',
      lightColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      label: 'Total Records',
      value: myRecords.length,
      icon: FileText,
      color: 'bg-emerald-500',
      lightColor: 'bg-emerald-50',
      textColor: 'text-emerald-600',
    },
    {
      label: 'Upcoming',
      value: myAppointments.filter(a => a.status === 'Scheduled').length,
      icon: Calendar,
      color: 'bg-purple-500',
      lightColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
    {
      label: 'Critical Cases',
      value: myRecords.filter(r => r.status === 'Critical').length,
      icon: Activity,
      color: 'bg-red-500',
      lightColor: 'bg-red-50',
      textColor: 'text-red-600',
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-600 rounded-lg">
                <Heart className="w-5 h-5 text-white fill-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Boen Summit</h1>
                <p className="text-xs text-gray-500">Doctor Portal</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">{currentDoctor.name}</p>
                  <p className="text-xs text-gray-500">{currentDoctor.specialty}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-lg">
                  {currentDoctor.avatar}
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Good Morning, {currentDoctor.name.split(' ')[1]} 👋
          </h2>
          <p className="text-gray-500 mt-1">
            Here's an overview of your patients and appointments today.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div className={`p-2 rounded-lg ${stat.lightColor}`}>
                  <stat.icon className={`w-5 h-5 ${stat.textColor}`} />
                </div>
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <button
            onClick={() => navigate('/doctor/new-record')}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl p-5 shadow-lg shadow-blue-600/20 hover:shadow-xl transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-white/20 rounded-lg">
                <Plus className="w-5 h-5" />
              </div>
              <div>
                <p className="font-semibold">New Patient Record</p>
                <p className="text-sm text-blue-100 mt-0.5">Create a new consultation record</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/doctor/records')}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-50 rounded-lg group-hover:bg-emerald-100 transition-colors">
                <ClipboardList className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Records</p>
                <p className="text-sm text-gray-500 mt-0.5">Browse patient records</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => navigate('/doctor/appointments')}
            className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all text-left group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">My Appointments</p>
                <p className="text-sm text-gray-500 mt-0.5">View scheduled appointments</p>
              </div>
            </div>
          </button>
        </div>

        {/* Recent Patient Records */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Recent Patient Records</h3>
              <p className="text-sm text-gray-500">Your latest consultation records</p>
            </div>
            <button
              onClick={() => navigate('/doctor/records')}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium"
            >
              View All →
            </button>
          </div>
          <div className="divide-y divide-gray-50">
            {myRecords.length > 0 ? (
              myRecords.map((record) => (
                <div key={record.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                        {record.patientName.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{record.patientName}</p>
                        <p className="text-xs text-gray-500">{record.diagnosis}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        record.status === 'Critical' ? 'bg-red-100 text-red-700' :
                        record.status === 'Follow-up' ? 'bg-amber-100 text-amber-700' :
                        record.status === 'Active' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-gray-100 text-gray-700'
                      }`}>
                        {record.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{record.dateOfVisit}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No patient records yet.</p>
                <button
                  onClick={() => navigate('/doctor/new-record')}
                  className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  Create your first record →
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
              <p className="text-sm text-gray-500">Your appointments for today</p>
            </div>
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Clock className="w-4 h-4" />
              <span>December 20, 2024</span>
            </div>
          </div>
          <div className="divide-y divide-gray-50">
            {myAppointments.length > 0 ? (
              myAppointments.map((apt) => (
                <div key={apt.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center min-w-[50px]">
                        <p className="text-sm font-bold text-blue-600">{apt.time}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{apt.patientName}</p>
                        <p className="text-xs text-gray-500">{apt.type} • {apt.department}</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      apt.status === 'Scheduled' ? 'bg-blue-100 text-blue-700' :
                      apt.status === 'In Progress' ? 'bg-amber-100 text-amber-700' :
                      apt.status === 'Completed' ? 'bg-emerald-100 text-emerald-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {apt.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-6 py-12 text-center">
                <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No appointments scheduled for today.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
