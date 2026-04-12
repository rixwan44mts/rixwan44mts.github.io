import { NavLink, Outlet } from 'react-router-dom'

export function SiteLayout() {
  return (
    <main className="page-shell">
      <nav className="site-nav" aria-label="Primary">
        <NavLink to="/" end className={({ isActive }) => `site-nav-link${isActive ? ' active' : ''}`}>
          Home
        </NavLink>
        <NavLink
          to="/services"
          className={({ isActive }) => `site-nav-link${isActive ? ' active' : ''}`}
        >
          Services
        </NavLink>
        <NavLink
          to="/case-study"
          className={({ isActive }) => `site-nav-link${isActive ? ' active' : ''}`}
        >
          Case Study
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => `site-nav-link${isActive ? ' active' : ''}`}>
          About
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) => `site-nav-link${isActive ? ' active' : ''}`}
        >
          Contact
        </NavLink>
      </nav>
      <Outlet />
    </main>
  )
}
