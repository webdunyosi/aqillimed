import { getCurrentUser } from '../services/auth'
import { FiCalendar, FiFileText } from 'react-icons/fi'

const UserDashboard = () => {
  const user = getCurrentUser()

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto">
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
        </div>
      </div>
    </div>
  )
}

export default UserDashboard