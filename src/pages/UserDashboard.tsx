import { logout, getCurrentUser } from '../services/auth'
import { useNavigate, Link } from 'react-router-dom'
import { FiCalendar, FiFileText, FiLogOut } from 'react-icons/fi'

const UserDashboard = () => {
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
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-violet-500/20 text-violet-300 border border-violet-500/30">
                User
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
            Shaxsiy Kabinet
          </h2>
          <p className="text-slate-400 mt-1">
            Xush kelibsiz,{' '}
            <span className="text-violet-300 font-medium">{user?.fullName}</span>!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 text-2xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Mening qabullarim</p>
              <p className="text-2xl font-bold text-slate-100">—</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-2xl">
              <FiFileText />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Tibbiy tarix</p>
              <p className="text-2xl font-bold text-slate-100">—</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 text-center text-slate-500">
          <p className="text-lg">
            👤 Shaxsiy kabinet ishlab chiqilmoqda...
          </p>
          <p className="text-sm mt-2">
            Qabul buyurtma berish va tibbiy tarixni ko&apos;rish tez orada qo&apos;shiladi.
          </p>
          <Link
            to="/"
            className="inline-block mt-4 px-4 py-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20 hover:bg-violet-500/20 transition-colors text-sm"
          >
            Bosh sahifaga o&apos;tish
          </Link>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard
