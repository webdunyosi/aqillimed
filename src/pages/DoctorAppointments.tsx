import { useState } from 'react'
import { FiCalendar, FiClock, FiUser, FiDollarSign, FiFilter, FiSearch } from 'react-icons/fi'
import { bookingsSeed, doctorsSeed } from '../data'
import type { BookingStatus } from '../types'

const statusConfig: Record<BookingStatus, { label: string; className: string }> = {
  approved: { label: 'Tasdiqlangan', className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30' },
  pending: { label: 'Kutilmoqda', className: 'bg-amber-500/15 text-amber-300 border-amber-500/30' },
  rejected: { label: 'Rad etilgan', className: 'bg-red-500/15 text-red-300 border-red-500/30' },
}

const DoctorAppointments = () => {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const filtered = bookingsSeed.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    const matchesSearch =
      b.patientName.toLowerCase().includes(search.toLowerCase()) ||
      (doctorsSeed.find((d) => d.id === b.doctorId)?.fullName ?? '')
        .toLowerCase()
        .includes(search.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const todayCount = bookingsSeed.filter((b) => b.date === today).length
  const approvedCount = bookingsSeed.filter((b) => b.status === 'approved').length
  const pendingCount = bookingsSeed.filter((b) => b.status === 'pending').length

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">Qabullar</h2>
          <p className="text-slate-400 mt-1">Barcha uchrashuvlar va qabullar ro'yxati</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Bugungi qabullar</p>
              <p className="text-2xl font-bold text-slate-100">{todayCount}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Tasdiqlangan</p>
              <p className="text-2xl font-bold text-slate-100">{approvedCount}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-xl">
              <FiClock />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Kutilmoqda</p>
              <p className="text-2xl font-bold text-slate-100">{pendingCount}</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Bemor yoki doktor nomi bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <FiFilter className="text-slate-400 shrink-0" />
            {(['all', 'approved', 'pending', 'rejected'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  statusFilter === s
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 border-white/10 hover:text-slate-100 hover:bg-white/5'
                }`}
              >
                {s === 'all' ? 'Barchasi' : statusConfig[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Appointments List */}
        {filtered.length === 0 ? (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 text-center text-slate-500">
            <p className="text-lg">📅 Qabullar topilmadi</p>
            <p className="text-sm mt-1">Filtrni yoki qidiruv so'zini o'zgartiring</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => {
              const doctor = doctorsSeed.find((d) => d.id === booking.doctorId)
              const { label, className } = statusConfig[booking.status]
              const isToday = booking.date === today

              return (
                <div
                  key={booking.id}
                  className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-white/20 transition-all duration-200"
                >
                  {/* Date badge */}
                  <div className={`flex flex-col items-center justify-center rounded-xl p-3 min-w-[60px] ${isToday ? 'bg-emerald-500/15 border border-emerald-500/30' : 'bg-slate-800 border border-white/10'}`}>
                    <span className={`text-xl font-bold ${isToday ? 'text-emerald-300' : 'text-slate-100'}`}>
                      {booking.date.split('-')[2]}
                    </span>
                    <span className={`text-xs ${isToday ? 'text-emerald-400' : 'text-slate-400'}`}>
                      {new Date(booking.date).toLocaleString('uz-UZ', { month: 'short' })}
                    </span>
                    {isToday && (
                      <span className="text-[10px] text-emerald-300 font-semibold mt-0.5">Bugun</span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 text-sm font-bold shrink-0">
                        {booking.patientName.charAt(0)}
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-100">{booking.patientName}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1">
                          <FiUser className="text-[10px]" /> Bemor
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-slate-200 font-medium">
                        {doctor?.fullName ?? `Doktor #${booking.doctorId}`}
                      </p>
                      <p className="text-xs text-slate-500">{doctor?.specialty}</p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-sm text-slate-200 flex items-center gap-1.5">
                        <FiClock className="text-slate-400" />
                        {booking.time}
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <FiDollarSign className="text-slate-500" />
                        {booking.amount.toLocaleString('uz-UZ')} so'm
                      </p>
                    </div>
                  </div>

                  {/* Status */}
                  <span className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold border shrink-0 ${className}`}>
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default DoctorAppointments