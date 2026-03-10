import { useState } from 'react'
import { FiUser, FiPhone, FiMapPin, FiActivity, FiSearch, FiChevronDown, FiChevronUp, FiCalendar, FiCreditCard } from 'react-icons/fi'
import { patientsSeed, doctorsSeed } from '../data'

const DoctorPatients = () => {
  const [search, setSearch] = useState('')
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const filtered = patientsSeed.filter((p) =>
    p.fullName.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search) ||
    p.address.toLowerCase().includes(search.toLowerCase())
  )

  const totalVisits = patientsSeed.reduce((sum, p) => sum + p.visits.length, 0)
  const totalRevenue = patientsSeed.reduce((sum, p) => sum + p.totalPaid, 0)

  return (
    <div className="animate-fade-in">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">Bemorlar</h2>
          <p className="text-slate-400 mt-1">Ro'yxatga olingan bemorlar va ularning tibbiy tarixi</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-xl">
              <FiUser />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Jami bemorlar</p>
              <p className="text-2xl font-bold text-slate-100">{patientsSeed.length}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400 text-xl">
              <FiCalendar />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Jami tashriflar</p>
              <p className="text-2xl font-bold text-slate-100">{totalVisits}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-xl">
              <FiCreditCard />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Jami to'lovlar</p>
              <p className="text-lg font-bold text-slate-100">{(totalRevenue / 1000000).toFixed(1)} mln so'm</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Ism, telefon yoki manzil bo'yicha qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/30"
          />
        </div>

        {/* Patients List */}
        {filtered.length === 0 ? (
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 text-center text-slate-500">
            <p className="text-lg">👤 Bemorlar topilmadi</p>
            <p className="text-sm mt-1">Qidiruv so'zini o'zgartiring</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((patient) => {
              const isExpanded = expandedId === patient.id
              const lastVisit = patient.visits.at(-1)

              return (
                <div
                  key={patient.id}
                  className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-200"
                >
                  {/* Patient card header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : patient.id)}
                    className="w-full text-left p-5 flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* Avatar + Name */}
                    <div className="flex items-center gap-3 flex-1">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/30 to-teal-500/20 border border-emerald-500/30 text-emerald-300 text-lg font-bold shrink-0">
                        {patient.fullName.charAt(0)}
                      </span>
                      <div>
                        <p className="font-semibold text-slate-100">{patient.fullName}</p>
                        <p className="text-xs text-slate-500">
                          Ro'yxatga olingan: {new Date(patient.registeredAt).toLocaleDateString('uz-UZ')}
                        </p>
                      </div>
                    </div>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiPhone className="text-slate-500 shrink-0" />
                        <span>{patient.phone}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400">
                        <FiMapPin className="text-slate-500 shrink-0" />
                        <span className="truncate">{patient.address}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <FiActivity className="text-red-400 shrink-0" />
                        <span className="text-red-300 font-semibold">{patient.bloodType}</span>
                      </div>
                      <div className="text-xs text-slate-400">
                        <span className="text-slate-300 font-semibold">{patient.visits.length}</span> tashrif
                      </div>
                    </div>

                    {/* Expand icon */}
                    <span className="text-slate-500 shrink-0 hidden sm:block">
                      {isExpanded ? <FiChevronUp /> : <FiChevronDown />}
                    </span>
                  </button>

                  {/* Expanded: visit history */}
                  {isExpanded && (
                    <div className="border-t border-white/10 px-5 pb-5">
                      {/* Patient extra info row */}
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 mb-4 border-b border-white/5">
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Tug'ilgan sana</p>
                          <p className="text-sm font-medium text-slate-200">
                            {new Date(patient.birthDate).toLocaleDateString('uz-UZ')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Jami to'lov</p>
                          <p className="text-sm font-medium text-emerald-300">
                            {patient.totalPaid.toLocaleString('uz-UZ')} so'm
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Statsionar kunlar</p>
                          <p className="text-sm font-medium text-slate-200">{patient.totalStayDays} kun</p>
                        </div>
                        <div>
                          <p className="text-xs text-slate-500 mb-1">Oxirgi tashrif</p>
                          <p className="text-sm font-medium text-slate-200">
                            {lastVisit ? new Date(lastVisit.date).toLocaleDateString('uz-UZ') : '—'}
                          </p>
                        </div>
                      </div>

                      {/* Visit history table */}
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                        Tashriflar tarixi
                      </p>
                      <div className="space-y-2">
                        {patient.visits.map((visit) => {
                          const doctor = doctorsSeed.find((d) => d.id === visit.doctorId)
                          return (
                            <div
                              key={visit.id}
                              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 bg-slate-800/60 rounded-xl px-4 py-3 text-sm"
                            >
                              <span className="text-slate-400 w-28 shrink-0">
                                {new Date(visit.date).toLocaleDateString('uz-UZ')}
                              </span>
                              <span className="flex-1 font-medium text-slate-100">{visit.diagnosis}</span>
                              <span className="text-slate-400 text-xs shrink-0">
                                {doctor?.fullName ?? `Doktor #${visit.doctorId}`}
                              </span>
                              <span className="text-emerald-300 text-xs font-semibold shrink-0">
                                {visit.paid.toLocaleString('uz-UZ')} so'm
                              </span>
                              {visit.stayDays > 0 && (
                                <span className="bg-blue-500/15 text-blue-300 border border-blue-500/30 text-xs px-2 py-0.5 rounded-full shrink-0">
                                  {visit.stayDays} kun
                                </span>
                              )}
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
      </div>
    </div>
  )
}

export default DoctorPatients
