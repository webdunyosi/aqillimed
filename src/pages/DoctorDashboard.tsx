import { Link } from 'react-router-dom'
import { FiCalendar, FiUser, FiClipboard, FiArrowRight, FiClock, FiCheckCircle } from 'react-icons/fi'
import { getCurrentUser } from '../services/auth'
import { bookingsSeed, patientsSeed } from '../data'

const DoctorDashboard = () => {
  const user = getCurrentUser()

  const today = new Date().toISOString().split('T')[0]
  const todayAppointments = bookingsSeed.filter((b) => b.date === today)
  const pendingCount = bookingsSeed.filter((b) => b.status === 'pending').length
  const approvedCount = bookingsSeed.filter((b) => b.status === 'approved').length
  const totalVisits = patientsSeed.reduce((sum, p) => sum + p.visits.length, 0)

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Welcome */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">Doktor Paneli</h2>
          <p className="text-slate-400 mt-1">
            Xush kelibsiz,{' '}
            <span className="text-emerald-300 font-medium">{user?.fullName}</span>!
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-2xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Bugungi qabullar</p>
              <p className="text-2xl font-bold text-slate-100">{todayAppointments.length}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-2xl">
              <FiUser />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Jami bemorlar</p>
              <p className="text-2xl font-bold text-slate-100">{patientsSeed.length}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-2xl">
              <FiClipboard />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Jami tashriflar</p>
              <p className="text-2xl font-bold text-slate-100">{totalVisits}</p>
            </div>
          </div>
        </div>

        {/* Quick info row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 text-lg shrink-0">
              <FiClock />
            </span>
            <div className="flex-1">
              <p className="text-slate-400 text-xs">Kutilayotgan qabullar</p>
              <p className="text-xl font-bold text-amber-300">{pendingCount}</p>
            </div>
            <Link
              to="/doctor/appointments"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors duration-200"
            >
              Ko'rish <FiArrowRight />
            </Link>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-lg shrink-0">
              <FiCheckCircle />
            </span>
            <div className="flex-1">
              <p className="text-slate-400 text-xs">Tasdiqlangan qabullar</p>
              <p className="text-xl font-bold text-emerald-300">{approvedCount}</p>
            </div>
            <Link
              to="/doctor/appointments"
              className="flex items-center gap-1 text-xs text-slate-500 hover:text-emerald-400 transition-colors duration-200"
            >
              Ko'rish <FiArrowRight />
            </Link>
          </div>
        </div>

        {/* Recent appointments */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
            <h3 className="font-semibold text-slate-100">Yaqinlaşayotgan qabullar</h3>
            <Link
              to="/doctor/appointments"
              className="flex items-center gap-1.5 text-xs text-emerald-400 hover:text-emerald-300 transition-colors duration-200"
            >
              Barchasini ko'rish <FiArrowRight />
            </Link>
          </div>
          <div className="divide-y divide-white/5">
            {bookingsSeed.slice(0, 3).map((booking) => (
              <div key={booking.id} className="flex items-center gap-4 px-6 py-4">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-300 text-sm font-bold shrink-0">
                  {booking.patientName.charAt(0)}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-100 truncate">{booking.patientName}</p>
                  <p className="text-xs text-slate-500">{booking.date} · {booking.time}</p>
                </div>
                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border shrink-0 ${
                  booking.status === 'approved'
                    ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                    : booking.status === 'pending'
                    ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                    : 'bg-red-500/15 text-red-300 border-red-500/30'
                }`}>
                  {booking.status === 'approved' ? 'Tasdiqlangan' : booking.status === 'pending' ? 'Kutilmoqda' : 'Rad etilgan'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard