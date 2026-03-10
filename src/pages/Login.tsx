import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

const Login = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const user = login(username, password)
    if (!user) {
      setError("Login yoki parol noto'g'ri")
      return
    }

    if (user.role === 'admin') navigate('/admin-dashboard')
    else if (user.role === 'doctor') navigate('/doctor-dashboard')
    else navigate('/user-dashboard')
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
            Tizimga kirish
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1.5">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="demo_admin"
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
              Kirish
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Hisobingiz yo&apos;qmi?{' '}
            <Link
              to="/register"
              className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
            >
              Ro&apos;yxatdan o&apos;ting
            </Link>
          </p>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-4 bg-slate-900/50 border border-white/5 rounded-xl p-4 text-xs text-slate-500 space-y-1">
          <p className="text-slate-400 font-medium mb-2">Demo loginlar:</p>
          <p>
            👤 Admin:{' '}
            <span className="text-slate-300">demo_admin</span> / demo123
          </p>
          <p>
            🩺 Doctor:{' '}
            <span className="text-slate-300">demo_doctor</span> / demo123
          </p>
          <p>
            🙂 User:{' '}
            <span className="text-slate-300">demo_user</span> / demo123
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login
