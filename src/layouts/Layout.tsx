import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FiHome, FiGrid, FiMenu, FiX } from 'react-icons/fi'

type NavItem = {
  path: string
  label: string
  icon: React.ReactNode
}

const navItems: NavItem[] = [
  { path: '/', label: 'Bosh sahifa', icon: <FiHome /> },
  { path: '/dashboard', label: 'Boshqaruv paneli', icon: <FiGrid /> },
]

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/95 backdrop-blur-md shadow-lg shadow-black/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="mr-4 md:hidden text-slate-400 hover:text-slate-100 hover:bg-white/10 p-2 rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400/60"
                aria-label="Menyuni ochish"
              >
                <FiMenu className="text-xl" />
              </button>
              <Link to="/" className="flex items-center gap-2.5 group">
                <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-sm font-black text-slate-950 shadow-lg shadow-cyan-500/40 group-hover:scale-105 transition-transform duration-200">
                  +
                </span>
                <h1 className="text-xl font-extrabold tracking-tight">
                  <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                    AqilliMed
                  </span>
                  <span className="ml-1.5 text-slate-400 font-medium text-base hidden sm:inline">Hospital</span>
                </h1>
              </Link>
            </div>
            <div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <span className="text-xs font-medium text-slate-400 hidden sm:inline">Hospital Platform</span>
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
            fixed inset-y-0 left-0 z-40 w-64 border-r border-white/10
            bg-gradient-to-b from-slate-900 to-slate-900/95
            shadow-2xl shadow-black/40 transform transition-transform duration-300 ease-in-out mt-16
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            md:sticky md:top-16 md:h-[calc(100vh-4rem)] md:translate-x-0 md:mt-0
          `}
        >
          {/* Mobile close row */}
          <div className="flex items-center justify-between px-4 pt-4 pb-2 md:hidden">
            <span className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Menyu</span>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-100 hover:bg-white/10 p-1.5 rounded-lg transition-all duration-200"
              aria-label="Menyuni yopish"
            >
              <FiX />
            </button>
          </div>

          <nav className="p-4 space-y-1 overflow-y-auto h-full">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                    ${isActive
                      ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/10 text-cyan-300 border border-cyan-500/30 shadow-lg shadow-cyan-500/10 scale-[1.02]'
                      : 'text-slate-400 hover:text-slate-100 hover:bg-white/5 border border-transparent'
                    }
                  `}
                >
                  <span className="text-lg shrink-0">{item.icon}</span>
                  <span className="font-medium text-sm">{item.label}</span>
                </Link>
              )
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-w-0 p-4 md:p-8">
          {children}
        </main>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden
        />
      )}
    </div>
  )
}

export default Layout
