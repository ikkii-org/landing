import { motion } from 'framer-motion'
import { Zap, Twitter, Github, Send } from 'lucide-react'

const nav = {
    Product: ['How It Works', 'Features', 'Games', 'Leaderboard'],
    Company: ['About', 'Blog', 'Careers', 'Press Kit'],
    Developers: ['Smart Contract', 'SDK Docs', 'API Reference', 'GitHub'],
    Legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
}

export default function Footer() {
    return (
        <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)' }}>
            <div className="container" style={{ padding: '80px 24px 40px' }}>

                {/* Top row */}
                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 48, marginBottom: 64 }} className="footer-grid">
                    {/* Brand column */}
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                            <div style={{
                                width: 34, height: 34, borderRadius: 10,
                                background: 'linear-gradient(135deg, #6D28D9, #9945FF)',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 0 16px rgba(139,92,246,0.4)'
                            }}>
                                <Zap size={18} color="#fff" fill="#fff" />
                            </div>
                            <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 22, fontWeight: 700, color: '#F1F5F9', letterSpacing: -0.5 }}>IKKII</span>
                        </div>
                        <p style={{ fontSize: 14, color: '#64748B', lineHeight: 1.7, maxWidth: 260, marginBottom: 24 }}>
                            The trustless 1v1 competitive gaming platform on Solana. Wager, play, and win — permissionlessly.
                        </p>
                        <div style={{ display: 'flex', gap: 10 }}>
                            {[
                                { icon: <Twitter size={16} />, label: 'Twitter' },
                                { icon: <Github size={16} />, label: 'GitHub' },
                                { icon: <Send size={16} />, label: 'Telegram' },
                            ].map(({ icon, label }) => (
                                <motion.a
                                    key={label}
                                    href="#"
                                    whileHover={{ y: -2, background: 'rgba(139,92,246,0.15)', borderColor: 'rgba(139,92,246,0.5)' }}
                                    style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: 'var(--bg4)', border: '1px solid var(--border-light)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: '#64748B', textDecoration: 'none', transition: 'all 0.2s',
                                    }}
                                    aria-label={label}
                                >
                                    {icon}
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* Nav columns */}
                    {Object.entries(nav).map(([cat, items]) => (
                        <div key={cat}>
                            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, color: '#475569', textTransform: 'uppercase', marginBottom: 18 }}>{cat}</div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                                {items.map(item => (
                                    <a key={item} href="#" style={{ fontSize: 14, color: '#64748B', textDecoration: 'none', transition: 'color 0.2s', lineHeight: 1 }}
                                        onMouseEnter={e => e.target.style.color = '#A78BFA'}
                                        onMouseLeave={e => e.target.style.color = '#64748B'}
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bottom row */}
                <div style={{ borderTop: '1px solid var(--border)', paddingTop: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
                    <p style={{ fontSize: 13, color: '#475569' }}>
                        © 2026 Ikkii. Built on{' '}
                        <span style={{ color: '#A78BFA', fontWeight: 600 }}>Solana</span>.
                        Not financial advice. Wager responsibly.
                    </p>
                    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <span style={{ width: 6, height: 6, borderRadius: 3, background: '#10B981', boxShadow: '0 0 6px #10B981', display: 'inline-block' }} />
                        <span style={{ fontSize: 13, color: '#64748B' }}>Devnet Operational</span>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
        @media (max-width: 640px) {
            .footer-grid { grid-template-columns: 1fr !important; gap: 28px !important; }
            .footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 10px !important; }
            footer .container { padding-top: 52px !important; }
        }
        @media (max-width: 400px) { .footer-grid { gap: 22px !important; } }
      `}</style>
        </footer>
    )
}
