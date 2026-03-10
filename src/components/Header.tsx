import type { Role } from '../types'

type Props = {
  activeRole: Role
  onChange: (role: Role) => void
  patientCount: number
  doctorCount: number
  availableSlots: number
  totalRevenue: string
}

const roles: Role[] = ['Nurse Desk', 'Patient Portal', 'Admin Panel']

const roleLabels: Record<Role, string> = {
  'Nurse Desk': '🏥 Hamshira stoli',
  'Patient Portal': '📅 Bemor portali',
  'Admin Panel': '⚙️ Admin panel',
}

const Header = ({ activeRole, onChange, patientCount, doctorCount, availableSlots, totalRevenue }: Props) => (
  <header className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/20 via-slate-900/80 to-fuchsia-600/20 p-6 shadow-2xl backdrop-blur-xl">
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-xl font-black text-slate-950 shadow-lg shadow-cyan-500/40">
            +
          </span>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
            <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
              AqilliMed
            </span>{' '}
            <span className="text-slate-100">Hospital</span>
          </h1>
        </div>
        <p className="mt-1.5 max-w-xl text-sm text-slate-400">
          Hamshiralar uchun tez registratsiya · Bemorlar uchun online navbat · Admin nazorat va statistika
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {roles.map((role) => (
          <button
            key={role}
            type="button"
            onClick={() => onChange(role)}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60 ${
              activeRole === role
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/40 scale-105'
                : 'border border-white/10 bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            {roleLabels[role]}
          </button>
        ))}
      </div>
    </div>

    <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Metric label="Jami bemorlar" value={String(patientCount)} icon="👥" color="from-blue-400 to-cyan-500" />
      <Metric label="Faol doktorlar" value={String(doctorCount)} icon="🩺" color="from-emerald-400 to-teal-500" />
      <Metric label="Bo'sh joylar" value={String(availableSlots)} icon="🛏️" color="from-amber-400 to-orange-500" />
      <Metric label="Daromad" value={totalRevenue} icon="💰" color="from-fuchsia-400 to-purple-500" />
    </div>
  </header>
)

type MetricProps = {
  label: string
  value: string
  icon: string
  color: string
}

const Metric = ({ label, value, icon, color }: MetricProps) => (
  <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/10 hover:shadow-lg">
    <div
      className={`absolute -right-4 -top-4 h-16 w-16 rounded-full bg-gradient-to-br ${color} opacity-10 blur-xl transition-opacity duration-300 group-hover:opacity-25`}
    />
    <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{label}</p>
    <div className="mt-1 flex items-center gap-2">
      <span className="text-base">{icon}</span>
      <p className="text-lg font-bold text-slate-100 sm:text-xl">{value}</p>
    </div>
  </div>
)

export default Header
