/**
 * @deprecated Migrated to Zustand in src/store/useAuthStore.ts
 * This file is kept for backward compatibility during the transition.
 */
// eslint-disable-next-line react-refresh/only-export-components
export { useAuth } from '../store/useAuthStore'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // We keep this as a fragment so we don't break main.tsx yet, 
  // but it doesn't provide any context.
  return <>{children}</>
}
