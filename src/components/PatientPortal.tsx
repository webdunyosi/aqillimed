import { useState } from 'react'
import type { Booking, Doctor } from '../types'

type Props = {
  doctors: Doctor[]
  bookings: Booking[]
  availableSlots: number
  onBook: (data: {
    patientName: string
    doctorId: number
    date: string
    time: string
    amount: number
    receiptName: string
  }) => void
}

const formatMoney = (v: number) => new Intl.NumberFormat('uz-UZ').format(v) + " so'm"

const statusLabel: Record<Booking['status'], { label: string; cls: string }> = {
  approved: { label: '✓ Tasdiqlangan', cls: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
  rejected: { label: '✗ Bekor qilindi', cls: 'bg-rose-500/20 text-rose-300 border-rose-500/30' },
  pending: { label: '⏳ Kutilmoqda', cls: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
}

const PatientPortal = ({ doctors, bookings, availableSlots, onBook }: Props) => {
  const [form, setForm] = useState({
    patientName: '',
    doctorId: doctors[0]?.id ?? 0,
    date: '',
    time: '',
    amount: 180000,
    receiptName: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [isImage, setIsImage] = useState(false)

  const handleReceiptChange = (name: string) => {
    setForm((p) => ({ ...p, receiptName: name }))
    setIsImage(/(png|jpg|jpeg|webp)$/i.test(name))
  }

  const submit = () => {
    if (!form.patientName.trim() || !form.date || !form.time || !form.receiptName.trim()) return
    onBook({ ...form, doctorId: Number(form.doctorId) })
    setForm((p) => ({ ...p, patientName: '', date: '', time: '', receiptName: '' }))
    setSubmitted(true)
    setIsImage(false)
    setTimeout(() => setSubmitted(false), 4000)
  }

  const selectedDoctor = doctors.find((d) => d.id === Number(form.doctorId))

  return (
    <section className="mt-6 space-y-6">
      <div className="grid gap-6 lg:grid-cols-5">
        <article className="card-panel lg:col-span-3">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-fuchsia-500/20 text-lg">📅</span>
            <h2 className="panel-title">Online qabulga yozilish</h2>
          </div>
          <p className="mt-1 text-xs text-slate-500">To'lov checkini yuklang va navbatingizni band qiling</p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label">Bemor ismi *</label>
              <input
                className="field-modern mt-1"
                placeholder="To'liq ism familiya"
                value={form.patientName}
                onChange={(e) => setForm((p) => ({ ...p, patientName: e.target.value }))}
              />
            </div>

            <div className="sm:col-span-2">
              <label className="field-label">Doktor tanlash *</label>
              <select
                className="field-modern mt-1"
                value={form.doctorId}
                onChange={(e) => setForm((p) => ({ ...p, doctorId: Number(e.target.value) }))}
              >
                {doctors.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.fullName} — {d.specialty}
                  </option>
                ))}
              </select>
            </div>

            {selectedDoctor && (
              <div className="sm:col-span-2 rounded-xl border border-white/10 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 p-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-slate-100">{selectedDoctor.fullName}</p>
                    <p className="text-xs text-slate-400">{selectedDoctor.specialty} · {selectedDoctor.schedule}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Reyting</p>
                    <p className="font-bold text-amber-300">⭐ {selectedDoctor.rating}</p>
                  </div>
                </div>
              </div>
            )}

            <div>
              <label className="field-label">Sana *</label>
              <input
                className="field-modern mt-1"
                type="date"
                value={form.date}
                onChange={(e) => setForm((p) => ({ ...p, date: e.target.value }))}
              />
            </div>
            <div>
              <label className="field-label">Vaqt *</label>
              <input
                className="field-modern mt-1"
                type="time"
                value={form.time}
                onChange={(e) => setForm((p) => ({ ...p, time: e.target.value }))}
              />
            </div>

            <div>
              <label className="field-label">To'lov summasi</label>
              <input
                className="field-modern mt-1"
                type="number"
                min={0}
                value={form.amount}
                onChange={(e) => setForm((p) => ({ ...p, amount: Number(e.target.value) }))}
              />
            </div>
            <div>
              <label className="field-label">Check fayl nomi *</label>
              <input
                className="field-modern mt-1"
                placeholder="masalan: check.jpg"
                value={form.receiptName}
                onChange={(e) => handleReceiptChange(e.target.value)}
              />
            </div>

            <div className="sm:col-span-2">
              {form.receiptName && (
                <div
                  className={`rounded-xl border px-3 py-2 text-xs ${
                    isImage
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-rose-500/30 bg-rose-500/10 text-rose-300'
                  }`}
                >
                  {isImage
                    ? '✓ Rasm formati aniqlandi — Telegram botga yuboriladi'
                    : "✗ Rasm fayli emas (jpg, png, webp) — admin tomonidan ko'rib chiqiladi"}
                </div>
              )}
            </div>
          </div>

          <button type="button" onClick={submit} className="btn-primary mt-4 w-full">
            💳 To'lov + navbat band qilish
          </button>

          {submitted && (
            <div className="animate-fade-in mt-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm text-cyan-300">
              ✓ Navbatingiz muvaffaqiyatli band qilindi! Admin tekshiradi.
            </div>
          )}

          <div className="mt-3 flex items-center gap-2 rounded-xl bg-slate-800/60 px-3 py-2">
            <span className="text-base">🛏️</span>
            <p className="text-xs text-slate-400">
              Hozir{' '}
              <span className={availableSlots > 5 ? 'text-emerald-300 font-semibold' : 'text-rose-300 font-semibold'}>
                {availableSlots}
              </span>{' '}
              ta bo'sh joy mavjud
            </p>
          </div>
        </article>

        <article className="card-panel lg:col-span-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-lg">📋</span>
              <h2 className="panel-title">Navbatlar</h2>
            </div>
            <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
              {bookings.length} ta
            </span>
          </div>

          <div className="mt-4 space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {bookings.length === 0 && (
              <p className="py-8 text-center text-sm text-slate-500">Hali navbat yo'q</p>
            )}
            {bookings.map((b) => {
              const doc = doctors.find((d) => d.id === b.doctorId)
              const st = statusLabel[b.status]
              return (
                <div key={b.id} className="rounded-xl border border-white/8 bg-white/4 p-3 transition hover:bg-white/7">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-100">{b.patientName}</p>
                      <p className="text-xs text-slate-400">{doc?.fullName}</p>
                      <p className="mt-1 text-xs text-slate-500">
                        {b.date} {b.time} · {formatMoney(b.amount)}
                      </p>
                    </div>
                    <span className={`shrink-0 rounded-lg border px-2 py-0.5 text-xs font-semibold ${st.cls}`}>
                      {st.label}
                    </span>
                  </div>
                  {b.telegramSent && (
                    <p className="mt-1.5 flex items-center gap-1 text-xs text-blue-400">
                      <span>✈️</span> Telegram botga yuborildi
                    </p>
                  )}
                </div>
              )
            })}
          </div>
        </article>
      </div>
    </section>
  )
}

export default PatientPortal