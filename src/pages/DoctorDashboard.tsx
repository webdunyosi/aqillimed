import { Link } from 'react-router-dom'
import { logout, getCurrentUser } from '../services/auth'
import { useNavigate } from 'react-router-dom'
import { FiCalendar, FiUser, FiClipboard, FiLogOut } from 'react-icons/fi'

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const user = getCurrentUser()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/40">
                +
              </span>
              <h1 className="text-xl font-extrabold tracking-tight">
                <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                  AqilliMed
                </span>
              </h1>
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 hidden sm:inline">
                {user?.fullName}
              </span>
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                Doktor
              </span>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1.5 text-slate-400 hover:text-red-400 hover:bg-red-400/10 px-3 py-1.5 rounded-lg transition-all duration-200 text-sm"
              >
                <FiLogOut />
                <span className="hidden sm:inline">Chiqish</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">
            Doktor Paneli
          </h2>
          <p className="text-slate-400 mt-1">
            Xush kelibsiz,{' '}
            <span className="text-emerald-300 font-medium">{user?.fullName}</span>!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-2xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Bugungi qabullar</p>
              <p className="text-2xl font-bold text-slate-100">—</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-2xl">
              <FiUser />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Bemorlar</p>
              <p className="text-2xl font-bold text-slate-100">—</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-2xl">
              <FiClipboard />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Tavsiyalar</p>
              <p className="text-2xl font-bold text-slate-100">—</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center text-slate-500">
          <p className="text-lg">
            🩺 Doktor paneli ishlab chiqilmoqda...
          </p>
          <p className="text-sm mt-2">
            To&apos;liq funksionallik tez orada qo&apos;shiladi.
          </p>
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard