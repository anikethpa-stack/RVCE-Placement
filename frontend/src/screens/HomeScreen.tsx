import { GoogleLogin } from '@react-oauth/google'
import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { toast } from 'sonner'
import { ShieldCheck, UserRound } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { AuthCardSkeleton } from '@/components/modern/Skeleton'
import { CollegeLogo } from '@/components/modern/CollegeLogo'
import { cn } from '@/lib/utils'

type Role = 'student' | 'spc'

export default function HomeScreen() {
  const { loginWithGoogle, loginWithSpc, errorMessage, clearError, status } = useAuth()
  const [role, setRole] = useState<Role>('student')
  const [spcUsername, setSpcUsername] = useState('')
  const [spcPassword, setSpcPassword] = useState('')
  const isBusy = status === 'loading'

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
      clearError()
    }
  }, [errorMessage, clearError])

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f8fbff] px-5 py-10 text-slate-950">
      <div className="pointer-events-none absolute inset-x-[-35%] top-[-8rem] h-[25rem] rounded-b-[55%] bg-[#dff0ff]" />
      <div className="pointer-events-none absolute inset-x-[-25%] top-[-2rem] h-[20rem] rounded-b-[55%] bg-white" />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center">
        <div className="mb-20 flex flex-col items-center sm:mb-16">
          <CollegeLogo imageClassName="w-48" />
          <h1 className="mt-3 text-xl font-medium tracking-tight">Placement</h1>
        </div>

        {isBusy ? (
          <AuthCardSkeleton />
        ) : (
          <section
            aria-label="Placement portal sign in"
            className="w-full rounded-[2rem] border border-white/10 bg-[#444444] p-6 shadow-[0_24px_60px_rgba(15,23,42,0.28)] animate-in fade-in slide-in-from-bottom-2 duration-500"
          >
            <div className="mb-8 flex rounded-full bg-[#d2eaff] p-1.5" role="tablist" aria-label="Role">
              <RoleTab
                icon={<UserRound className="size-4" aria-hidden="true" />}
                label="Student"
                active={role === 'student'}
                onClick={() => setRole('student')}
              />
              <RoleTab
                icon={<ShieldCheck className="size-4" aria-hidden="true" />}
                label="SPC"
                active={role === 'spc'}
                onClick={() => setRole('spc')}
              />
            </div>

            {role === 'student' ? (
              <>
                <p className="mb-4 text-center text-xs text-white/60">
                  Sign in with your RVCE Google account
                </p>
                <div className="flex justify-center rounded-2xl bg-[#0d72d9] px-3 py-3">
                  <GoogleLogin
                    onSuccess={(cred) => {
                      if (cred.credential) void loginWithGoogle(cred.credential)
                    }}
                    onError={() => toast.error('Google sign-in failed.')}
                    useOneTap={false}
                    theme="filled_blue"
                    size="large"
                    text="continue_with"
                    shape="pill"
                    width="300"
                  />
                </div>
              </>
            ) : (
              <form
                className="space-y-4"
                onSubmit={(event) => {
                  event.preventDefault()
                  const username = spcUsername.trim()
                  if (!username || !spcPassword) {
                    toast.error('Enter SPC username and password.')
                    return
                  }
                  void loginWithSpc(username, spcPassword)
                }}
              >
                <label className="block">
                  <span className="sr-only">SPC username</span>
                  <input
                    type="text"
                    autoComplete="username"
                    value={spcUsername}
                    onChange={(event) => setSpcUsername(event.target.value)}
                    placeholder="Username"
                    className="w-full rounded-2xl bg-[#f0f7ff] px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  />
                </label>
                <label className="block">
                  <span className="sr-only">SPC password</span>
                  <input
                    type="password"
                    autoComplete="current-password"
                    value={spcPassword}
                    onChange={(event) => setSpcPassword(event.target.value)}
                    placeholder="Password"
                    className="w-full rounded-2xl bg-[#f0f7ff] px-5 py-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#0066cc]"
                  />
                </label>
                <button
                  type="submit"
                  className="mt-2 w-full rounded-2xl bg-[#0066cc] py-4 font-semibold text-white transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#444444]"
                >
                  Sign in
                </button>
              </form>
            )}
          </section>
        )}
      </main>
    </div>
  )
}

function RoleTab({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={cn(
        'flex flex-1 items-center justify-center gap-2 rounded-full py-3 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        active ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-700 hover:text-gray-900',
      )}
    >
      {icon}
      {label}
    </button>
  )
}
