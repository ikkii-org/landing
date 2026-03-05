import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const steps = [
    {
        num: '01',
        title: 'Connect Your Wallet',
        body: 'Sign up with your Solana wallet. Your keys stay yours — always. No custodial risk, no sign-up fee.',
        color: '#8B5CF6',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="18" height="12" rx="2" />
                <path d="M16 12h2" />
            </svg>
        )
    },
    {
        num: '02',
        title: 'Create or Join a Duel',
        body: 'Pick a game, set your stake in SOL or USDC. Funds lock in a Solana PDA — untouched until settlement.',
        color: '#06B6D4',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14.5 9 19 4.5M9.5 14.5 5 19" />
                <path d="M16 16l4 4M4 4l4 4" />
                <circle cx="12" cy="12" r="3" />
            </svg>
        )
    },
    {
        num: '03',
        title: 'Play the Match',
        body: 'Head into your game and play. The smart contract escrow waits. Duels expire automatically if no one joins.',
        color: '#F59E0B',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 12h4M8 10v4" />
                <circle cx="15" cy="12" r="1.5" fill="currentColor" />
                <circle cx="18" cy="12" r="1.5" fill="currentColor" />
            </svg>
        )
    },
    {
        num: '04',
        title: 'Submit & Verify',
        body: 'Both players submit results. Dispute? Our auto-verification oracle cross-references in-game API data.',
        color: '#10B981',
        icon: (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <path d="M22 4L12 14.01l-3-3" />
            </svg>
        )
    },
]

const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function HowItWorks() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-100px' })

    return (
        <section id="how-it-works" className="section" ref={ref}>
            <div className="glow-orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 72 }}
                >
                    <div className="section-tag">How It Works</div>
                    <h2 className="section-title">Four steps to <span className="grad">trustless victory</span></h2>
                    <p className="section-sub" style={{ margin: '14px auto 0', textAlign: 'center' }}>
                        From wallet to winnings — fully on-chain, no middlemen interrupting your bag.
                    </p>
                </motion.div>

                <div style={{ maxWidth: 880, margin: '0 auto', position: 'relative' }}>

                    {/* Animated Connection Line (Desktop only) */}
                    <div className="hiw-line-wrap" style={{ position: 'absolute', top: 40, bottom: 40, left: '50%', width: 2, transform: 'translateX(-50%)', zIndex: 0 }}>
                        <div style={{ width: '100%', height: '100%', background: 'rgba(255,255,255,0.05)', borderRadius: 2 }} />
                        <motion.div
                            initial={{ height: '0%' }}
                            animate={inView ? { height: '100%' } : {}}
                            transition={{ duration: 2, ease: 'easeInOut' }}
                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', background: 'linear-gradient(to bottom, transparent, #8B5CF6, #06B6D4, transparent)', borderRadius: 2 }}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 64 }}>
                        {steps.map((step, i) => {
                            const isEven = i % 2 === 0

                            return (
                                <div key={i} className={`hiw-row ${isEven ? 'hiw-even' : 'hiw-odd'}`}>

                                    {/* Desktop central node */}
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={inView ? { scale: 1, opacity: 1 } : {}}
                                        transition={{ delay: 0.2 + i * 0.2, type: 'spring' }}
                                        className="hiw-node"
                                        style={{ background: '#0A0A0F', border: `2px solid ${step.color}` }}
                                    >
                                        <div style={{ width: 8, height: 8, borderRadius: 4, background: step.color, boxShadow: `0 0 10px ${step.color}` }} />
                                    </motion.div>

                                    {/* Card Content */}
                                    <motion.div
                                        variants={cardVariants}
                                        initial="hidden"
                                        animate={inView ? "visible" : "hidden"}
                                        transition={{ delay: i * 0.15 }}
                                        className="hiw-card-wrap"
                                    >
                                        <div
                                            className="hiw-card"
                                            style={{
                                                background: 'var(--bg2)',
                                                border: '1px solid var(--border)',
                                                borderRadius: 24,
                                                padding: '32px',
                                                position: 'relative',
                                                overflow: 'hidden',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                            }}
                                        >
                                            {/* Glow Accent */}
                                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${step.color}, transparent)` }} />
                                            <div style={{ position: 'absolute', top: -30, left: '50%', transform: 'translateX(-50%)', width: 100, height: 60, background: step.color, filter: 'blur(40px)', opacity: 0.15, pointerEvents: 'none' }} />

                                            <div style={{ display: 'flex', gap: 20, alignItems: 'flex-start' }}>
                                                {/* Number / Icon */}
                                                <div style={{
                                                    width: 56, height: 56, borderRadius: 16, flexShrink: 0,
                                                    background: `linear-gradient(135deg, ${step.color}15, transparent)`,
                                                    border: `1px solid ${step.color}30`,
                                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                                    color: step.color
                                                }}>
                                                    {step.icon}
                                                </div>

                                                <div>
                                                    <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1.5, color: step.color, textTransform: 'uppercase', marginBottom: 8 }}>
                                                        Step {step.num}
                                                    </div>
                                                    <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12, color: '#F1F5F9', lineHeight: 1.2 }}>
                                                        {step.title}
                                                    </h3>
                                                    <p style={{ fontSize: 15, color: '#94A3B8', lineHeight: 1.6 }}>
                                                        {step.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Empty spacer for alternating layout */}
                                    <div className="hiw-spacer" />

                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>

            <style>{`
                .hiw-row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    position: relative;
                }
                .hiw-node {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50%, -50%);
                    width: 20px;
                    height: 20px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 2;
                }
                .hiw-even .hiw-card-wrap { grid-column: 1; text-align: right; }
                .hiw-even .hiw-spacer { grid-column: 2; }
                .hiw-even .hiw-card { flex-direction: row-reverse; }
                .hiw-even .hiw-card > div { flex-direction: row-reverse; text-align: right; }

                .hiw-odd .hiw-card-wrap { grid-column: 2; }
                .hiw-odd .hiw-spacer { grid-column: 1; }

                @media (max-width: 768px) {
                    .hiw-row { grid-template-columns: 1fr; gap: 0; }
                    .hiw-line-wrap { left: 24px !important; }
                    .hiw-node { left: 24px; top: 40px; transform: translateX(-50%); }
                    
                    .hiw-even .hiw-card-wrap, .hiw-odd .hiw-card-wrap { grid-column: 1; padding-left: 60px; }
                    .hiw-even .hiw-card, .hiw-odd .hiw-card { text-align: left; }
                    .hiw-even .hiw-card > div, .hiw-odd .hiw-card > div { flex-direction: row; text-align: left; }
                    .hiw-spacer { display: none; }
                }

                @media (max-width: 640px) {
                    .hiw-card { padding: 24px !important; }
                    .hiw-card h3 { font-size: 19px !important; }
                    .hiw-card p { font-size: 14px !important; }
                }
                @media (max-width: 480px) {
                    .hiw-line-wrap { display: none; }
                    .hiw-node { display: none; }
                    .hiw-even .hiw-card-wrap, .hiw-odd .hiw-card-wrap { padding-left: 0; }
                    .hiw-row { margin-bottom: 24px; }
                }
            `}</style>
        </section>
    )
}
