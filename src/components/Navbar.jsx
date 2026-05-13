import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ExternalLink } from 'lucide-react'

const links = [
  { label: 'How it Works', href: '#how-it-works' },
  { label: 'Features', href: '#features' },
  { label: 'Games', href: '#games' },
  { label: 'Stats', href: '#stats' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: '0 24px',
          transition: 'all 0.3s',
          background: scrolled ? 'rgba(19, 19, 19, 0.9)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(59, 74, 63, 0.3)' : '1px solid transparent',
        }}
      >
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <a href="#" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 22,
              fontWeight: 700,
              color: 'var(--text-primary)',
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}>
              IKKII
            </span>
          </a>

          {/* Desktop nav */}
          <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
            {links.map(l => (
              <a 
                key={l.href} 
                href={l.href} 
                className="nav-link"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: 13,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '8px 16px',
                  borderRadius: 0,
                  transition: 'color 0.2s, background 0.2s',
                }}
                onMouseEnter={e => {
                  e.target.style.color = 'var(--primary)'
                  e.target.style.background = 'rgba(20, 241, 149, 0.05)'
                }}
                onMouseLeave={e => {
                  e.target.style.color = 'var(--text-secondary)'
                  e.target.style.background = 'transparent'
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a 
              href="https://github.com/ikkii-org" 
              target="_blank" 
              rel="noopener"
              style={{
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                textDecoration: 'none',
                fontSize: 13,
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--primary)'}
              onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span className="hide-mobile">GitHub</span>
            </a>
            <a href="#waitlist" className="btn btn-primary" style={{ padding: '10px 20px', fontSize: 12 }}>
              Start Dueling <ExternalLink size={14} />
            </a>
            <button
              onClick={() => setMobileOpen(v => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)', display: 'none' }}
              className="mobile-menu-btn"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'fixed',
              top: 72,
              left: 0,
              right: 0,
              background: 'rgba(19, 19, 19, 0.97)',
              zIndex: 999,
              borderBottom: '1px solid var(--border)',
              padding: '20px 24px 28px',
              backdropFilter: 'blur(20px)',
            }}
          >
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: 'block',
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontFamily: 'var(--font-display)',
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  padding: '14px 0',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                {l.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}
