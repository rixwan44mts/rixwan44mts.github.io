import type { ReactNode } from 'react'

type PageTransitionProps = {
  children: ReactNode
}

function PageTransition({ children }: PageTransitionProps) {
  return <div className="page-transition">{children}</div>
}

export default PageTransition
