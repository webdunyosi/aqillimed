import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logout, getCurrentUser } from '../services/auth'
import { FiCalendar, FiUser, FiClipboard, FiLogOut, FiChevronDown, FiChevronUp } from 'react-icons/fi'
import { bookingsSeed, patientsSeed, doctorsSeed } from '../data'
import type { BookingStatus } from '../types'

const formatMoney = (v: number) => new Intl.NumberFormat('uz-UZ').format(v) + " so'm"

const bookingStatusMeta: Record<BookingStatus, { label: string; cls: string }> = {
  approved: { label: '✓ Tasdiqlangan', cls: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
  rejected: { label: '✗ Bekor qilindi', cls: 'bg-rose-500/20 text-rose-300 border border-rose-500/30' },
  pending: { label: '⏳ Kutilmoqda', cls: 'bg-amber-500/20 text-amber-300 border border-amber-500/30' },
}

const DoctorDashboard = () => {
  const navigate = useNavigate()
  const user = getCurrentUser()
  const [activeTab, setActiveTab] = useState<'qabullar' | 'bemorlar'>('qabullar')
  const [expandedPatientId, setExpandedPatientId] = useState<number | null>(null)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const today = new Date().toISOString().slice(0, 10)
  const todayBookings = bookingsSeed.filter((b) => b.date === today)
  const pendingCount = bookingsSeed.filter((b) => b.status === 'pending').length
  const totalVisits = patientsSeed.reduce((sum, p) => sum + p.visits.length, 0)

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
          <h2 className="text-2xl font-bold text-slate-100">Doktor Paneli</h2>
          <p className="text-slate-400 mt-1">
            Xush kelibsiz,{' '}
            <span className="text-emerald-300 font-medium">{user?.fullName}</span>!
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-2xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Bugungi qabullar</p>
              <p className="text-2xl font-bold text-slate-100">{todayBookings.length}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-2xl">
              <FiUser />
            </span>
            <div>
              <p className="text-slate-400 text-sm">Bemorlar</p>
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

        {/* Pending notification banner */}
        {pendingCount > 0 && (
          <div className="mb-6 flex items-center gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 px-5 py-3 text-amber-300">
            <span className="text-lg">⏳</span>
            <p className="text-sm font-medium">
              {pendingCount} ta navbat tasdiqlashni kutmoqda
            </p>
          </div>
        )}

        {/* Tab navigation */}
        <div className="flex gap-1 mb-6 bg-slate-900/60 border border-white/10 rounded-2xl p-1 w-fit">
          <button
            onClick={() => setActiveTab('qabullar')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'qabullar'
                ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FiCalendar className="text-base" />
            Qabullar
            <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${activeTab === 'qabullar' ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-700 text-slate-400'}`}>
              {bookingsSeed.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('bemorlar')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
              activeTab === 'bemorlar'
                ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/30 shadow-md'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <FiUser className="text-base" />
            Bemorlar
            <span className={`rounded-full px-1.5 py-0.5 text-xs font-bold ${activeTab === 'bemorlar' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-slate-700 text-slate-400'}`}>
              {patientsSeed.length}
            </span>
          </button>
        </div>

        {/* Qabullar tab */}
        {activeTab === 'qabullar' && (
          <article className="card-panel animate-fade-in">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-lg">🗓️</span>
              <h2 className="panel-title">Barcha qabullar</h2>
            </div>
            {bookingsSeed.length === 0 ? (
              <p className="py-10 text-center text-slate-500">Hali qabullar mavjud emas</p>
            ) : (
              <div className="space-y-2">
                {bookingsSeed.map((b) => {
                  const doc = doctorsSeed.find((d) => d.id === b.doctorId)
                  const st = bookingStatusMeta[b.status]
                  const isToday = b.date === today
                  return (
                    <div
                      key={b.id}
                      className={`flex flex-col gap-3 rounded-xl border px-4 py-3.5 transition hover:bg-white/5 sm:flex-row sm:items-center sm:justify-between ${
                        isToday ? 'border-cyan-500/30 bg-cyan-500/5' : 'border-white/8 bg-white/3'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="font-semibold text-slate-100">{b.patientName}</p>
                          {isToday && (
                            <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-bold text-cyan-300 border border-cyan-500/30">
                              Bugun
                            </span>
                          )}
                          <span className={`rounded-lg px-2 py-0.5 text-xs font-semibold ${st.cls}`}>
                            {st.label}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-slate-400">
                          🩺 {doc?.fullName ?? 'Noma\'lum doktor'} · {doc?.specialty ?? 'Mutaxassislik noma\'lum'}
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          📅 {b.date} · 🕐 {b.time} · 💰 {formatMoney(b.amount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="text-right">
                          <p className={`text-xs ${b.telegramSent ? 'text-blue-400' : 'text-rose-400'}`}>
                            {b.telegramSent ? '✈️ Yuborildi' : '❌ Yuborilmadi'}
                          </p>
                          <p className="text-xs text-slate-600 mt-0.5">Yaratildi: {b.createdAt}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </article>
        )}

        {/* Bemorlar tab */}
        {activeTab === 'bemorlar' && (
          <article className="card-panel animate-fade-in">
            <div className="flex items-center gap-3 mb-5">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-lg">👥</span>
              <h2 className="panel-title">Bemorlar ro'yxati</h2>
            </div>
            {patientsSeed.length === 0 ? (
              <p className="py-10 text-center text-slate-500">Hali bemorlar mavjud emas</p>
            ) : (
              <div className="space-y-3">
                {patientsSeed.map((p) => {
                  const isExpanded = expandedPatientId === p.id
                  const lastVisit = p.visits[p.visits.length - 1]
                  const lastDoc = lastVisit ? doctorsSeed.find((d) => d.id === lastVisit.doctorId) : null
                  return (
                    <div
                      key={p.id}
                      className="rounded-2xl border border-white/10 bg-white/3 overflow-hidden transition-all duration-300"
                    >
                      <button
                        type="button"
                        onClick={() => setExpandedPatientId(isExpanded ? null : p.id)}
                        className="w-full flex flex-col gap-3 px-4 py-4 text-left hover:bg-white/5 transition sm:flex-row sm:items-center sm:justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-600/30 text-base font-bold text-emerald-200">
                            {p.fullName.split(' ').filter((n) => n).map((n) => n[0]).join('').slice(0, 2)}
                          </div>
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-100">{p.fullName}</p>
                            <p className="text-xs text-slate-400">{p.phone} · 📍 {p.address}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3 shrink-0">
                          <span className="rounded-lg bg-red-500/20 px-2 py-1 text-xs font-bold text-red-300 border border-red-500/30">
                            {p.bloodType}
                          </span>
                          <div className="text-right hidden sm:block">
                            <p className="text-xs text-slate-400">{p.visits.length} ta tashrif</p>
                            <p className="text-xs text-slate-500">{p.totalStayDays} kun yotdi</p>
                          </div>
                          <span className="text-slate-500 text-lg">
                            {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                          </span>
                        </div>
                      </button>

                      {isExpanded && (
                        <div className="border-t border-white/8 px-4 pb-4 pt-3 animate-fade-in">
                          {/* Patient details */}
                          <div className="grid grid-cols-2 gap-2 mb-4 sm:grid-cols-4">
                            <div className="rounded-xl bg-slate-800/60 p-2.5 text-center">
                              <p className="text-xs text-slate-500">Tug'ilgan</p>
                              <p className="mt-0.5 text-xs font-bold text-slate-200">{p.birthDate}</p>
                            </div>
                            <div className="rounded-xl bg-slate-800/60 p-2.5 text-center">
                              <p className="text-xs text-slate-500">Kasalxonada</p>
                              <p className="mt-0.5 text-xs font-bold text-slate-200">{p.totalStayDays} kun</p>
                            </div>
                            <div className="rounded-xl bg-slate-800/60 p-2.5 text-center">
                              <p className="text-xs text-slate-500">Jami to'lov</p>
                              <p className="mt-0.5 text-xs font-bold text-slate-200">{formatMoney(p.totalPaid)}</p>
                            </div>
                            <div className="rounded-xl bg-slate-800/60 p-2.5 text-center">
                              <p className="text-xs text-slate-500">Ro'yxatdan</p>
                              <p className="mt-0.5 text-xs font-bold text-slate-200">{p.registeredAt}</p>
                            </div>
                          </div>

                          {/* Last diagnosis quick info */}
                          {lastVisit && (
                            <div className="mb-3 flex items-center gap-2 rounded-xl border border-cyan-500/20 bg-cyan-500/5 px-3 py-2">
                              <span className="text-cyan-400 text-sm">🩺</span>
                              <p className="text-xs text-cyan-300">
                                Oxirgi tashxis: <span className="font-semibold">{lastVisit.diagnosis}</span>
                                {lastDoc && <> · {lastDoc.fullName}</>}
                                <span className="text-slate-500"> · {lastVisit.date}</span>
                              </p>
                            </div>
                          )}

                          {/* Visit history */}
                          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Tashrif tarixi</p>
                          <div className="space-y-1.5 max-h-52 overflow-y-auto pr-1">
                            {p.visits.map((v) => {
                              const doc = doctorsSeed.find((d) => d.id === v.doctorId)
                              return (
                                <div
                                  key={v.id}
                                  className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-2"
                                >
                                  <div className="flex-1 min-w-0">
                                    <p className="truncate text-sm font-medium text-slate-200">{v.diagnosis}</p>
                                    <p className="text-xs text-slate-500">{doc?.fullName ?? 'Doktor'} · {doc?.specialty ?? 'Mutaxassislik noma\'lum'}</p>
                                  </div>
                                  <div className="text-right shrink-0">
                                    <p className="text-xs font-medium text-slate-300">{formatMoney(v.paid)}</p>
                                    <p className="text-xs text-slate-500">{v.date}{v.stayDays > 0 ? ` · ${v.stayDays} kun` : ''}</p>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  )
}

export default DoctorDashboard