import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  handleLogin: (email: string, password: string) => void
}

export default function Login({ handleLogin }: LoginProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !password) {
      setError('Please fill in all fields')
      return
    }

    setIsLoading(true)
    try {
      await handleLogin(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid credentials')
      console.error('Login error:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#fde9ce] to-[#fff5e6] py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-lg p-10 rounded-2xl shadow-xl border border-white/30 transition-all duration-300 hover:shadow-2xl">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-[#280f03] tracking-tight">
            Employee Portal
          </h2>
          <p className="mt-2 text-sm text-[#280f03]/70">
            Sign in to access your dashboard
          </p>
        </div>

        {error && (
          <div className="rounded-xl bg-[#f85565]/10 p-4 border border-[#f85565]/30">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-[#f85565]">{error}</h3>
              </div>
            </div>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-[#280f03]">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 appearance-none block w-full px-4 py-3 border border-[#f8b56d]/40 bg-white/70 rounded-xl shadow-sm placeholder-[#280f03]/50 focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200 text-[#280f03] sm:text-sm"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-[#280f03]">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-2 appearance-none block w-full px-4 py-3 border border-[#f8b56d]/40 bg-white/70 rounded-xl shadow-sm placeholder-[#280f03]/50 focus:outline-none focus:ring-2 focus:ring-[#f85565] focus:border-transparent transition-all duration-200 text-[#280f03] sm:text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-[#f85565] focus:ring-[#f85565] border-[#f8b56d]/40 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-[#280f03]/80">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#f85565] hover:text-[#e67e51] transition-colors duration-200">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl shadow-md text-sm font-semibold text-white bg-gradient-to-r from-[#f8b56d] to-[#f85565] hover:from-[#f8b56d]/90 hover:to-[#f85565]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#f85565] transition-all duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : 'Sign in'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}