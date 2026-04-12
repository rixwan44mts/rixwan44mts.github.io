import { Suspense, lazy } from 'react'

const HeroPage = lazy(() => import('./pages/HeroPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'))

function normalizePath(pathname: string): string {
  const normalized = pathname.replace(/\/+$/, '')
  return normalized === '' ? '/' : normalized
}

function App() {
  const currentPath = normalizePath(window.location.pathname)
  const ActiveRoute = currentPath === '/' ? HeroPage : NotFoundPage

  return (
    <Suspense fallback={<main className="page-shell">Loading...</main>}>
      <ActiveRoute />
    </Suspense>
  )
}

export default App
