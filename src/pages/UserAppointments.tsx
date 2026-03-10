import { useState } from 'react'
import {
  FiCalendar,
  FiClock,
  FiCheckCircle,
  FiAlertCircle,
  FiXCircle,
  FiSearch,
  FiFilter,
  FiFileText,
  FiDollarSign,
} from 'react-icons/fi'
import { bookingsSeed, doctorsSeed } from '../data'
import { getCurrentUser } from '../services/auth'
import type { BookingStatus } from '../types'

const statusConfig: Record<BookingStatus, { label: string; className: string; icon: React.ReactNode }> = {
  approved: {
    label: 'Tasdiqlangan',
    className: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
    icon: <FiCheckCircle />,
  },
  pending: {
    label: 'Kutilmoqda',
    className: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
    icon: <FiAlertCircle />,
  },
  rejected: {
    label: 'Rad etilgan',
    className: 'bg-red-500/15 text-red-300 border-red-500/30',
    icon: <FiXCircle />,
  },
}

const UserAppointments = () => {
  const user = getCurrentUser()
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all')
  const [search, setSearch] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const myBookings = bookingsSeed.filter((b) => b.patientName === user?.fullName)

  const filtered = myBookings.filter((b) => {
    const matchesStatus = statusFilter === 'all' || b.status === statusFilter
    const doctor = doctorsSeed.find((d) => d.id === b.doctorId)
    const matchesSearch =
      (doctor?.fullName ?? '').toLowerCase().includes(search.toLowerCase()) ||
      (doctor?.specialty ?? '').toLowerCase().includes(search.toLowerCase()) ||
      b.date.includes(search)
    return matchesStatus && matchesSearch
  })

  const approvedCount = myBookings.filter((b) => b.status === 'approved').length
  const pendingCount = myBookings.filter((b) => b.status === 'pending').length
  const rejectedCount = myBookings.filter((b) => b.status === 'rejected').length
  const upcomingCount = myBookings.filter((b) => b.date >= today).length

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">Mening qabullarim</h2>
          <p className="text-slate-400 mt-1">Barcha buyurtma qilingan qabullaringiz ro'yxati</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 text-lg">
              <FiCalendar />
            </span>
            <p className="text-slate-400 text-xs mt-1">Jami qabullar</p>
            <p className="text-2xl font-bold text-slate-100">{myBookings.length}</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-lg">
              <FiClock />
            </span>
            <p className="text-slate-400 text-xs mt-1">Kelayotgan</p>
            <p className="text-2xl font-bold text-slate-100">{upcomingCount}</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-lg">
              <FiCheckCircle />
            </span>
            <p className="text-slate-400 text-xs mt-1">Tasdiqlangan</p>
            <p className="text-2xl font-bold text-slate-100">{approvedCount}</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-4 flex flex-col gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-lg">
              <FiAlertCircle />
            </span>
            <p className="text-slate-400 text-xs mt-1">Kutilmoqda</p>
            <p className="text-2xl font-bold text-slate-100">{pendingCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Doktor yoki sana bo'yicha qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30"
            />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <FiFilter className="text-slate-400 shrink-0" />
            {(['all', 'approved', 'pending', 'rejected'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 border ${
                  statusFilter === s
                    ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
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
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-500 text-3xl">
                <FiCalendar />
              </span>
            </div>
            <p className="text-slate-300 font-medium text-lg">Qabullar topilmadi</p>
            <p className="text-slate-500 text-sm mt-1">
              {myBookings.length === 0
                ? 'Hali hech qanday qabul buyurtma qilinmagan'
                : "Filtrni yoki qidiruv so'zini o'zgartiring"}
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((booking) => {
              const doctor = doctorsSeed.find((d) => d.id === booking.doctorId)
              const { label, className, icon } = statusConfig[booking.status]
              const isUpcoming = booking.date >= today
              const isPast = booking.date < today

              return (
                <div
                  key={booking.id}
                  className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-white/20 transition-all duration-200"
                >
                  {/* Date badge */}
                  <div
                    className={`flex flex-col items-center justify-center rounded-xl p-3 min-w-[64px] text-center shrink-0 ${
                      isUpcoming && !isPast
                        ? 'bg-cyan-500/10 border border-cyan-500/25'
                        : 'bg-slate-800 border border-white/8'
                    }`}
                  >
                    <span className={`text-2xl font-bold leading-none ${isUpcoming && !isPast ? 'text-cyan-300' : 'text-slate-300'}`}>
                      {booking.date.split('-')[2]}
                    </span>
                    <span className={`text-xs mt-0.5 ${isUpcoming && !isPast ? 'text-cyan-400' : 'text-slate-500'}`}>
                      {new Date(booking.date).toLocaleString('uz-UZ', { month: 'short' })}
                    </span>
                    <span className={`text-[10px] font-semibold mt-1 ${isUpcoming && !isPast ? 'text-cyan-400' : 'text-slate-600'}`}>
                      {new Date(booking.date).getFullYear()}
                    </span>
                  </div>

                  {/* Doctor info */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3 min-w-0">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-white/10 text-slate-200 text-sm font-bold shrink-0">
                        {doctor?.fullName.charAt(0) ?? 'D'}
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-100 truncate">
                          {doctor?.fullName ?? `Doktor #${booking.doctorId}`}
                        </p>
                        <p className="text-xs text-slate-500 truncate">{doctor?.specialty}</p>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-sm text-slate-200 flex items-center gap-1.5">
                        <FiClock className="text-slate-400 shrink-0" />
                        {booking.time}
                      </p>
                      <p className="text-xs text-slate-500">{doctor?.schedule}</p>
                    </div>

                    <div className="flex flex-col justify-center gap-1">
                      <p className="text-sm text-slate-200 flex items-center gap-1.5">
                        <FiDollarSign className="text-slate-400 shrink-0" />
                        {booking.amount.toLocaleString('uz-UZ')} so'm
                      </p>
                      <p className="text-xs text-slate-500 flex items-center gap-1.5">
                        <FiFileText className="text-slate-500 shrink-0" />
                        {booking.receiptName}
                      </p>
                    </div>
                  </div>

                  {/* Status badge */}
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border shrink-0 ${className}`}
                  >
                    {icon}
                    {label}
                  </span>
                </div>
              )
            })}
          </div>
        )}

        {/* Summary footer */}
        {myBookings.length > 0 && (
          <div className="mt-6 bg-slate-900/50 border border-white/8 rounded-2xl p-4 flex flex-wrap gap-4 items-center justify-between text-sm">
            <p className="text-slate-400">
              Jami:{' '}
              <span className="text-slate-200 font-semibold">{myBookings.length} ta qabul</span>
            </p>
            <p className="text-slate-400">
              To'langan:{' '}
              <span className="text-emerald-300 font-semibold">
                {myBookings
                  .filter((b) => b.status === 'approved')
                  .reduce((sum, b) => sum + b.amount, 0)
                  .toLocaleString('uz-UZ')}{' '}
                so'm
              </span>
            </p>
            {rejectedCount > 0 && (
              <p className="text-slate-400">
                Rad etilgan:{' '}
                <span className="text-red-400 font-semibold">{rejectedCount} ta</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default UserAppointments
