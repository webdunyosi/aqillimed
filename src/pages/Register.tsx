import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/auth'

const Register = () => {
  const navigate = useNavigate()
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Parollar mos kelmaydi')
      return
    }

    const result = register(fullName, username, password)
    if (!result.success) {
      setError(result.error ?? 'Xatolik yuz berdi')
      return
    }

    setSuccess(true)
    setTimeout(() => navigate('/login'), 2000)
  }

  if (success) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-5xl mb-4">✅</div>
          <h2 className="text-xl font-bold text-slate-100 mb-2">
            Muvaffaqiyatli ro&apos;yxatdan o&apos;tdingiz!
          </h2>
          <p className="text-slate-400">Login sahifasiga yo&apos;naltirilmoqda...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-base font-black text-slate-950 shadow-lg shadow-cyan-500/40">
              +
            </span>
            <h1 className="text-2xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-300 to-fuchsia-400 bg-clip-text text-transparent">
                AqilliMed
              </span>
            </h1>
          </Link>
        </div>

        <div className="bg-slate-900 border border-white/10 rounded-2xl p-8 shadow-2xl shadow-black/40">
          <h2 className="text-xl font-bold text-slate-100 mb-6 text-center">
            Ro&apos;yxatdan o&apos;tish
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                To&apos;liq ism
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ali Valiyev"
                required
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ali_valiyev"
                required
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Parol
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••"
                required
                minLength={6}
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Parolni tasdiqlang
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••"
                required
                className="w-full bg-slate-800 border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all duration-200"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-slate-950 font-bold py-3 rounded-xl transition-all duration-200 shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 hover:scale-[1.01] mt-2"
            >
              Ro&apos;yxatdan o&apos;tish
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Hisobingiz bormi?{' '}
            <Link
              to="/login"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
