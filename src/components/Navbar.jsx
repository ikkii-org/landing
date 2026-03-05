import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const links = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Games', href: '#games' },
    { label: 'Leaderboard', href: '#testimonials' },
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
                    position: 'fixed', top: 0, left: 0, right: 0,
                    zIndex: 1000,
                    padding: '0 24px',
                    transition: 'all 0.3s',
                    background: scrolled ? 'rgba(4,4,10,0.85)' : 'transparent',
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: scrolled ? '1px solid rgba(30,30,53,0.8)' : '1px solid transparent',
                }}
            >
                <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
                    {/* Logo */}
                    <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{
                            width: 34, height: 34, borderRadius: 10,
                            background: 'linear-gradient(135deg, #6D28D9, #9945FF)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            boxShadow: '0 0 16px rgba(139,92,246,0.5)'
                        }}>
                            <Zap size={18} color="#fff" fill="#fff" />
                        </div>
                        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: '#F1F5F9', letterSpacing: -0.5 }}>
                            IKKII
                        </span>
                    </a>

                    {/* Desktop nav */}
                    <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
                        {links.map(l => (
                            <a key={l.href} href={l.href} style={{
                                color: '#94A3B8', textDecoration: 'none', fontSize: 14, fontWeight: 500,
                                padding: '8px 16px', borderRadius: 8,
                                transition: 'color 0.2s, background 0.2s',
                            }}
                                onMouseEnter={e => { e.target.style.color = '#F1F5F9'; e.target.style.background = 'rgba(255,255,255,0.04)'; }}
                                onMouseLeave={e => { e.target.style.color = '#94A3B8'; e.target.style.background = 'transparent'; }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    {/* CTA */}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        <a href="#cta" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
                            Start Dueling
                        </a>
                        <button
                            onClick={() => setMobileOpen(v => !v)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#94A3B8', display: 'none' }}
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
                            position: 'fixed', top: 72, left: 0, right: 0,
                            background: 'rgba(4,4,10,0.97)', zIndex: 999,
                            borderBottom: '1px solid #1E1E35',
                            padding: '20px 24px 28px',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {links.map(l => (
                            <a key={l.href} href={l.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    display: 'block', color: '#94A3B8', textDecoration: 'none',
                                    fontSize: 16, fontWeight: 500, padding: '14px 0',
                                    borderBottom: '1px solid rgba(30,30,53,0.5)',
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
        }
        @media (max-width: 400px) {
          .nav-logo-text { font-size: 18px !important; }
        }
      `}</style>
        </>
    )
}
