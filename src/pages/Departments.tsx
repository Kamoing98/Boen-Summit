import { Building2, Users, BedDouble, AlertTriangle } from 'lucide-react';
import { departments } from '../data/mockData';

export default function Departments() {
  const totalStaff = departments.reduce((acc, d) => acc + d.staff, 0);
  const totalBeds = departments.reduce((acc, d) => acc + d.beds, 0);
  const occupiedBeds = departments.reduce((acc, d) => acc + d.occupiedBeds, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Departments</h1>
        <p className="text-gray-500 mt-1">Overview of all hospital departments and their capacity</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-50 rounded-lg">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{departments.length}</p>
              <p className="text-sm text-gray-500">Total Departments</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 rounded-lg">
              <Users className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{totalStaff}</p>
              <p className="text-sm text-gray-500">Total Staff</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-50 rounded-lg">
              <BedDouble className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{occupiedBeds}/{totalBeds}</p>
              <p className="text-sm text-gray-500">Beds Occupied</p>
            </div>
          </div>
        </div>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept) => {
          const occupancyRate = dept.beds > 0 ? Math.round((dept.occupiedBeds / dept.beds) * 100) : 0;
          const isHighOccupancy = occupancyRate > 80;

          return (
            <div
              key={dept.id}
              className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-2.5 rounded-lg ${isHighOccupancy ? 'bg-red-50' : 'bg-blue-50'}`}>
                    <Building2 className={`w-5 h-5 ${isHighOccupancy ? 'text-red-600' : 'text-blue-600'}`} />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-xs text-gray-500">{dept.head}</p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                    dept.status === 'Operational'
                      ? 'bg-emerald-100 text-emerald-700'
                      : 'bg-amber-100 text-amber-700'
                  }`}
                >
                  {dept.status === 'Under Maintenance' && <AlertTriangle className="w-3 h-3 mr-1" />}
                  {dept.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5" />
                    Staff
                  </span>
                  <span className="font-medium text-gray-900">{dept.staff}</span>
                </div>

                {dept.beds > 0 && (
                  <>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 flex items-center gap-1.5">
                        <BedDouble className="w-3.5 h-3.5" />
                        Beds
                      </span>
                      <span className="font-medium text-gray-900">
                        {dept.occupiedBeds}/{dept.beds}
                      </span>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs text-gray-500">Occupancy Rate</span>
                        <span className={`text-xs font-medium ${isHighOccupancy ? 'text-red-600' : 'text-emerald-600'}`}>
                          {occupancyRate}%
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            isHighOccupancy ? 'bg-red-500' : occupancyRate > 60 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${occupancyRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <button className="w-full px-3 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-medium hover:bg-gray-100 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
