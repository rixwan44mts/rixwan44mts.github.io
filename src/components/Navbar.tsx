import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'

const navItems = [
  { label: 'Services', to: '/services' },
  { label: 'Case Study', to: '/case-study' },
  { label: 'About', to: '/about' },
  { label: 'Book a Call', to: '/contact' },
]

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const shellClassName = useMemo(() => {
    return [
      'fixed top-0 z-50 w-full transition-all duration-300',
      isScrolled ? 'backdrop-blur-xl bg-[#080808]/70 border-b border-white/[0.07]' : '',
    ]
      .filter(Boolean)
      .join(' ')
  }, [isScrolled])

  return (
    <header
      className={shellClassName}
      style={
        isScrolled
          ? {
              backgroundColor: 'rgba(8, 8, 8, 0.7)',
              backdropFilter: 'blur(24px)',
              borderBottom: '1px solid rgba(255, 255, 255, 0.07)',
            }
          : undefined
      }
    >
      <nav
        aria-label="Primary navigation"
        style={{
          width: 'min(1120px, 92vw)',
          margin: '0 auto',
          minHeight: '72px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        <Link to="/" style={{ color: '#f5f5f5', fontWeight: 700, textDecoration: 'none', fontSize: '1.1rem' }}>
          Precision <span style={{ color: '#d4ff6b' }}>Flow</span>
        </Link>

        <ul className="navbar-desktop-links" style={{ listStyle: 'none', display: 'flex', gap: '1.25rem', margin: 0, padding: 0 }}>
          {navItems.map(({ label, to }) => (
            <li key={to}>
              <NavLink
                to={to}
                style={({ isActive }) => ({
                  color: isActive ? '#d4ff6b' : '#ededed',
                  textDecoration: 'none',
                  fontWeight: 600,
                })}
              >
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="navbar-cta-desktop">
          <NavLink
            to="/contact"
            style={{
              borderRadius: '999px',
              backgroundColor: '#d4ff6b',
              color: '#0b0b0b',
              textDecoration: 'none',
              fontWeight: 700,
              padding: '0.65rem 1.1rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              whiteSpace: 'nowrap',
            }}
          >
            Book a Discovery Call →
          </NavLink>
        </div>

        <button
          type="button"
          aria-expanded={mobileOpen}
          aria-label="Toggle navigation menu"
          className="navbar-mobile-toggle"
          onClick={() => setMobileOpen((value) => !value)}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#f5f5f5',
            padding: 4,
            display: 'none',
            cursor: 'pointer',
          }}
        >
          <Menu size={24} />
        </button>
      </nav>

      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            style={{ overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <motion.ul
              style={{
                width: 'min(1120px, 92vw)',
                margin: '0 auto',
                listStyle: 'none',
                padding: '0.9rem 0 1rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
              initial="hidden"
              animate="show"
              exit="hidden"
              variants={{
                hidden: {},
                show: {
                  transition: {
                    staggerChildren: 0.05,
                  },
                },
              }}
            >
              {navItems.map(({ label, to }) => (
                <motion.li
                  key={`mobile-${to}`}
                  variants={{
                    hidden: { opacity: 0, y: -6 },
                    show: { opacity: 1, y: 0 },
                  }}
                >
                  <NavLink
                    to={to}
                    onClick={() => setMobileOpen(false)}
                    style={({ isActive }) => ({
                      color: isActive ? '#d4ff6b' : '#ededed',
                      textDecoration: 'none',
                      fontWeight: 600,
                    })}
                  >
                    {label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: -6 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <NavLink
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  style={{
                    borderRadius: '999px',
                    backgroundColor: '#d4ff6b',
                    color: '#0b0b0b',
                    textDecoration: 'none',
                    fontWeight: 700,
                    padding: '0.65rem 1.1rem',
                    display: 'inline-flex',
                    width: '100%',
                    justifyContent: 'center',
                  }}
                >
                  Book a Discovery Call →
                </NavLink>
              </motion.li>
            </motion.ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}

export default Navbar
