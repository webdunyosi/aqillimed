import { useState } from 'react'
import type { Patient } from '../types'

type Props = {
  patients: Patient[]
  onAdd: (data: { fullName: string; phone: string; birthDate: string; address: string; bloodType: string }) => void
}

const BLOOD_TYPES = ['A(II)+', 'A(II)-', 'B(III)+', 'B(III)-', 'O(I)+', 'O(I)-', 'AB(IV)+', 'AB(IV)-']

const NurseDesk = ({ patients, onAdd }: Props) => {
  const [form, setForm] = useState({ fullName: '', phone: '', birthDate: '', address: '', bloodType: 'A(II)+' })
  const [success, setSuccess] = useState(false)

  const submit = () => {
    if (!form.fullName.trim() || !form.phone.trim()) return
    onAdd(form)
    setForm({ fullName: '', phone: '', birthDate: '', address: '', bloodType: 'A(II)+' })
    setSuccess(true)
    setTimeout(() => setSuccess(false), 3000)
  }

  return (
    <section className="mt-6 grid gap-6 lg:grid-cols-2">
      <article className="card-panel">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-cyan-500/20 text-lg">🏥</span>
          <h2 className="panel-title">Kompyuter registratsiyasi</h2>
        </div>
        <p className="mt-1 text-xs text-slate-500">Hamshira yangi bemor ma'lumotlarini kiritadi</p>

        <div className="mt-4 space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="field-label">Bemor F.I.O *</label>
              <input
                className="field-modern mt-1"
                placeholder="Ism Familiya"
                value={form.fullName}
                onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
              />
            </div>
            <div>
              <label className="field-label">Telefon *</label>
              <input
                className="field-modern mt-1"
                placeholder="+998 90 000 00 00"
                value={form.phone}
                onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
              />
            </div>
            <div>
              <label className="field-label">Tug'ilgan sana</label>
              <input
                className="field-modern mt-1"
                type="date"
                value={form.birthDate}
                onChange={(e) => setForm((p) => ({ ...p, birthDate: e.target.value }))}
              />
            </div>
            <div>
              <label className="field-label">Qon guruhi</label>
              <select
                className="field-modern mt-1"
                value={form.bloodType}
                onChange={(e) => setForm((p) => ({ ...p, bloodType: e.target.value }))}
              >
                {BLOOD_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="field-label">Manzil</label>
              <input
                className="field-modern mt-1"
                placeholder="Shahar, tuman"
                value={form.address}
                onChange={(e) => setForm((p) => ({ ...p, address: e.target.value }))}
              />
            </div>
          </div>

          <button type="button" onClick={submit} className="btn-primary w-full mt-1">
            ✅ Registratsiya qilish
          </button>

          {success && (
            <div className="animate-fade-in rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm text-emerald-300">
              ✓ Bemor muvaffaqiyatli ro'yxatga qo'shildi!
            </div>
          )}
        </div>
      </article>

      <article className="card-panel">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-500/20 text-lg">👥</span>
            <h2 className="panel-title">Bemorlar ro'yxati</h2>
          </div>
          <span className="rounded-full bg-slate-800 px-2.5 py-0.5 text-xs font-semibold text-slate-300">
            {patients.length} ta
          </span>
        </div>

        <div className="mt-4 space-y-2 max-h-96 overflow-y-auto pr-1 scrollbar-thin">
          {patients.length === 0 && (
            <p className="text-center text-sm text-slate-500 py-8">Hali bemorlar yo'q</p>
          )}
          {patients.map((patient, idx) => (
            <div
              key={patient.id}
              className="group flex items-center gap-3 rounded-xl border border-white/8 bg-white/4 px-3 py-2.5 transition hover:bg-white/8 hover:border-white/15"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500/30 to-blue-500/30 text-xs font-bold text-cyan-200">
                {idx + 1}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-slate-100">{patient.fullName}</p>
                <p className="truncate text-xs text-slate-400">
                  {patient.phone}
                  {patient.bloodType ? ` · ${patient.bloodType}` : ''}
                </p>
              </div>
              <span className="shrink-0 rounded-lg bg-slate-800/80 px-2 py-0.5 text-xs text-slate-400">
                {patient.registeredAt}
              </span>
            </div>
          ))}
        </div>
      </article>
    </section>
  )
}

export default NurseDesk
