import { Link } from 'react-router-dom'
import { FiArrowRight, FiUsers, FiCalendar, FiActivity, FiSettings } from 'react-icons/fi'

const features = [
  {
    icon: '🏥',
    title: 'Hamshira stoli',
    description: "Yangi bemorlarni tez va oson ro'yxatdan o'tkazish, qon guruhi va shaxsiy ma'lumotlarni saqlash.",
    accent: 'from-cyan-500/20 to-blue-500/10 border-cyan-500/30',
    iconBg: 'bg-cyan-500/20',
  },
  {
    icon: '📅',
    title: 'Bemor portali',
    description: "Online navbat band qilish, to'lov cheki yuklash va Telegram orqali tasdiqlash.",
    accent: 'from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30',
    iconBg: 'bg-fuchsia-500/20',
  },
  {
    icon: '⚙️',
    title: 'Admin panel',
    description: "Barcha doktorlar, navbatlar va to'lov cheklar ustidan to'liq nazorat va statistika.",
    accent: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    iconBg: 'bg-emerald-500/20',
  },
]

const stats = [
  { icon: <FiUsers size={22} />, label: 'Faol bemorlar', value: '3+', color: 'text-cyan-400' },
  { icon: <FiActivity size={22} />, label: 'Mutaxassislar', value: '4', color: 'text-fuchsia-400' },
  { icon: <FiCalendar size={22} />, label: "Navbat bo'sh joylar", value: '22', color: 'text-amber-400' },
  { icon: <FiSettings size={22} />, label: 'Rollar', value: '3', color: 'text-emerald-400' },
]

const HomePage = () => (
  <div className="animate-fade-in space-y-10">
    {/* Hero */}
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-cyan-500/15 via-slate-900/80 to-fuchsia-600/15 p-8 shadow-2xl backdrop-blur-xl">
      <div className="flex items-center gap-3 mb-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 text-2xl font-black text-slate-950 shadow-lg shadow-cyan-500/40">
          +
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
            AqilliMed
          </span>{' '}
          <span className="text-slate-100">Hospital</span>
        </h1>
      </div>
      <p className="max-w-2xl text-base text-slate-400 sm:text-lg leading-relaxed">
        Hamshiralar uchun tez registratsiya · Bemorlar uchun online navbat va to'lov · Admin uchun to'liq
        nazorat va statistika.
      </p>
      <div className="mt-6">
        <Link
          to="/dashboard"
          className="btn-primary inline-flex items-center gap-2 text-base px-6 py-3"
        >
          Boshqaruv paneliga o'tish
          <FiArrowRight />
        </Link>
      </div>
    </section>

    {/* Stats */}
    <section className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="card-modern flex flex-col items-center justify-center text-center gap-2 py-5"
        >
          <span className={stat.color}>{stat.icon}</span>
          <p className="text-2xl font-extrabold text-slate-100">{stat.value}</p>
          <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
        </div>
      ))}
    </section>

    {/* Features */}
    <section>
      <h2 className="text-lg font-bold text-slate-300 mb-4 tracking-tight">Asosiy xususiyatlar</h2>
      <div className="grid gap-4 sm:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className={`rounded-2xl border bg-gradient-to-br p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${feature.accent}`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-xl text-xl mb-3 ${feature.iconBg}`}
            >
              {feature.icon}
            </span>
            <h3 className="font-semibold text-slate-100 text-base mb-1.5">{feature.title}</h3>
            <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>

    {/* CTA */}
    <section className="rounded-2xl border border-white/10 bg-white/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="text-slate-100 font-semibold text-base">Platformani sinab ko'ring</p>
        <p className="text-sm text-slate-400 mt-1">Hamshira, bemor yoki admin roliga o'ting va funksiyalarni tekshiring.</p>
      </div>
      <Link to="/dashboard" className="btn-secondary shrink-0 inline-flex items-center gap-2">
        Dashboard →
      </Link>
    </section>
  </div>
)

export default HomePage
