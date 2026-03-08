import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, Trophy } from 'lucide-react'
import AppMockup from './AppMockup'

const letterVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
        opacity: 1, y: 0,
        transition: { delay: i * 0.05, duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    })
}


export default function Hero() {
    const ref = useRef(null)
    const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
    const y = useTransform(scrollYProgress, [0, 1], [0, 100])
    const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

    const words = ['Wager.', 'Play.', 'Win.']

    return (
        <section ref={ref} style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden', paddingTop: 72 }}>

            {/* Background glows */}
            <div className="glow-orb" style={{ width: 800, height: 600, background: 'radial-gradient(ellipse, rgba(139,92,246,0.16) 0%, transparent 70%)', top: 0, left: '50%', transform: 'translateX(-50%)' }} />
            <div className="glow-orb" style={{ width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)', bottom: '10%', right: '5%' }} />

            {/* Dot grid */}
            <div style={{
                position: 'absolute', inset: 0, zIndex: 0,
                backgroundImage: 'radial-gradient(rgba(139,92,246,0.15) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)',
            }} />

            <motion.div style={{ y, opacity, width: '100%', position: 'relative', zIndex: 1 }}>
                <div className="container">

                    {/* ── IKKII × Solana banner ── */}
                    <motion.div
                        initial={{ opacity: 0, y: -16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, ease: 'easeOut' }}
                        style={{ display: 'flex', justifyContent: 'center', paddingTop: 40, paddingBottom: 8 }}
                    >
                        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 20 }}>
                            <span style={{ fontFamily: "'Cy Grotesk Grand', sans-serif", fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 700, color: 'var(--text1)', letterSpacing: -1.5, lineHeight: 1, textTransform: 'uppercase' }}>IKKII</span>
                            <span style={{ color: 'var(--text3)', fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 300, lineHeight: 1 }}>×</span>
                            <img src="/sol.svg" alt="Solana" style={{ height: 'clamp(32px, 4.5vw, 50px)', width: 'auto' }} />
                        </div>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: 64,
                        alignItems: 'center',
                        minHeight: '80vh',
                        padding: '60px 0',
                    }} className="hero-grid">

                        {/* ── Left: Copy ── */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

                            {/* Live badge */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                                style={{
                                    display: 'inline-flex', alignItems: 'center', gap: 8, alignSelf: 'flex-start',
                                    background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.3)',
                                    borderRadius: 999, padding: '6px 14px', marginBottom: 28,
                                }}
                            >
                                <span style={{ width: 6, height: 6, borderRadius: 3, background: '#10B981', boxShadow: '0 0 6px #10B981', display: 'inline-block' }} />
                                <span style={{ fontSize: 12, fontWeight: 600, color: '#A78BFA', letterSpacing: 0.5 }}>Now live on Solana Devnet</span>
                            </motion.div>

                            {/* Headline */}
                            <h1 style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontWeight: 700,
                                letterSpacing: -2,
                                lineHeight: 1.08,
                                marginBottom: 8,
                            }}>
                                {/* Animated words */}
                                <div style={{ display: 'flex', gap: '0.22em', flexWrap: 'wrap', fontSize: 'clamp(42px, 5.5vw, 68px)' }}>
                                    {words.map((word, wi) =>
                                        word.split('').map((ch, ci) => (
                                            <motion.span
                                                key={`${wi}-${ci}`}
                                                custom={wi * 5 + ci}
                                                variants={letterVariants}
                                                initial="hidden"
                                                animate="visible"
                                                style={{ display: 'inline-block' }}
                                            >
                                                {ch}
                                            </motion.span>
                                        ))
                                    )}
                                </div>

                                {/* Gradient word on its own line */}
                                <motion.div
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.75, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                    style={{
                                        fontSize: 'clamp(42px, 5.5vw, 68px)',
                                        background: 'linear-gradient(135deg, #A78BFA 0%, #06B6D4 100%)',
                                        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                        backgroundClip: 'text', marginTop: 4,
                                    }}
                                >
                                    On-Chain.
                                </motion.div>
                            </h1>

                            {/* Body */}
                            <motion.p
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.85, duration: 0.55 }}
                                style={{ fontSize: 18, color: 'var(--text2)', lineHeight: 1.7, marginBottom: 36, marginTop: 20, maxWidth: 480 }}
                            >
                                Challenge any gamer to a 1v1 duel. Stake{' '}
                                <span style={{ color: '#A78BFA', fontWeight: 600 }}>SOL or USDC</span>{' '}
                                in a trustless smart contract. Winner takes all —{' '}
                                <span style={{ color: '#06B6D4', fontWeight: 600 }}>instantly, permissionlessly</span>.
                            </motion.p>

                            {/* CTAs */}
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.95, duration: 0.5 }}
                                style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}
                            >
                                <a href="#cta" className="btn btn-primary" style={{ fontSize: 16, padding: '14px 30px' }} id="hero-cta">
                                    Start Dueling <ArrowRight size={16} />
                                </a>
                                <a href="#how-it-works" className="btn btn-outline" style={{ fontSize: 16, padding: '14px 30px' }}>
                                    How it works
                                </a>
                            </motion.div>

                            {/* Trust pills */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 1.1 }}
                                style={{ display: 'flex', gap: 24, marginTop: 40, flexWrap: 'wrap' }}
                            >
                                {[
                                    { icon: <Shield size={14} />, text: 'Trustless Escrow' },
                                    { icon: <Zap size={14} />, text: '400ms Settlement' },
                                    { icon: <Trophy size={14} />, text: 'On-Chain Rankings' },
                                ].map(({ icon, text }) => (
                                    <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--text3)', fontSize: 13, fontWeight: 500 }}>
                                        <span style={{ color: '#A78BFA' }}>{icon}</span>
                                        {text}
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* ── Right: App Mockup ── */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <AppMockup />
                        </div>

                    </div>
                </div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
                style={{ position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}
            >
                <span style={{ fontSize: 10, color: 'var(--text4)', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Scroll</span>
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    style={{ width: 22, height: 34, border: '2px solid rgba(100,116,139,0.4)', borderRadius: 11, display: 'flex', justifyContent: 'center', paddingTop: 5 }}
                >
                    <div style={{ width: 3, height: 7, background: '#A78BFA', borderRadius: 2 }} />
                </motion.div>
            </motion.div>

            <style>{`
                @media (max-width: 860px) {
                    .hero-grid {
                        grid-template-columns: 1fr !important;
                        gap: 40px !important;
                        padding-top: 32px !important;
                        padding-bottom: 80px !important;
                    }
                }
                @media (max-width: 640px) {
                    .hero-grid { gap: 28px !important; }
                    #hero-cta { width: 100%; justify-content: center; }
                }
                @media (max-width: 400px) {
                    .hero-grid { padding-top: 20px !important; }
                }
            `}</style>
        </section>
    )
}
