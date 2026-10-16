import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  ArrowLeft,
  Search,
  Filter,
  Plus,
  FileText,
  Calendar,
  User,
  Activity,
  X,
  Eye,
} from 'lucide-react';
import { patientRecords, PatientRecord } from '../data/mockData';

export default function DoctorRecords() {
  const { currentDoctor } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [selectedRecord, setSelectedRecord] = useState<PatientRecord | null>(null);

  if (!currentDoctor) {
    navigate('/login');
    return null;
  }

  const myRecords = patientRecords.filter((r) => r.doctorName === currentDoctor.name);

  const filteredRecords = myRecords.filter((record) => {
    const matchesSearch =
      record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-100 text-emerald-700';
      case 'Critical':
        return 'bg-red-100 text-red-700';
      case 'Follow-up':
        return 'bg-amber-100 text-amber-700';
      case 'Discharged':
        return 'bg-gray-100 text-gray-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/doctor/dashboard')}
                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Patient Records</h1>
                <p className="text-xs text-gray-500">{myRecords.length} records by {currentDoctor.name}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/doctor/new-record')}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">New Record</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2">
            <Search className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient name or diagnosis..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:border-blue-400"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Critical">Critical</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Discharged">Discharged</option>
            </select>
          </div>
        </div>

        {/* Records Grid */}
        {filteredRecords.length > 0 ? (
          <div className="grid gap-4">
            {filteredRecords.map((record) => (
              <div
                key={record.id}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedRecord(record)}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                      {record.patientName.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-sm font-semibold text-gray-900">{record.patientName}</h3>
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                          {record.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{record.diagnosis}</p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {record.dateOfVisit}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          {record.age} yrs / {record.gender}
                        </span>
                        <span className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          BP: {record.vitals.bloodPressure}
                        </span>
                      </div>
                    </div>
                  </div>
                  <button className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-100">
            <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 mb-4">
              {searchTerm || statusFilter !== 'All'
                ? 'No records found matching your criteria.'
                : 'No patient records yet.'}
            </p>
            {!searchTerm && statusFilter === 'All' && (
              <button
                onClick={() => navigate('/doctor/new-record')}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Create First Record
              </button>
            )}
          </div>
        )}
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h3 className="text-lg font-semibold text-gray-900">Patient Record Details</h3>
              <button onClick={() => setSelectedRecord(null)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {/* Patient Info */}
              <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                  {selectedRecord.patientName.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{selectedRecord.patientName}</h4>
                  <p className="text-sm text-gray-500">
                    {selectedRecord.age} years • {selectedRecord.gender} • Blood: {selectedRecord.bloodGroup}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">Record ID: {selectedRecord.id} | Visit: {selectedRecord.dateOfVisit}</p>
                </div>
              </div>

              {/* Vitals */}
              <div>
                <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-600" />
                  Vitals
                </h5>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Temperature</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedRecord.vitals.temperature}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Blood Pressure</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedRecord.vitals.bloodPressure}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Heart Rate</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedRecord.vitals.heartRate}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Weight</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedRecord.vitals.weight}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3 text-center">
                    <p className="text-xs text-gray-500">Height</p>
                    <p className="text-sm font-semibold text-gray-900">{selectedRecord.vitals.height}</p>
                  </div>
                </div>
              </div>

              {/* Clinical */}
              <div className="space-y-4">
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Complaints / Symptoms</h5>
                  <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selectedRecord.complaints}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Diagnosis</h5>
                  <p className="text-sm text-gray-600 bg-blue-50 rounded-lg p-3 text-blue-800">{selectedRecord.diagnosis}</p>
                </div>
                <div>
                  <h5 className="text-sm font-semibold text-gray-700 mb-1">Prescription</h5>
                  <p className="text-sm text-gray-600 bg-emerald-50 rounded-lg p-3 text-emerald-800">{selectedRecord.prescription}</p>
                </div>
                {selectedRecord.notes && (
                  <div>
                    <h5 className="text-sm font-semibold text-gray-700 mb-1">Notes</h5>
                    <p className="text-sm text-gray-600 bg-gray-50 rounded-lg p-3">{selectedRecord.notes}</p>
                  </div>
                )}
              </div>

              {/* Status & Doctor */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div>
                  <p className="text-xs text-gray-500">Attending Doctor</p>
                  <p className="text-sm font-medium text-gray-900">{selectedRecord.doctorName}</p>
                </div>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedRecord.status)}`}>
                  {selectedRecord.status}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
