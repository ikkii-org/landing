import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Shield, Zap, Trophy, Puzzle, Coins, Globe } from 'lucide-react'

const features = [
    {
        id: 'escrow',
        icon: <Shield size={22} />,
        color: '#8B5CF6',
        glow: 'rgba(139,92,246,0.1)',
        title: 'Trustless Escrow',
        body: "Anchor smart contracts hold stakes in PDA-owned token accounts. No admin, no platform — nobody touches your funds.",
        gridArea: '1 / 1 / 2 / 3',
        size: 'wide',
    },
    {
        id: 'settlement',
        icon: <Zap size={22} />,
        color: '#06B6D4',
        glow: 'rgba(6,182,212,0.1)',
        title: 'Instant Settlement',
        body: "Solana's 400ms finality means your winnings land instantly.",
        gridArea: '1 / 3 / 3 / 4',
        size: 'tall',
        extra: (
            <div style={{
                marginTop: 'auto', padding: '16px 20px',
                background: 'rgba(6,182,212,0.08)',
                border: '1px solid rgba(6,182,212,0.2)',
                borderRadius: 14, fontSize: 13, color: '#06B6D4', fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 8,
            }}>
                <span style={{ fontSize: 20 }}>⚡</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <span>400ms finality</span>
                    <span style={{ fontSize: 11, color: 'rgba(6,182,212,0.65)' }}>$0.001 per tx</span>
                </div>
            </div>
        ),
    },
    {
        id: 'rankings',
        icon: <Trophy size={22} />,
        color: '#F59E0B',
        glow: 'rgba(245,158,11,0.1)',
        title: 'On-Chain Rankings',
        body: "Every win is recorded on-chain. Real skill, no sandbagging.",
        gridArea: '2 / 1 / 3 / 2',
        size: 'small',
    },
    {
        id: 'dispute',
        icon: <Puzzle size={22} />,
        color: '#10B981',
        glow: 'rgba(16,185,129,0.1)',
        title: 'Auto Dispute',
        body: "Oracle cross-references in-game APIs to settle disputes.",
        gridArea: '2 / 2 / 3 / 3',
        size: 'small',
    },
    {
        id: 'tokens',
        icon: <Coins size={22} />,
        color: '#EC4899',
        glow: 'rgba(236,72,153,0.1)',
        title: 'Multi-Token',
        body: "Stake in SOL, USDC, or any SPL token. NFT wagering next.",
        gridArea: '3 / 1 / 4 / 2',
        size: 'small',
    },
    {
        id: 'permissionless',
        icon: <Globe size={22} />,
        color: '#8B5CF6',
        glow: 'rgba(139,92,246,0.1)',
        title: 'Truly Permissionless',
        body: "No geo-restrictions. No KYC. Any wallet, anywhere. Ikkii works for all 3.3 billion gamers globally.",
        gridArea: '3 / 2 / 4 / 4',
        size: 'wide',
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.96 },
    visible: (i) => ({
        opacity: 1, y: 0, scale: 1,
        transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }),
}

export default function Features() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section id="features" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, var(--bg0), var(--bg2) 40%, var(--bg0))', zIndex: 0 }} />
            <div className="glow-orb" style={{ width: 800, height: 500, background: 'radial-gradient(ellipse, rgba(139,92,246,0.06) 0%, transparent 60%)', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 0 }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 72 }}
                >
                    <div className="section-tag">Features</div>
                    <h2 className="section-title">Built different.<br /><span className="grad">Not just a dApp.</span></h2>
                    <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center', maxWidth: 500 }}>
                        Every feature exists to give players a fair, fast, fully on-chain experience.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(3, 1fr)',
                    gap: 20,
                    maxWidth: 1080,
                    margin: '0 auto'
                }} className="bento-grid">
                    {features.map((f, i) => (
                        <motion.div
                            key={f.id}
                            custom={i}
                            variants={cardVariants}
                            initial="hidden"
                            animate={inView ? 'visible' : 'hidden'}
                            className="bento-item"
                            style={{ gridArea: f.gridArea, display: 'flex', flexDirection: 'column' }}
                        >
                            <motion.div
                                whileHover={{
                                    y: -6,
                                    borderColor: `${f.color}60`,
                                    boxShadow: `var(--shadow-lg), 0 0 40px ${f.glow.replace('0.1)', '0.25)')}`,
                                }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                style={{
                                    flex: 1,
                                    background: 'var(--bg3)',
                                    border: '1px solid var(--border)',
                                    borderRadius: 24,
                                    padding: f.size === 'wide' ? '36px 40px' : '32px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    cursor: 'default',
                                    minHeight: f.size === 'tall' ? 320 : f.size === 'wide' ? 220 : 250,
                                    boxShadow: 'var(--shadow-sm)',
                                    transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                                }}
                            >
                                {/* Top accent line */}
                                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${f.color}80, transparent)` }} />

                                {/* Glow behind icon */}
                                <div style={{
                                    position: 'absolute', top: 0, left: 0, width: 120, height: 120,
                                    background: `radial-gradient(circle at 30% 30%, ${f.glow}, transparent 70%)`,
                                    pointerEvents: 'none',
                                }} />

                                {/* Icon */}
                                <div style={{
                                    width: 48, height: 48, borderRadius: 14, flexShrink: 0,
                                    background: f.glow,
                                    border: `1px solid ${f.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: 20, color: f.color,
                                    position: 'relative', zIndex: 1
                                }}>
                                    {f.icon}
                                </div>

                                <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', flex: 1 }}>
                                    <h3 style={{
                                        fontFamily: 'Space Grotesk, sans-serif',
                                        fontSize: f.size === 'wide' ? 24 : 20,
                                        fontWeight: 700, marginBottom: 12, color: 'var(--text1)', lineHeight: 1.2,
                                        letterSpacing: -0.5
                                    }}>
                                        {f.title}
                                    </h3>

                                    <p style={{ fontSize: 15, color: 'var(--text2)', lineHeight: 1.6, flex: 1, maxWidth: f.size === 'wide' ? '65%' : '100%' }}>
                                        {f.body}
                                    </p>

                                    {f.extra && (
                                        <div style={{ position: 'relative', zIndex: 2 }}>{f.extra}</div>
                                    )}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .bento-grid { grid-template-columns: repeat(2, 1fr) !important; }
                    .bento-item { grid-area: auto !important; }
                    .bento-item > div > div > p { max-width: 100% !important; }
                }
                @media (max-width: 560px) {
                    .bento-grid { grid-template-columns: 1fr !important; gap: 16px !important; }
                    .bento-item > div { padding: 28px !important; min-height: auto !important; }
                    .bento-item h3 { font-size: 20px !important; }
                }
            `}</style>
        </section>
    )
}
