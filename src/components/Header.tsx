type Role = 'Nurse Desk' | 'Patient Portal' | 'Admin Panel'

const roleTitles: Record<Role, { title: string; subtitle: string }> = {
  'Nurse Desk': {
    title: 'Hamshira ish stoli',
    subtitle: 'Tez registratsiya va navbat boshqaruvi',
  },
  'Patient Portal': {
    title: 'Bemor portali',
    subtitle: 'Online navbat band qilish va to\'lov',
  },
  'Admin Panel': {
    title: 'Admin panel',
    subtitle: 'To\'liq nazorat va statistika',
  },
}

type HeaderProps = {
  activeRole: Role
  stats: {
    patients: number
    doctors: number
    availableSlots: number
    totalPayment: string
  }
}

const Header = ({ activeRole, stats }: HeaderProps) => {
  const { title, subtitle } = roleTitles[activeRole]

  return (
    <header className="header">
      {/* Title section */}
      <div className="min-w-0">
        <h1 className="text-xl font-bold tracking-tight text-slate-100 sm:text-2xl truncate">{title}</h1>
        <p className="text-sm text-slate-400 truncate">{subtitle}</p>
      </div>

      {/* Quick stats */}
      <div className="header-stats">
        <div className="header-stat">
          <span className="header-stat-value">{stats.patients}</span>
          <span className="header-stat-label">Bemorlar</span>
        </div>
        <div className="header-stat">
          <span className="header-stat-value">{stats.doctors}</span>
          <span className="header-stat-label">Doktorlar</span>
        </div>
        <div className="header-stat">
          <span className="header-stat-value">{stats.availableSlots}</span>
          <span className="header-stat-label">Joylar</span>
        </div>
        <div className="header-stat">
          <span className="header-stat-value text-xs sm:text-sm">{stats.totalPayment}</span>
          <span className="header-stat-label">To'lovlar</span>
        </div>
      </div>
    </header>
  )
}

export default Header
