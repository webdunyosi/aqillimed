export type Role = 'Nurse Desk' | 'Patient Portal' | 'Admin Panel'
export type BookingStatus = 'pending' | 'approved' | 'rejected'

export type Doctor = {
  id: number
  fullName: string
  specialty: string
  queueCount: number
  rating: number
  phone: string
  schedule: string
}

export type Visit = {
  id: number
  date: string
  doctorId: number
  diagnosis: string
  paid: number
  stayDays: number
}

export type Patient = {
  id: number
  fullName: string
  phone: string
  birthDate: string
  address: string
  bloodType: string
  totalPaid: number
  totalStayDays: number
  visits: Visit[]
  registeredAt: string
}

export type Booking = {
  id: number
  patientName: string
  doctorId: number
  date: string
  time: string
  amount: number
  receiptName: string
  status: BookingStatus
  telegramSent: boolean
  createdAt: string
}
