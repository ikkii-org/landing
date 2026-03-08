import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon } from 'lucide-react'
import { useTheme } from '../App'

const links = [
    { label: 'How it Works', href: '#how-it-works' },
    { label: 'Features', href: '#features' },
    { label: 'Games', href: '#games' },
    { label: 'Leaderboard', href: '#testimonials' },
]

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const { theme, toggleTheme } = useTheme()
    const isDark = theme === 'dark'

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 40)
        window.addEventListener('scroll', handler, { passive: true })
        return () => window.removeEventListener('scroll', handler)
    }, [])

    const navBg = scrolled
        ? isDark
            ? 'rgba(4,4,10,0.88)'
            : 'rgba(248,249,255,0.92)'
        : 'transparent'

    const navBorder = scrolled
        ? isDark
            ? '1px solid rgba(30,30,53,0.8)'
            : '1px solid rgba(200,200,240,0.8)'
        : '1px solid transparent'

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
                    background: navBg,
                    backdropFilter: scrolled ? 'blur(20px)' : 'none',
                    borderBottom: navBorder,
                }}
            >
                <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
                    {/* Logo */}
                    <a href="#" style={{ textDecoration: 'none' }}>
                        <span style={{ fontFamily: "'Cy Grotesk Grand', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text1)', letterSpacing: -1, textTransform: 'uppercase' }}>
                            IKKII
                        </span>
                    </a>

                    {/* Desktop nav */}
                    <nav style={{ display: 'flex', gap: 4, alignItems: 'center' }} className="desktop-nav">
                        {links.map(l => (
                            <a key={l.href} href={l.href} className="nav-link">
                                {l.label}
                            </a>
                        ))}
                    </nav>

                    {/* Right controls */}
                    <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                        {/* Theme toggle */}
                        <motion.button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            whileTap={{ scale: 0.9 }}
                            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                            title={isDark ? 'Light mode' : 'Dark mode'}
                        >
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={theme}
                                    initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                                    exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                                    transition={{ duration: 0.2 }}
                                    style={{ display: 'flex' }}
                                >
                                    {isDark
                                        ? <Sun size={16} />
                                        : <Moon size={16} />
                                    }
                                </motion.span>
                            </AnimatePresence>
                        </motion.button>

                        <a href="#cta" className="btn btn-primary" style={{ padding: '10px 22px', fontSize: 14 }}>
                            Start Dueling
                        </a>
                        <button
                            onClick={() => setMobileOpen(v => !v)}
                            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text2)', display: 'none' }}
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
                            background: isDark ? 'rgba(4,4,10,0.97)' : 'rgba(248,249,255,0.97)',
                            zIndex: 999,
                            borderBottom: `1px solid var(--border)`,
                            padding: '20px 24px 28px',
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {links.map(l => (
                            <a key={l.href} href={l.href}
                                onClick={() => setMobileOpen(false)}
                                style={{
                                    display: 'block', color: 'var(--text2)', textDecoration: 'none',
                                    fontSize: 16, fontWeight: 500, padding: '14px 0',
                                    borderBottom: `1px solid var(--border)`,
                                }}
                            >
                                {l.label}
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
                .nav-link {
                    color: var(--text2);
                    text-decoration: none;
                    font-size: 14px;
                    font-weight: 500;
                    padding: 8px 16px;
                    border-radius: 8px;
                    transition: color 0.2s, background 0.2s;
                }
                .nav-link:hover {
                    color: var(--text1);
                    background: rgba(124, 58, 237, 0.06);
                }
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
