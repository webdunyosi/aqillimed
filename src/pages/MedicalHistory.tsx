import {
  FiActivity,
  FiCalendar,
  FiDollarSign,
  FiDroplet,
  FiHome,
  FiPhone,
  FiUser,
  FiMapPin,
  FiClock,
} from 'react-icons/fi'
import { patientsSeed, doctorsSeed } from '../data'
import { getCurrentUser } from '../services/auth'

const MedicalHistory = () => {
  const user = getCurrentUser()
  const patient = patientsSeed.find((p) => p.fullName === user?.fullName)

  if (!patient) {
    return (
      <div className="animate-fade-in">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-100">Tibbiy tarix</h2>
            <p className="text-slate-400 mt-1">Kasallik tarixi va tashriflar</p>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-12 text-center">
            <div className="flex justify-center mb-4">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-800 text-slate-500 text-3xl">
                <FiActivity />
              </span>
            </div>
            <p className="text-slate-300 font-medium text-lg">Tibbiy tarix topilmadi</p>
            <p className="text-slate-500 text-sm mt-1">
              Ushbu profil uchun tibbiy ma'lumotlar mavjud emas
            </p>
          </div>
        </div>
      </div>
    )
  }

  const age = new Date().getFullYear() - new Date(patient.birthDate).getFullYear()

  const sortedVisits = [...patient.visits].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )

  return (
    <div className="animate-fade-in">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-100">Tibbiy tarix</h2>
          <p className="text-slate-400 mt-1">Kasallik tarixi va shifoxonaga tashriflar</p>
        </div>

        {/* Patient Profile Card */}
        <div className="bg-slate-900 border border-white/10 rounded-2xl p-6 mb-6">
          <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center">
            {/* Avatar */}
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/20 text-violet-300 text-2xl font-bold shrink-0">
              {patient.fullName.charAt(0)}
            </div>

            {/* Name & basic info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-slate-100">{patient.fullName}</h3>
              <div className="flex flex-wrap gap-x-5 gap-y-1 mt-1.5">
                <p className="text-sm text-slate-400 flex items-center gap-1.5">
                  <FiUser className="text-slate-500" />
                  {age} yosh
                </p>
                <p className="text-sm text-slate-400 flex items-center gap-1.5">
                  <FiPhone className="text-slate-500" />
                  {patient.phone}
                </p>
                <p className="text-sm text-slate-400 flex items-center gap-1.5">
                  <FiMapPin className="text-slate-500" />
                  {patient.address}
                </p>
                <p className="text-sm text-slate-400 flex items-center gap-1.5">
                  <FiCalendar className="text-slate-500" />
                  Ro'yxatdan o'tgan: {new Date(patient.registeredAt).toLocaleDateString('uz-UZ')}
                </p>
              </div>
            </div>

            {/* Blood type badge */}
            <div className="flex flex-col items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/25 px-5 py-3 shrink-0">
              <FiDroplet className="text-red-400 text-lg mb-1" />
              <span className="text-red-300 font-bold text-lg">{patient.bloodType}</span>
              <span className="text-slate-500 text-xs mt-0.5">Qon guruhi</span>
            </div>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/15 text-violet-400 text-xl shrink-0">
              <FiActivity />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Jami tashriflar</p>
              <p className="text-2xl font-bold text-slate-100">{patient.visits.length}</p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 text-xl shrink-0">
              <FiDollarSign />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Jami to'lov</p>
              <p className="text-xl font-bold text-slate-100">
                {patient.totalPaid.toLocaleString('uz-UZ')} so'm
              </p>
            </div>
          </div>
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 flex items-center gap-4">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-500/15 text-cyan-400 text-xl shrink-0">
              <FiHome />
            </span>
            <div>
              <p className="text-slate-400 text-xs">Statsionar kunlar</p>
              <p className="text-2xl font-bold text-slate-100">{patient.totalStayDays}</p>
            </div>
          </div>
        </div>

        {/* Visit Timeline */}
        <div>
          <h3 className="text-lg font-semibold text-slate-200 mb-4 flex items-center gap-2">
            <FiClock className="text-slate-400" />
            Tashrif tarixi
          </h3>

          {sortedVisits.length === 0 ? (
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-10 text-center text-slate-500">
              <p>Hali hech qanday tashrif qayd etilmagan</p>
            </div>
          ) : (
            <div className="relative space-y-4">
              {/* Timeline line */}
              <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-violet-500/40 via-slate-700/60 to-transparent hidden sm:block" />

              {sortedVisits.map((visit, index) => {
                const doctor = doctorsSeed.find((d) => d.id === visit.doctorId)
                const isLatest = index === 0

                return (
                  <div key={visit.id} className="flex gap-4 sm:gap-5 items-start">
                    {/* Timeline dot */}
                    <div
                      className={`relative z-10 flex h-[56px] w-[56px] shrink-0 flex-col items-center justify-center rounded-xl border text-center ${
                        isLatest
                          ? 'bg-violet-500/15 border-violet-500/40'
                          : 'bg-slate-800 border-white/10'
                      }`}
                    >
                      <span className={`text-lg font-bold leading-none ${isLatest ? 'text-violet-300' : 'text-slate-300'}`}>
                        {visit.date.split('-')[2]}
                      </span>
                      <span className={`text-[10px] mt-0.5 ${isLatest ? 'text-violet-400' : 'text-slate-500'}`}>
                        {new Date(visit.date).toLocaleString('uz-UZ', { month: 'short' })}
                      </span>
                    </div>

                    {/* Visit card */}
                    <div
                      className={`flex-1 bg-slate-900 rounded-2xl p-5 border transition-all duration-200 hover:border-white/20 ${
                        isLatest ? 'border-violet-500/20' : 'border-white/10'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start gap-3 justify-between">
                        {/* Diagnosis & Doctor */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            {isLatest && (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-violet-500/20 text-violet-300 border border-violet-500/30">
                                So'nggi
                              </span>
                            )}
                          </div>
                          <p className="text-base font-semibold text-slate-100">{visit.diagnosis}</p>
                          <p className="text-sm text-slate-400 mt-0.5">
                            {doctor?.fullName ?? `Doktor #${visit.doctorId}`}
                          </p>
                          <p className="text-xs text-slate-500">{doctor?.specialty}</p>
                        </div>

                        {/* Visit details */}
                        <div className="flex sm:flex-col gap-4 sm:gap-1.5 sm:items-end shrink-0">
                          <p className="text-sm text-emerald-300 font-medium flex items-center gap-1.5">
                            <FiDollarSign className="text-emerald-400 shrink-0" />
                            {visit.paid.toLocaleString('uz-UZ')} so'm
                          </p>
                          {visit.stayDays > 0 && (
                            <p className="text-sm text-cyan-300 flex items-center gap-1.5">
                              <FiHome className="text-cyan-400 shrink-0" />
                              {visit.stayDays} kun statsionar
                            </p>
                          )}
                          {visit.stayDays === 0 && (
                            <p className="text-sm text-slate-500 flex items-center gap-1.5">
                              <FiHome className="text-slate-600 shrink-0" />
                              Ambulatoriya
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/8">
                        <p className="text-xs text-slate-500 flex items-center gap-1.5">
                          <FiCalendar className="text-slate-600" />
                          {new Date(visit.date).toLocaleDateString('uz-UZ', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MedicalHistory