import { useMemo, useState } from 'react'
import type { Role, BookingStatus, Doctor, Patient } from '../types'
import { doctorsSeed, patientsSeed, bookingsSeed, TOTAL_SLOTS } from '../data'
import { formatMoney } from '../utils/format'
import Header from '../components/Header'
import NurseDesk from '../components/NurseDesk'
import PatientPortal from '../components/PatientPortal'
import AdminPanel from '../components/AdminPanel'
import CursorGlow from '../components/CursorGlow'

const DashboardPage = () => {
  const [activeRole, setActiveRole] = useState<Role>('Nurse Desk')
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsSeed)
  const [patients, setPatients] = useState<Patient[]>(patientsSeed)
  const [bookings, setBookings] = useState(bookingsSeed)
  const [cursor, setCursor] = useState({ x: 300, y: 160 })

  const availableSlots = useMemo(() => {
    const approved = bookings.filter((b) => b.status === 'approved').length
    return TOTAL_SLOTS - approved
  }, [bookings])

  const totalRevenue = useMemo(
    () => formatMoney(bookings.filter((b) => b.status === 'approved').reduce((s, b) => s + b.amount, 0)),
    [bookings],
  )

  const addPatient = (data: {
    fullName: string
    phone: string
    birthDate: string
    address: string
    bloodType: string
  }) => {
    const newPatient: Patient = {
      id: Date.now(),
      fullName: data.fullName,
      phone: data.phone,
      birthDate: data.birthDate,
      address: data.address,
      bloodType: data.bloodType,
      totalPaid: 0,
      totalStayDays: 0,
      visits: [],
      registeredAt: new Date().toISOString().slice(0, 10),
    }
    setPatients((prev) => [newPatient, ...prev])
  }

  const createBooking = (data: {
    patientName: string
    doctorId: number
    date: string
    time: string
    amount: number
    receiptName: string
  }) => {
    const isImage = /(png|jpg|jpeg|webp)$/i.test(data.receiptName)
    setBookings((prev) => [
      {
        id: Date.now(),
        ...data,
        status: isImage ? 'pending' : 'rejected',
        telegramSent: isImage,
        createdAt: new Date().toISOString().slice(0, 10),
      },
      ...prev,
    ])
  }

  const updateBooking = (id: number, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const addDoctor = () => {
    const id = Date.now()
    setDoctors((prev) => [
      ...prev,
      {
        id,
        fullName: `Dr. Yangi Mutaxassis ${prev.length + 1}`,
        specialty: 'Umumiy amaliyot',
        queueCount: 0,
        rating: 4.5,
        phone: '+998 71 200 00 00',
        schedule: 'Du-Ju 09:00–17:00',
      },
    ])
  }

  return (
    <div
      className="relative"
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
    >
      <CursorGlow x={cursor.x} y={cursor.y} />

      <div className="relative">
        <Header
          activeRole={activeRole}
          onChange={setActiveRole}
          patientCount={patients.length}
          doctorCount={doctors.length}
          availableSlots={availableSlots}
          totalRevenue={totalRevenue}
        />

        {activeRole === 'Nurse Desk' && (
          <NurseDesk patients={patients} onAdd={addPatient} />
        )}

        {activeRole === 'Patient Portal' && (
          <PatientPortal
            doctors={doctors}
            bookings={bookings}
            availableSlots={availableSlots}
            onBook={createBooking}
          />
        )}

        {activeRole === 'Admin Panel' && (
          <AdminPanel
            doctors={doctors}
            patients={patients}
            bookings={bookings}
            onAddDoctor={addDoctor}
            onUpdateBooking={updateBooking}
          />
        )}
      </div>
    </div>
  )
}

export default DashboardPage