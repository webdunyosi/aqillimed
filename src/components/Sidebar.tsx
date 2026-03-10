import { useState } from 'react'

type Role = 'Nurse Desk' | 'Patient Portal' | 'Admin Panel'

type NavItem = {
  role: Role
  icon: string
  label: string
  labelUz: string
}

const navItems: NavItem[] = [
  { role: 'Nurse Desk', icon: '🩺', label: 'Nurse Desk', labelUz: 'Hamshira' },
  { role: 'Patient Portal', icon: '📋', label: 'Patient Portal', labelUz: 'Bemor portali' },
  { role: 'Admin Panel', icon: '⚙️', label: 'Admin Panel', labelUz: 'Admin panel' },
]

type SidebarProps = {
  activeRole: Role
  onRoleChange: (role: Role) => void
}

const Sidebar = ({ activeRole, onRoleChange }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={`sidebar ${collapsed ? 'sidebar-collapsed' : 'sidebar-expanded'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-white/10">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-lg font-bold text-slate-950">
          A
        </div>
        {!collapsed && (
          <span className="text-base font-bold tracking-tight text-slate-100 whitespace-nowrap">
            AqilliMed
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.role}
            type="button"
            onClick={() => onRoleChange(item.role)}
            title={collapsed ? item.label : undefined}
            className={`sidebar-nav-item ${activeRole === item.role ? 'sidebar-nav-active' : 'sidebar-nav-default'}`}
          >
            <span className="text-lg shrink-0">{item.icon}</span>
            {!collapsed && (
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">{item.label}</p>
                <p className="text-xs text-slate-400 truncate">{item.labelUz}</p>
              </div>
            )}
          </button>
        ))}
      </nav>

      {/* Footer / collapse toggle */}
      <div className="border-t border-white/10 px-2 py-3">
        <button
          type="button"
          onClick={() => setCollapsed((prev) => !prev)}
          className="sidebar-nav-item sidebar-nav-default w-full justify-center"
          title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <span className="text-lg shrink-0">{collapsed ? '»' : '«'}</span>
          {!collapsed && <span className="text-sm text-slate-400">Yig'ish</span>}
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
