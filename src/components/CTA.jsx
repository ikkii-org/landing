import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Smartphone } from 'lucide-react'

export default function CTA() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="cta" className="section" ref={ref} style={{ padding: '100px 0' }}>
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 40, scale: 0.97 }}
                    animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    style={{
                        position: 'relative', borderRadius: 32, overflow: 'hidden',
                        background: 'var(--bg3)',
                        border: '1px solid var(--purple-glow)',
                        padding: 'clamp(48px, 6vw, 88px)',
                        textAlign: 'center',
                        boxShadow: 'var(--shadow-lg), 0 0 80px rgba(124,58,237,0.08)',
                    }}
                >
                    {/* Top accent line */}
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, transparent, var(--purple), var(--cyan), transparent)' }} />

                    {/* BG glow */}
                    <div className="glow-orb" style={{ width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

                    {/* Grid pattern */}
                    <div style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
                        opacity: 0.5,
                    }} />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={inView ? { opacity: 1, scale: 1 } : {}}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            style={{
                                display: 'inline-flex', alignItems: 'center', gap: 8,
                                background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.3)',
                                borderRadius: 999, padding: '6px 16px', marginBottom: 32,
                            }}
                        >
                            <span style={{ width: 6, height: 6, borderRadius: 3, background: 'var(--green)', boxShadow: '0 0 6px var(--green)', display: 'inline-block' }} />
                            <span style={{ fontSize: 13, color: 'var(--green)', fontWeight: 600 }}>Open Beta — Free to Join</span>
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.25, duration: 0.6 }}
                            style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 'clamp(36px, 5vw, 60px)', fontWeight: 700, letterSpacing: -2, lineHeight: 1.1, marginBottom: 20, color: 'var(--text1)' }}
                        >
                            Ready to prove <br />
                            <span style={{ background: 'linear-gradient(135deg, var(--purple-light), var(--cyan))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                                you're the best?
                            </span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.35, duration: 0.6 }}
                            style={{ fontSize: 18, color: 'var(--text2)', maxWidth: 520, margin: '0 auto', lineHeight: 1.7, marginBottom: 44 }}
                        >
                            Download the app, connect your Solana wallet, and create your first duel in under 2 minutes. No KYC. No waitlist. Just play.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: 0.45, duration: 0.6 }}
                            className="cta-btns"
                            style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            <motion.a
                                href="https://expo.dev/artifacts/eas/9GhGiL5rtpcRg4SspeNp3p.apk"
                                className="btn btn-primary"
                                style={{ fontSize: 16, padding: '16px 36px' }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Smartphone size={18} />
                                Download Beta
                                <ArrowRight size={16} />
                            </motion.a>
                            <motion.a
                                href="#how-it-works"
                                className="btn btn-outline"
                                style={{ fontSize: 16, padding: '16px 36px' }}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                See How It Works
                            </motion.a>
                        </motion.div>

                        {/* Social proof */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={inView ? { opacity: 1 } : {}}
                            transition={{ delay: 0.65 }}
                            className="cta-proof"
                            style={{ marginTop: 56, display: 'flex', gap: 0, justifyContent: 'center', flexWrap: 'wrap' }}
                        >
                            {[
                                { v: '3.3B+', label: 'Potential gamers' },
                                { v: '2.5%', label: 'Transparent fee' },
                                { v: '0 days', label: 'Withdrawal delay' },
                            ].map(({ v, label }, i, arr) => (
                                <div key={label} style={{ textAlign: 'center', padding: '0 32px', borderRight: i < arr.length - 1 ? '1px solid var(--border)' : 'none' }}>
                                    <div style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 24, fontWeight: 700, color: 'var(--purple-light)' }}>{v}</div>
                                    <div style={{ fontSize: 13, color: 'var(--text3)', marginTop: 4 }}>{label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                @media (max-width: 640px) {
                    .cta-btns { flex-direction: column !important; align-items: stretch !important; }
                    .cta-btns a, .cta-btns button { justify-content: center !important; }
                    .cta-proof > div { padding: 12px 16px !important; border-right: none !important; border-bottom: 1px solid var(--border); }
                    .cta-proof > div:last-child { border-bottom: none !important; }
                }
            `}</style>
        </section>
    )
}
