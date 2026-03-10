import { Link } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'
import { bookingsSeed, patientsSeed } from '../data'
import { FiCalendar, FiFileText, FiArrowRight, FiCheckCircle, FiActivity } from 'react-icons/fi'

const UserDashboard = () => {
  const user = getCurrentUser()
  const myBookings = bookingsSeed.filter((b) => b.patientName === user?.fullName)
  const patient = patientsSeed.find((p) => p.fullName === user?.fullName)

  const approvedCount = myBookings.filter((b) => b.status === 'approved').length
  const pendingCount = myBookings.filter((b) => b.status === 'pending').length
  const today = new Date().toISOString().split('T')[0]
  const upcomingCount = myBookings.filter((b) => b.date >= today).length

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Welcome header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">
            Shaxsiy Kabinet
          </h2>
          <p className="text-slate-400 mt-1">
            Xush kelibsiz,{' '}
            <span className="text-violet-300 font-medium">{user?.fullName}</span>!
          </p>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <Link
            to="/patient/appointments"
            className="group bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-cyan-500/30 hover:bg-slate-800/60 transition-all duration-200"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 text-2xl shrink-0">
              <FiCalendar />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-sm">Mening qabullarim</p>
              <p className="text-2xl font-bold text-slate-100">{myBookings.length}</p>
              {pendingCount > 0 && (
                <p className="text-xs text-amber-400 mt-0.5">{pendingCount} ta kutilmoqda</p>
              )}
            </div>
            <FiArrowRight className="text-slate-500 group-hover:text-cyan-400 transition-colors duration-200 shrink-0" />
          </Link>

          <Link
            to="/patient/history"
            className="group bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4 hover:border-violet-500/30 hover:bg-slate-800/60 transition-all duration-200"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-2xl shrink-0">
              <FiFileText />
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-slate-400 text-sm">Tibbiy tarix</p>
              <p className="text-2xl font-bold text-slate-100">{patient?.visits.length ?? 0}</p>
              {patient && (
                <p className="text-xs text-slate-500 mt-0.5">
                  {patient.totalPaid.toLocaleString('uz-UZ')} so'm jami
                </p>
              )}
            </div>
            <FiArrowRight className="text-slate-500 group-hover:text-violet-400 transition-colors duration-200 shrink-0" />
          </Link>
        </div>

        {/* Detail stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-emerald-300">{approvedCount}</p>
            <p className="text-xs text-slate-400 mt-1">Tasdiqlangan</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-amber-300">{pendingCount}</p>
            <p className="text-xs text-slate-400 mt-1">Kutilmoqda</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-cyan-300">{upcomingCount}</p>
            <p className="text-xs text-slate-400 mt-1">Kelayotgan</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-xl p-4 text-center">
            <p className="text-xl font-bold text-violet-300">{patient?.totalStayDays ?? 0}</p>
            <p className="text-xs text-slate-400 mt-1">Statsionar kunlar</p>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiCheckCircle className="text-emerald-400" />
              <h3 className="text-sm font-semibold text-slate-200">So'nggi qabul</h3>
            </div>
            {myBookings.length > 0 ? (
              (() => {
                const sorted = [...myBookings].sort(
                  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                const last = sorted[0]
                return (
                  <div className="space-y-1">
                    <p className="text-slate-100 font-medium">
                      {new Date(last.date).toLocaleDateString('uz-UZ', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                    <p className="text-slate-400 text-sm">Soat: {last.time}</p>
                    <span className={`inline-flex text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      last.status === 'approved'
                        ? 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30'
                        : last.status === 'pending'
                        ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                        : 'bg-red-500/15 text-red-300 border-red-500/30'
                    }`}>
                      {last.status === 'approved' ? 'Tasdiqlangan' : last.status === 'pending' ? 'Kutilmoqda' : 'Rad etilgan'}
                    </span>
                  </div>
                )
              })()
            ) : (
              <p className="text-slate-500 text-sm">Hali qabul buyurtma qilinmagan</p>
            )}
          </div>

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <FiActivity className="text-violet-400" />
              <h3 className="text-sm font-semibold text-slate-200">So'nggi tashrif</h3>
            </div>
            {patient && patient.visits.length > 0 ? (
              (() => {
                const sorted = [...patient.visits].sort(
                  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
                )
                const last = sorted[0]
                return (
                  <div className="space-y-1">
                    <p className="text-slate-100 font-medium">{last.diagnosis}</p>
                    <p className="text-slate-400 text-sm">
                      {new Date(last.date).toLocaleDateString('uz-UZ', {
                        year: 'numeric', month: 'long', day: 'numeric',
                      })}
                    </p>
                    <p className="text-emerald-300 text-sm font-medium">
                      {last.paid.toLocaleString('uz-UZ')} so'm
                    </p>
                  </div>
                )
              })()
            ) : (
              <p className="text-slate-500 text-sm">Tibbiy tarix mavjud emas</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard