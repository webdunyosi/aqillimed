import { useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from 'recharts'
import type { Booking, BookingStatus, Doctor, Patient } from '../types'

type Props = {
  doctors: Doctor[]
  patients: Patient[]
  bookings: Booking[]
  onAddDoctor: () => void
  onUpdateBooking: (id: number, status: BookingStatus) => void
}

const formatMoney = (v: number) => new Intl.NumberFormat('uz-UZ').format(v) + " so'm"

const CHART_COLORS = ['#22d3ee', '#a78bfa', '#34d399', '#f59e0b']

const bookingStatusMeta: Record<BookingStatus, { label: string; cls: string }> = {
  approved: { label: '✓ Tasdiqlangan', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  rejected: { label: '✗ Bekor', cls: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  pending: { label: '⏳ Kutilmoqda', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
}

const AdminPanel = ({ doctors, patients, bookings, onAddDoctor, onUpdateBooking }: Props) => {
  const [selectedPatientId, setSelectedPatientId] = useState<number>(patients[0]?.id ?? 0)

  const selectedPatient = patients.find((p) => p.id === selectedPatientId) ?? patients[0]

  const statsData = doctors.map((d, i) => ({
    name: d.fullName.split(' ')[1] ?? d.fullName,
    navbat: d.queueCount,
    color: CHART_COLORS[i % CHART_COLORS.length],
  }))

  const totalRevenue = bookings
    .filter((b) => b.status === 'approved')
    .reduce((s, b) => s + b.amount, 0)

  const pendingCount = bookings.filter((b) => b.status === 'pending').length

  return (
    <section className="mt-6 space-y-6">
      {/* Summary row */}
      <div className="grid gap-4 sm:grid-cols-3">
        <SummaryCard icon="⏳" label="Kutilayotgan to'lovlar" value={String(pendingCount)} accent="amber" />
        <SummaryCard icon="✅" label="Tasdiqlangan navbatlar" value={String(bookings.filter((b) => b.status === 'approved').length)} accent="emerald" />
        <SummaryCard icon="💰" label="Tasdiqlangan daromad" value={formatMoney(totalRevenue)} accent="cyan" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Doctors */}
        <article className="card-panel">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/20 text-lg">🩺</span>
              <h2 className="panel-title">Doktorlar nazorati</h2>
            </div>
            <button type="button" onClick={onAddDoctor} className="btn-secondary text-xs">
              + Doktor qo'shish
            </button>
          </div>

          <div className="mt-4 space-y-2">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5 transition hover:bg-white/8"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-600/30 text-sm font-bold text-cyan-200">
                  {doc.fullName.split(' ')[1]?.[0] ?? '?'}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-slate-100">{doc.fullName}</p>
                  <p className="text-xs text-slate-400">
                    {doc.specialty} · {doc.schedule}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-cyan-300">{doc.queueCount} navbat</p>
                  <p className="text-xs text-amber-300">⭐ {doc.rating}</p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Patient profile */}
        <article className="card-panel">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/20 text-lg">👤</span>
            <h2 className="panel-title">Bemor profili</h2>
          </div>

          <select
            className="field-modern mt-4"
            value={selectedPatient?.id ?? ''}
            onChange={(e) => setSelectedPatientId(Number(e.target.value))}
          >
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName}
              </option>
            ))}
          </select>

          {selectedPatient && (
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/80 to-slate-900/80 p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-bold text-slate-100">{selectedPatient.fullName}</p>
                    <p className="text-sm text-slate-400">{selectedPatient.phone}</p>
                    {selectedPatient.address && (
                      <p className="text-xs text-slate-500 mt-0.5">📍 {selectedPatient.address}</p>
                    )}
                  </div>
                  <div className="text-right">
                    <span className="rounded-lg bg-red-500/20 px-2 py-1 text-xs font-bold text-red-300 border border-red-500/30">
                      {selectedPatient.bloodType}
                    </span>
                    {selectedPatient.birthDate && (
                      <p className="mt-1 text-xs text-slate-500">🎂 {selectedPatient.birthDate}</p>
                    )}
                  </div>
                </div>

                <div className="mt-3 grid grid-cols-3 gap-2">
                  <StatBox label="Kasalxonada" value={`${selectedPatient.totalStayDays} kun`} />
                  <StatBox label="Jami to'lov" value={formatMoney(selectedPatient.totalPaid)} />
                  <StatBox label="Tashriflar" value={`${selectedPatient.visits.length} marta`} />
                </div>
              </div>

              {/* Visit history */}
              {selectedPatient.visits.length > 0 && (
                <div>
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">Tashrif tarixi</p>
                  <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                    {selectedPatient.visits.map((v) => {
                      const doc = doctors.find((d) => d.id === v.doctorId)
                      return (
                        <div key={v.id} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/4 px-3 py-2">
                          <div className="flex-1 min-w-0">
                            <p className="truncate text-xs font-medium text-slate-200">{v.diagnosis}</p>
                            <p className="text-xs text-slate-500">{doc?.fullName ?? 'Doktor'}</p>
                          </div>
                          <div className="text-right shrink-0">
                            <p className="text-xs text-slate-300">{formatMoney(v.paid)}</p>
                            <p className="text-xs text-slate-500">{v.date}</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </article>
      </div>

      {/* Chart */}
      <article className="card-panel">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-purple-500/20 text-lg">📊</span>
          <h2 className="panel-title">Doktorga yozilish statistikasi</h2>
        </div>
        <div className="mt-4 h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={statsData} margin={{ top: 4, right: 8, left: 0, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="name" stroke="#64748b" tick={{ fontSize: 12 }} />
              <YAxis stroke="#64748b" tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{ background: '#0f172a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                labelStyle={{ color: '#94a3b8' }}
                cursor={{ fill: 'rgba(255,255,255,0.04)' }}
              />
              <Bar dataKey="navbat" radius={[8, 8, 0, 0]} name="Navbatlar">
                {statsData.map((entry, idx) => (
                  <Cell key={idx} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </article>

      {/* Booking approvals */}
      <article className="card-panel">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-lg">🧾</span>
          <h2 className="panel-title">To'lov checklarini tasdiqlash</h2>
        </div>
        <div className="mt-4 space-y-2">
          {bookings.length === 0 && (
            <p className="py-6 text-center text-sm text-slate-500">Hali navbat so'rovlari yo'q</p>
          )}
          {bookings.map((b) => {
            const doc = doctors.find((d) => d.id === b.doctorId)
            const st = bookingStatusMeta[b.status]
            return (
              <div
                key={b.id}
                className="flex flex-col gap-3 rounded-xl border border-white/8 bg-white/4 p-3 transition hover:bg-white/7 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium text-slate-100">{b.patientName}</p>
                    <span className={`rounded-lg border px-2 py-0.5 text-xs font-semibold ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs text-slate-400">
                    {doc?.fullName} · {b.date} {b.time}
                  </p>
                  <p className="text-xs text-slate-500">
                    📎 {b.receiptName} ·{' '}
                    <span className={b.telegramSent ? 'text-blue-400' : 'text-rose-400'}>
                      {b.telegramSent ? '✈️ Telegram yuborildi' : '❌ Telegram yuborilmadi'}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    type="button"
                    className="btn-success"
                    onClick={() => onUpdateBooking(b.id, 'approved')}
                    disabled={b.status === 'approved'}
                  >
                    ✓ Tasdiqlash
                  </button>
                  <button
                    type="button"
                    className="btn-danger"
                    onClick={() => onUpdateBooking(b.id, 'rejected')}
                    disabled={b.status === 'rejected'}
                  >
                    ✗ Bekor qilish
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </article>
    </section>
  )
}

type SummaryCardProps = { icon: string; label: string; value: string; accent: 'amber' | 'emerald' | 'cyan' }

const accentMap: Record<SummaryCardProps['accent'], string> = {
  amber: 'from-amber-500/20 to-amber-500/5 border-amber-500/20 text-amber-300',
  emerald: 'from-emerald-500/20 to-emerald-500/5 border-emerald-500/20 text-emerald-300',
  cyan: 'from-cyan-500/20 to-cyan-500/5 border-cyan-500/20 text-cyan-300',
}

const SummaryCard = ({ icon, label, value, accent }: SummaryCardProps) => (
  <div className={`rounded-2xl border bg-gradient-to-br p-4 backdrop-blur-md ${accentMap[accent]}`}>
    <p className="text-xs font-medium text-slate-400">{icon} {label}</p>
    <p className="mt-1 text-xl font-bold">{value}</p>
  </div>
)

type StatBoxProps = { label: string; value: string }

const StatBox = ({ label, value }: StatBoxProps) => (
  <div className="rounded-xl bg-slate-800/60 p-2.5 text-center">
    <p className="text-xs text-slate-500">{label}</p>
    <p className="mt-0.5 text-xs font-bold text-slate-200">{value}</p>
  </div>
)

export default AdminPanel