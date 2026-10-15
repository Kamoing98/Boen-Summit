export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'Male' | 'Female';
  phone: string;
  email: string;
  address: string;
  bloodGroup: string;
  registeredDate: string;
  status: 'Active' | 'Discharged' | 'Critical';
}

export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  department: string;
  phone: string;
  email: string;
  experience: number;
  status: 'Available' | 'In Surgery' | 'On Leave';
  avatar: string;
}

export interface Appointment {
  id: string;
  patientName: string;
  doctorName: string;
  department: string;
  date: string;
  time: string;
  status: 'Scheduled' | 'Completed' | 'Cancelled' | 'In Progress';
  type: 'Checkup' | 'Follow-up' | 'Emergency' | 'Surgery';
}

export interface Department {
  id: string;
  name: string;
  head: string;
  staff: number;
  beds: number;
  occupiedBeds: number;
  status: 'Operational' | 'Under Maintenance';
}

export interface BillingRecord {
  id: string;
  patientName: string;
  date: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  type: 'Consultation' | 'Lab Test' | 'Surgery' | 'Medication' | 'Room Charge';
}

export interface PharmacyItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unitPrice: number;
  expiryDate: string;
  supplier: string;
  status: 'In Stock' | 'Low Stock' | 'Out of Stock';
}

export const patients: Patient[] = [
  { id: 'P001', name: 'John Mensah', age: 45, gender: 'Male', phone: '+233 24 123 4567', email: 'john.m@email.com', address: '12 Independence Ave, Accra', bloodGroup: 'O+', registeredDate: '2024-01-15', status: 'Active' },
  { id: 'P002', name: 'Ama Serwaa', age: 32, gender: 'Female', phone: '+233 20 987 6543', email: 'ama.s@email.com', address: '45 Ring Road, Accra', bloodGroup: 'A+', registeredDate: '2024-02-20', status: 'Active' },
  { id: 'P003', name: 'Kwame Asante', age: 58, gender: 'Male', phone: '+233 27 555 1234', email: 'kwame.a@email.com', address: '78 Liberation Rd, Kumasi', bloodGroup: 'B-', registeredDate: '2024-03-10', status: 'Critical' },
  { id: 'P004', name: 'Abena Osei', age: 28, gender: 'Female', phone: '+233 55 444 3322', email: 'abena.o@email.com', address: '23 Oxford St, Osu', bloodGroup: 'AB+', registeredDate: '2024-03-25', status: 'Discharged' },
  { id: 'P005', name: 'Kofi Boateng', age: 67, gender: 'Male', phone: '+233 24 111 2233', email: 'kofi.b@email.com', address: '56 Spintex Rd, Accra', bloodGroup: 'O-', registeredDate: '2024-04-05', status: 'Active' },
  { id: 'P006', name: 'Efua Mensah', age: 41, gender: 'Female', phone: '+233 20 666 7788', email: 'efua.m@email.com', address: '89 Cantonments, Accra', bloodGroup: 'A-', registeredDate: '2024-04-18', status: 'Active' },
  { id: 'P007', name: 'Yaw Darko', age: 53, gender: 'Male', phone: '+233 27 333 4455', email: 'yaw.d@email.com', address: '34 East Legon, Accra', bloodGroup: 'B+', registeredDate: '2024-05-01', status: 'Critical' },
  { id: 'P008', name: 'Akua Frimpong', age: 36, gender: 'Female', phone: '+233 55 222 1100', email: 'akua.f@email.com', address: '67 Tema Community 1', bloodGroup: 'O+', registeredDate: '2024-05-12', status: 'Discharged' },
];

export const doctors: Doctor[] = [
  { id: 'D001', name: 'Dr. Emmanuel Adjei', specialty: 'Cardiology', department: 'Cardiology', phone: '+233 24 100 2000', email: 'e.adjei@boensummit.com', experience: 15, status: 'Available', avatar: '👨‍⚕️' },
  { id: 'D002', name: 'Dr. Grace Owusu', specialty: 'Pediatrics', department: 'Pediatrics', phone: '+233 20 300 4000', email: 'g.owusu@boensummit.com', experience: 12, status: 'Available', avatar: '👩‍⚕️' },
  { id: 'D003', name: 'Dr. Samuel Tetteh', specialty: 'Orthopedics', department: 'Orthopedics', phone: '+233 27 500 6000', email: 's.tetteh@boensummit.com', experience: 20, status: 'In Surgery', avatar: '👨‍⚕️' },
  { id: 'D004', name: 'Dr. Felicia Agyemang', specialty: 'Neurology', department: 'Neurology', phone: '+233 55 700 8000', email: 'f.agyemang@boensummit.com', experience: 18, status: 'Available', avatar: '👩‍⚕️' },
  { id: 'D005', name: 'Dr. Richard Mensah', specialty: 'General Surgery', department: 'Surgery', phone: '+233 24 900 1000', email: 'r.mensah@boensummit.com', experience: 22, status: 'In Surgery', avatar: '👨‍⚕️' },
  { id: 'D006', name: 'Dr. Patricia Boateng', specialty: 'Dermatology', department: 'Dermatology', phone: '+233 20 200 3000', email: 'p.boateng@boensummit.com', experience: 10, status: 'On Leave', avatar: '👩‍⚕️' },
  { id: 'D007', name: 'Dr. Michael Asamoah', specialty: 'Radiology', department: 'Radiology', phone: '+233 27 400 5000', email: 'm.asamoah@boensummit.com', experience: 14, status: 'Available', avatar: '👨‍⚕️' },
  { id: 'D008', name: 'Dr. Linda Appiah', specialty: 'Obstetrics', department: 'Maternity', phone: '+233 55 600 7000', email: 'l.appiah@boensummit.com', experience: 16, status: 'Available', avatar: '👩‍⚕️' },
];

export const appointments: Appointment[] = [
  { id: 'A001', patientName: 'John Mensah', doctorName: 'Dr. Emmanuel Adjei', department: 'Cardiology', date: '2024-12-20', time: '09:00 AM', status: 'Scheduled', type: 'Checkup' },
  { id: 'A002', patientName: 'Ama Serwaa', doctorName: 'Dr. Grace Owusu', department: 'Pediatrics', date: '2024-12-20', time: '10:30 AM', status: 'In Progress', type: 'Follow-up' },
  { id: 'A003', patientName: 'Kwame Asante', doctorName: 'Dr. Richard Mensah', department: 'Surgery', date: '2024-12-20', time: '11:00 AM', status: 'Scheduled', type: 'Surgery' },
  { id: 'A004', patientName: 'Abena Osei', doctorName: 'Dr. Felicia Agyemang', department: 'Neurology', date: '2024-12-20', time: '02:00 PM', status: 'Completed', type: 'Checkup' },
  { id: 'A005', patientName: 'Kofi Boateng', doctorName: 'Dr. Emmanuel Adjei', department: 'Cardiology', date: '2024-12-21', time: '09:30 AM', status: 'Scheduled', type: 'Follow-up' },
  { id: 'A006', patientName: 'Efua Mensah', doctorName: 'Dr. Patricia Boateng', department: 'Dermatology', date: '2024-12-21', time: '11:00 AM', status: 'Cancelled', type: 'Checkup' },
  { id: 'A007', patientName: 'Yaw Darko', doctorName: 'Dr. Samuel Tetteh', department: 'Orthopedics', date: '2024-12-21', time: '03:00 PM', status: 'Scheduled', type: 'Emergency' },
  { id: 'A008', patientName: 'Akua Frimpong', doctorName: 'Dr. Linda Appiah', department: 'Maternity', date: '2024-12-22', time: '08:00 AM', status: 'Scheduled', type: 'Checkup' },
];

export const departments: Department[] = [
  { id: 'DEP001', name: 'Cardiology', head: 'Dr. Emmanuel Adjei', staff: 24, beds: 30, occupiedBeds: 22, status: 'Operational' },
  { id: 'DEP002', name: 'Pediatrics', head: 'Dr. Grace Owusu', staff: 18, beds: 25, occupiedBeds: 18, status: 'Operational' },
  { id: 'DEP003', name: 'Orthopedics', head: 'Dr. Samuel Tetteh', staff: 15, beds: 20, occupiedBeds: 14, status: 'Operational' },
  { id: 'DEP004', name: 'Neurology', head: 'Dr. Felicia Agyemang', staff: 12, beds: 15, occupiedBeds: 11, status: 'Operational' },
  { id: 'DEP005', name: 'Surgery', head: 'Dr. Richard Mensah', staff: 30, beds: 40, occupiedBeds: 35, status: 'Operational' },
  { id: 'DEP006', name: 'Dermatology', head: 'Dr. Patricia Boateng', staff: 8, beds: 10, occupiedBeds: 4, status: 'Operational' },
  { id: 'DEP007', name: 'Radiology', head: 'Dr. Michael Asamoah', staff: 10, beds: 0, occupiedBeds: 0, status: 'Operational' },
  { id: 'DEP008', name: 'Maternity', head: 'Dr. Linda Appiah', staff: 22, beds: 35, occupiedBeds: 28, status: 'Operational' },
  { id: 'DEP009', name: 'Emergency', head: 'Dr. James Ofori', staff: 20, beds: 15, occupiedBeds: 12, status: 'Operational' },
  { id: 'DEP010', name: 'ICU', head: 'Dr. Rebecca Darko', staff: 16, beds: 12, occupiedBeds: 10, status: 'Under Maintenance' },
];

export const billingRecords: BillingRecord[] = [
  { id: 'B001', patientName: 'John Mensah', date: '2024-12-18', amount: 450.00, status: 'Paid', type: 'Consultation' },
  { id: 'B002', patientName: 'Ama Serwaa', date: '2024-12-19', amount: 1200.00, status: 'Pending', type: 'Lab Test' },
  { id: 'B003', patientName: 'Kwame Asante', date: '2024-12-19', amount: 8500.00, status: 'Pending', type: 'Surgery' },
  { id: 'B004', patientName: 'Abena Osei', date: '2024-12-17', amount: 320.00, status: 'Paid', type: 'Medication' },
  { id: 'B005', patientName: 'Kofi Boateng', date: '2024-12-16', amount: 2800.00, status: 'Overdue', type: 'Room Charge' },
  { id: 'B006', patientName: 'Efua Mensah', date: '2024-12-20', amount: 550.00, status: 'Paid', type: 'Consultation' },
  { id: 'B007', patientName: 'Yaw Darko', date: '2024-12-20', amount: 3200.00, status: 'Pending', type: 'Surgery' },
  { id: 'B008', patientName: 'Akua Frimpong', date: '2024-12-15', amount: 180.00, status: 'Paid', type: 'Lab Test' },
];

export const pharmacyItems: PharmacyItem[] = [
  { id: 'PH001', name: 'Amoxicillin 500mg', category: 'Antibiotics', quantity: 2500, unitPrice: 2.50, expiryDate: '2025-06-15', supplier: 'MedSupply Ghana', status: 'In Stock' },
  { id: 'PH002', name: 'Paracetamol 500mg', category: 'Analgesics', quantity: 5000, unitPrice: 0.80, expiryDate: '2025-09-20', supplier: 'PharmaCare Ltd', status: 'In Stock' },
  { id: 'PH003', name: 'Metformin 850mg', category: 'Antidiabetics', quantity: 800, unitPrice: 3.20, expiryDate: '2025-03-10', supplier: 'MedSupply Ghana', status: 'In Stock' },
  { id: 'PH004', name: 'Lisinopril 10mg', category: 'Antihypertensives', quantity: 150, unitPrice: 4.50, expiryDate: '2025-04-25', supplier: 'HealthFirst Imports', status: 'Low Stock' },
  { id: 'PH005', name: 'Omeprazole 20mg', category: 'Antacids', quantity: 1200, unitPrice: 1.80, expiryDate: '2025-08-30', supplier: 'PharmaCare Ltd', status: 'In Stock' },
  { id: 'PH006', name: 'Ciprofloxacin 500mg', category: 'Antibiotics', quantity: 45, unitPrice: 5.00, expiryDate: '2025-02-28', supplier: 'MedSupply Ghana', status: 'Low Stock' },
  { id: 'PH007', name: 'Insulin Glargine', category: 'Antidiabetics', quantity: 0, unitPrice: 45.00, expiryDate: '2025-01-15', supplier: 'HealthFirst Imports', status: 'Out of Stock' },
  { id: 'PH008', name: 'Ibuprofen 400mg', category: 'Analgesics', quantity: 3200, unitPrice: 1.20, expiryDate: '2025-11-10', supplier: 'PharmaCare Ltd', status: 'In Stock' },
  { id: 'PH009', name: 'Atorvastatin 20mg', category: 'Statins', quantity: 600, unitPrice: 6.00, expiryDate: '2025-07-20', supplier: 'HealthFirst Imports', status: 'In Stock' },
  { id: 'PH010', name: 'Salbutamol Inhaler', category: 'Respiratory', quantity: 20, unitPrice: 12.00, expiryDate: '2025-05-05', supplier: 'MedSupply Ghana', status: 'Low Stock' },
];

export const monthlyRevenue = [
  { month: 'Jul', revenue: 42000, expenses: 28000 },
  { month: 'Aug', revenue: 48000, expenses: 30000 },
  { month: 'Sep', revenue: 55000, expenses: 32000 },
  { month: 'Oct', revenue: 51000, expenses: 29000 },
  { month: 'Nov', revenue: 58000, expenses: 34000 },
  { month: 'Dec', revenue: 62000, expenses: 36000 },
];

export const patientFlow = [
  { day: 'Mon', patients: 85 },
  { day: 'Tue', patients: 92 },
  { day: 'Wed', patients: 78 },
  { day: 'Thu', patients: 105 },
  { day: 'Fri', patients: 98 },
  { day: 'Sat', patients: 65 },
  { day: 'Sun', patients: 45 },
];

export const departmentStats = [
  { name: 'Cardiology', value: 120, color: '#3b82f6' },
  { name: 'Pediatrics', value: 95, color: '#10b981' },
  { name: 'Surgery', value: 85, color: '#f59e0b' },
  { name: 'Neurology', value: 60, color: '#8b5cf6' },
  { name: 'Maternity', value: 110, color: '#ec4899' },
  { name: 'Emergency', value: 150, color: '#ef4444' },
];
