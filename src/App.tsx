import { useMemo, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import Sidebar from './components/Sidebar'
import Header from './components/Header'

type Role = 'Nurse Desk' | 'Patient Portal' | 'Admin Panel'
type BookingStatus = 'pending' | 'approved' | 'rejected'

type Doctor = {
  id: number
  fullName: string
  specialty: string
  queueCount: number
}

type Patient = {
  id: number
  fullName: string
  phone: string
  totalPaid: number
  totalStayDays: number
  visits: number
}

type Booking = {
  id: number
  patientName: string
  doctorId: number
  date: string
  time: string
  amount: number
  receiptName: string
  status: BookingStatus
  telegramSent: boolean
}

const doctorsSeed: Doctor[] = [
  { id: 1, fullName: 'Dr. Azizbek Karimov', specialty: 'Kardiolog', queueCount: 44 },
  { id: 2, fullName: 'Dr. Farangiz Ismoilova', specialty: 'Nevrolog', queueCount: 30 },
  { id: 3, fullName: 'Dr. Muhammadali Yoqubov', specialty: 'Terapevt', queueCount: 57 },
  { id: 4, fullName: 'Dr. Dilshoda Sobirova', specialty: 'Pediatr', queueCount: 38 },
]

const patientsSeed: Patient[] = [
  { id: 1, fullName: 'Jamshid Normatov', phone: '+998 90 111 22 33', totalPaid: 1850000, totalStayDays: 6, visits: 4 },
  { id: 2, fullName: 'Nilufar Qodirova', phone: '+998 99 223 44 55', totalPaid: 720000, totalStayDays: 2, visits: 2 },
  { id: 3, fullName: 'Sanjar Xolmatov', phone: '+998 93 654 13 22', totalPaid: 2610000, totalStayDays: 10, visits: 7 },
]

const bookingsSeed: Booking[] = [
  {
    id: 1,
    patientName: 'Jamshid Normatov',
    doctorId: 3,
    date: '2026-03-13',
    time: '10:30',
    amount: 180000,
    receiptName: 'tolov-check.jpg',
    status: 'approved',
    telegramSent: true,
  },
  {
    id: 2,
    patientName: 'Sardor Tursunov',
    doctorId: 1,
    date: '2026-03-14',
    time: '12:00',
    amount: 180000,
    receiptName: 'receipt.pdf',
    status: 'pending',
    telegramSent: false,
  },
]

const formatMoney = (value: number): string =>
  new Intl.NumberFormat('uz-UZ').format(value) + ' so\'m'

const App = () => {
  const [activeRole, setActiveRole] = useState<Role>('Nurse Desk')
  const [doctors, setDoctors] = useState<Doctor[]>(doctorsSeed)
  const [patients, setPatients] = useState<Patient[]>(patientsSeed)
  const [bookings, setBookings] = useState<Booking[]>(bookingsSeed)
  const [selectedPatientId, setSelectedPatientId] = useState<number>(1)
  const [cursor, setCursor] = useState({ x: 300, y: 160 })

  const [nurseForm, setNurseForm] = useState({
    fullName: '',
    phone: '',
  })

  const [bookingForm, setBookingForm] = useState({
    patientName: '',
    doctorId: doctorsSeed[0].id,
    date: '',
    time: '',
    amount: 180000,
    receiptName: '',
  })

  const selectedPatient = useMemo(
    () => patients.find((patient) => patient.id === selectedPatientId) ?? patients[0],
    [patients, selectedPatientId],
  )

  const statsData = doctors.map((doctor) => ({
    name: doctor.fullName.split(' ')[1],
    requests: doctor.queueCount,
  }))

  const availableSlots = useMemo(() => {
    const approvedBookings = bookings.filter((booking) => booking.status === 'approved').length
    const totalSlots = 24
    return totalSlots - approvedBookings
  }, [bookings])

  const addPatientFromNurse = () => {
    if (!nurseForm.fullName || !nurseForm.phone) {
      return
    }

    const newPatient: Patient = {
      id: Date.now(),
      fullName: nurseForm.fullName,
      phone: nurseForm.phone,
      totalPaid: 0,
      totalStayDays: 0,
      visits: 0,
    }

    setPatients((prev) => [newPatient, ...prev])
    setNurseForm({ fullName: '', phone: '' })
  }

  const createBooking = () => {
    if (!bookingForm.patientName || !bookingForm.date || !bookingForm.time || !bookingForm.receiptName) {
      return
    }

    const isImage = /(png|jpg|jpeg|webp)$/i.test(bookingForm.receiptName)

    const newBooking: Booking = {
      id: Date.now(),
      patientName: bookingForm.patientName,
      doctorId: Number(bookingForm.doctorId),
      date: bookingForm.date,
      time: bookingForm.time,
      amount: bookingForm.amount,
      receiptName: bookingForm.receiptName,
      status: isImage ? 'pending' : 'rejected',
      telegramSent: isImage,
    }

    setBookings((prev) => [newBooking, ...prev])
    setBookingForm((prev) => ({
      ...prev,
      patientName: '',
      date: '',
      time: '',
      receiptName: '',
    }))
  }

  const updateBooking = (bookingId: number, status: BookingStatus) => {
    setBookings((prev) => prev.map((booking) => (booking.id === bookingId ? { ...booking, status } : booking)))
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
      },
    ])
  }

  const totalPayment = formatMoney(
    bookings.filter((booking) => booking.status === 'approved').reduce((sum, item) => sum + item.amount, 0),
  )

  return (
    <div
      onMouseMove={(event) => setCursor({ x: event.clientX, y: event.clientY })}
      className="flex h-screen overflow-hidden bg-slate-950 text-slate-100"
    >
      {/* Cursor glow */}
      <div
        className="pointer-events-none fixed h-48 w-48 rounded-full bg-fuchsia-500/30 blur-3xl transition-transform duration-200 z-0"
        style={{ transform: `translate(${cursor.x - 96}px, ${cursor.y - 96}px)` }}
      />

      {/* Sidebar */}
      <Sidebar activeRole={activeRole} onRoleChange={setActiveRole} />

      {/* Right column: header + main */}
      <div className="flex flex-1 flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <Header
          activeRole={activeRole}
          stats={{
            patients: patients.length,
            doctors: doctors.length,
            availableSlots,
            totalPayment,
          }}
        />

        {/* Main content */}
        <main className="relative flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
          {activeRole === 'Nurse Desk' && (
            <section className="grid gap-6 lg:grid-cols-2">
              <article className="card-panel">
                <h2 className="panel-title">Kompyuter registratsiyasi</h2>
                <div className="mt-4 space-y-3">
                  <input
                    className="field-modern"
                    placeholder="Bemor F.I.O"
                    value={nurseForm.fullName}
                    onChange={(event) => setNurseForm((prev) => ({ ...prev, fullName: event.target.value }))}
                  />
                  <input
                    className="field-modern"
                    placeholder="Telefon"
                    value={nurseForm.phone}
                    onChange={(event) => setNurseForm((prev) => ({ ...prev, phone: event.target.value }))}
                  />
                  <button type="button" onClick={addPatientFromNurse} className="btn-primary w-full">
                    Registratsiya qilish
                  </button>
                </div>
              </article>

              <article className="card-panel">
                <h2 className="panel-title">So'nggi bemorlar</h2>
                <div className="mt-4 space-y-2">
                  {patients.slice(0, 6).map((patient) => (
                    <div key={patient.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <p className="font-medium">{patient.fullName}</p>
                      <p className="text-xs text-slate-400">{patient.phone}</p>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}

          {activeRole === 'Patient Portal' && (
            <section className="grid gap-6 lg:grid-cols-2">
              <article className="card-panel">
                <h2 className="panel-title">Qabulga online band qilish</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    className="field-modern sm:col-span-2"
                    placeholder="Bemor ismi"
                    value={bookingForm.patientName}
                    onChange={(event) => setBookingForm((prev) => ({ ...prev, patientName: event.target.value }))}
                  />
                  <select
                    className="field-modern"
                    value={bookingForm.doctorId}
                    onChange={(event) => setBookingForm((prev) => ({ ...prev, doctorId: Number(event.target.value) }))}
                  >
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.id}>
                        {doctor.fullName} ({doctor.specialty})
                      </option>
                    ))}
                  </select>
                  <input
                    className="field-modern"
                    type="date"
                    value={bookingForm.date}
                    onChange={(event) => setBookingForm((prev) => ({ ...prev, date: event.target.value }))}
                  />
                  <input
                    className="field-modern"
                    type="time"
                    value={bookingForm.time}
                    onChange={(event) => setBookingForm((prev) => ({ ...prev, time: event.target.value }))}
                  />
                  <input
                    className="field-modern"
                    placeholder="To'lov summasi"
                    type="number"
                    value={bookingForm.amount}
                    onChange={(event) => setBookingForm((prev) => ({ ...prev, amount: Number(event.target.value) }))}
                  />
                  <input
                    className="field-modern sm:col-span-2"
                    placeholder="Check fayl nomi (masalan: check.jpg)"
                    value={bookingForm.receiptName}
                    onChange={(event) => setBookingForm((prev) => ({ ...prev, receiptName: event.target.value }))}
                  />
                </div>
                <button type="button" onClick={createBooking} className="btn-primary mt-4 w-full">
                  To'lov + navbat band qilish
                </button>
                <p className="mt-2 text-xs text-slate-400">
                  Rasm formatida check kiritilsa Telegram botga yuborilgan deb belgilanadi.
                </p>
              </article>

              <article className="card-panel">
                <h2 className="panel-title">Band qilingan qabul ro'yxati</h2>
                <div className="mt-4 space-y-2">
                  {bookings.map((booking) => {
                    const doctor = doctors.find((item) => item.id === booking.doctorId)
                    return (
                      <div key={booking.id} className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <p className="font-medium">{booking.patientName}</p>
                        <p className="text-xs text-slate-300">{doctor?.fullName}</p>
                        <p className="text-xs text-slate-400">
                          {booking.date} {booking.time} • {formatMoney(booking.amount)}
                        </p>
                        <span
                          className={`mt-2 inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${
                            booking.status === 'approved'
                              ? 'bg-emerald-500/20 text-emerald-300'
                              : booking.status === 'rejected'
                                ? 'bg-rose-500/20 text-rose-300'
                                : 'bg-amber-500/20 text-amber-300'
                          }`}
                        >
                          {booking.status}
                        </span>
                      </div>
                    )
                  })}
                </div>
              </article>
            </section>
          )}

          {activeRole === 'Admin Panel' && (
            <section className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                <article className="card-panel">
                  <div className="flex items-center justify-between">
                    <h2 className="panel-title">Doktorlar nazorati</h2>
                    <button type="button" onClick={addDoctor} className="btn-secondary">
                      + Doktor qo'shish
                    </button>
                  </div>
                  <div className="mt-4 space-y-2">
                    {doctors.map((doctor) => (
                      <div key={doctor.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                        <p className="font-medium">{doctor.fullName}</p>
                        <p className="text-xs text-slate-400">
                          {doctor.specialty} • So'rovlar: {doctor.queueCount}
                        </p>
                      </div>
                    ))}
                  </div>
                </article>

                <article className="card-panel">
                  <h2 className="panel-title">Bemor profili</h2>
                  <select
                    className="field-modern mt-4"
                    value={selectedPatient.id}
                    onChange={(event) => setSelectedPatientId(Number(event.target.value))}
                  >
                    {patients.map((patient) => (
                      <option key={patient.id} value={patient.id}>
                        {patient.fullName}
                      </option>
                    ))}
                  </select>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <p className="text-lg font-semibold">{selectedPatient.fullName}</p>
                    <p className="text-sm text-slate-300">{selectedPatient.phone}</p>
                    <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-xl bg-slate-900/60 p-3">
                        <p className="text-slate-400">Kasalxonada yotgan</p>
                        <p className="font-semibold">{selectedPatient.totalStayDays} kun</p>
                      </div>
                      <div className="rounded-xl bg-slate-900/60 p-3">
                        <p className="text-slate-400">Jami to'lov</p>
                        <p className="font-semibold">{formatMoney(selectedPatient.totalPaid)}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </div>

              <article className="card-panel">
                <h2 className="panel-title">Doktorga yozilish statistikasi</h2>
                <div className="mt-4 h-72 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={statsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" />
                      <YAxis stroke="#94a3b8" />
                      <Tooltip />
                      <Bar dataKey="requests" fill="#22d3ee" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </article>

              <article className="card-panel">
                <h2 className="panel-title">To'lov checklarini tasdiqlash</h2>
                <div className="mt-4 space-y-2">
                  {bookings.map((booking) => (
                    <div key={booking.id} className="flex flex-col gap-3 rounded-xl border border-white/10 bg-white/5 p-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="font-medium">{booking.patientName}</p>
                        <p className="text-xs text-slate-400">
                          {booking.receiptName} • Telegram: {booking.telegramSent ? 'yuborilgan' : 'yuborilmagan'}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button type="button" className="btn-success" onClick={() => updateBooking(booking.id, 'approved')}>
                          Tasdiqlash
                        </button>
                        <button type="button" className="btn-danger" onClick={() => updateBooking(booking.id, 'rejected')}>
                          Bekor qilish
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            </section>
          )}
        </main>
      </div>
    </div>
  )
}

export default App
