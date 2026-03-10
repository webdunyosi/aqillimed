import { useMemo, useState } from 'react'
import type { BookingStatus, Doctor, Patient, Booking, Role } from './types'
import { doctorsSeed, patientsSeed, bookingsSeed, TOTAL_SLOTS } from './data'
import CursorGlow from './components/CursorGlow'
import Header from './components/Header'
import NurseDesk from './components/NurseDesk'
import PatientPortal from './components/PatientPortal'
import AdminPanel from './components/AdminPanel'

const formatMoney = (value: number): string =>
  new Intl.NumberFormat('uz-UZ').format(value) + " so'm"

const App = () => {
  const [activeRole, setActiveRole] = useState<Role>('Nurse Desk')
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsSeed)
  const [patients, setPatients] = useState<Patient[]>(patientsSeed)
  const [bookings, setBookings] = useState<Booking[]>(bookingsSeed)
  const [cursor, setCursor] = useState({ x: 300, y: 160 })

  const availableSlots = useMemo(() => {
    const approved = bookings.filter((b) => b.status === 'approved').length
    return TOTAL_SLOTS - approved
  }, [bookings])

  const totalRevenue = useMemo(
    () => bookings.filter((b) => b.status === 'approved').reduce((s, b) => s + b.amount, 0),
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
    const newBooking: Booking = {
      id: Date.now(),
      patientName: data.patientName,
      doctorId: data.doctorId,
      date: data.date,
      time: data.time,
      amount: data.amount,
      receiptName: data.receiptName,
      status: isImage ? 'pending' : 'rejected',
      telegramSent: isImage,
      createdAt: new Date().toISOString().slice(0, 10),
    }
    setBookings((prev) => [newBooking, ...prev])
  }

  const updateBooking = (id: number, status: BookingStatus) => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status } : b)))
  }

  const addDoctor = () => {
    setDoctors((prev) => [
      ...prev,
      {
        id: Date.now(),
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
    <main
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="min-h-screen overflow-x-hidden bg-slate-950 text-slate-100"
    >
      <CursorGlow x={cursor.x} y={cursor.y} />

      {/* Ambient background blobs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-cyan-500/8 blur-3xl" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-fuchsia-500/8 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-64 w-64 rounded-full bg-blue-500/6 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <Header
          activeRole={activeRole}
          onChange={setActiveRole}
          patientCount={patients.length}
          doctorCount={doctors.length}
          availableSlots={availableSlots}
          totalRevenue={formatMoney(totalRevenue)}
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

        <footer className="mt-10 border-t border-white/5 pt-6 text-center text-xs text-slate-600">
          AqilliMed Hospital Platform © 2026 · Barcha huquqlar himoyalangan
        </footer>
      </div>
    </main>
  )
}

export default App
