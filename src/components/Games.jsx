import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sword } from 'lucide-react'

const games = [
    {
        name: 'Clash Royale',
        abbr: 'CR',
        color: '#A78BFA',
        glow: 'rgba(167,139,250,0.3)',
        players: '100M+',
        desc: 'Live 1v1 duels · Trophy matchmaking · Results auto-verified via API',
        status: 'live',
    },
    {
        name: 'Valorant',
        abbr: 'VL',
        color: '#FF4655',
        glow: 'rgba(255,70,85,0.15)',
        players: '14.5M',
        desc: 'Tactical 5v5 shooter · Official match API integration in progress',
        status: 'soon',
    },
    {
        name: 'CS2',
        abbr: 'CS',
        color: '#F0A500',
        glow: 'rgba(240,165,0,0.15)',
        players: '32M',
        desc: 'Premier ranked verification · Anti-cheat sync',
        status: 'soon',
    },
    {
        name: 'Apex Legends',
        abbr: 'AL',
        color: '#CD2626',
        glow: 'rgba(205,38,38,0.15)',
        players: '130M',
        desc: 'Battle royale kill-count wagers · Coming Q4',
        status: 'soon',
    },
]

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } }
}

const cardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 30 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } }
}

export default function Games() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    const liveGame = games[0]
    const upcomingGames = games.slice(1)

    return (
        <section id="games" className="section" ref={ref} style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Background Orbs */}
            <div className="glow-orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(167,139,250,0.08) 0%, transparent 70%)', top: '10%', left: '-10%' }} />
            <div className="glow-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)', bottom: '0%', right: '-5%' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 64 }}
                >
                    <div className="section-tag" style={{ background: 'rgba(167,139,250,0.1)', color: '#A78BFA', border: '1px solid rgba(167,139,250,0.2)' }}>Supported Games</div>
                    <h2 className="section-title">Your game.<br /><span className="grad">Your wager.</span></h2>
                    <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center', maxWidth: 640 }}>
                        We integrate directly with official game APIs. No screenshots, no trust required. The smart contract talks to the game server.
                    </p>
                </motion.div>

                <div style={{ maxWidth: 1080, margin: '0 auto' }}>

                    {/* ── Live Hero Game Card ── */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        whileHover={{ y: -4, boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 50px ${liveGame.glow}`, borderColor: 'rgba(167,139,250,0.4)' }}
                        style={{
                            background: 'linear-gradient(135deg, rgba(20,20,35,0.95) 0%, rgba(10,10,20,0.98) 100%)',
                            border: '1px solid rgba(167,139,250,0.2)',
                            borderRadius: 32,
                            padding: '40px 48px',
                            marginBottom: 24,
                            cursor: 'default',
                            position: 'relative',
                            overflow: 'hidden',
                            backdropFilter: 'blur(20px)',
                            display: 'flex', gap: 40, alignItems: 'center'
                        }}
                        className="live-game-card"
                    >
                        {/* Background glowing blob */}
                        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 300, height: 300, background: `radial-gradient(circle, ${liveGame.glow}, transparent 70%)`, pointerEvents: 'none' }} />

                        {/* Graphic Icon Area */}
                        <div style={{ flexShrink: 0, position: 'relative' }}>
                            <div style={{
                                width: 120, height: 120, borderRadius: 28,
                                background: `linear-gradient(135deg, ${liveGame.color}20, transparent)`,
                                border: `1px solid ${liveGame.color}40`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.1)',
                                position: 'relative', zIndex: 1
                            }}>
                                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 900, color: liveGame.color, letterSpacing: -1 }}>{liveGame.abbr}</span>
                            </div>
                            {/* Floating elements */}
                            <motion.div animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -15, right: -15, width: 40, height: 40, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Sword size={18} color="#10B981" />
                            </motion.div>
                        </div>

                        {/* Content Area */}
                        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                                <h3 style={{ fontSize: 32, fontWeight: 800, color: '#F1F5F9', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: -0.5 }}>{liveGame.name}</h3>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999,
                                    background: 'rgba(16,185,129,0.15)', border: '1px solid rgba(16,185,129,0.4)',
                                }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981', boxShadow: '0 0 10px #10B981' }} />
                                    <span style={{ fontSize: 11, fontWeight: 800, color: '#10B981', textTransform: 'uppercase', letterSpacing: 1 }}>Live Now</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 16, color: '#94A3B8', lineHeight: 1.6, marginBottom: 24, maxWidth: 500 }}>
                                {liveGame.desc}
                            </p>

                            {/* Stats row */}
                            <div style={{ display: 'flex', gap: 24 }}>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Player Base</div>
                                    <div style={{ fontSize: 22, fontWeight: 700, color: '#F1F5F9', fontFamily: 'Space Grotesk, sans-serif' }}>{liveGame.players}</div>
                                </div>
                                <div style={{ width: 1, background: 'rgba(255,255,255,0.1)' }} />
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748B', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Match Data</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: '#10B981', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                                        Official API
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* ── Upcoming Games Grid ── */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate={inView ? 'visible' : 'hidden'}
                        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}
                        className="upcoming-games-grid"
                    >
                        {upcomingGames.map((g) => (
                            <motion.div key={g.name} variants={cardVariants}>
                                <motion.div
                                    whileHover={{ y: -4, borderColor: 'rgba(255,255,255,0.15)' }}
                                    style={{
                                        background: 'rgba(15,15,25,0.6)',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        borderRadius: 24,
                                        padding: '24px 28px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '100%',
                                        display: 'flex', flexDirection: 'column',
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${g.glow}, transparent 70%)` }} />

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12,
                                            background: `linear-gradient(135deg, ${g.color}15, transparent)`,
                                            border: `1px solid ${g.color}30`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: g.color,
                                        }}>
                                            {g.abbr}
                                        </div>
                                        <div style={{
                                            fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                                            padding: '4px 10px', borderRadius: 999,
                                            background: 'rgba(100,116,139,0.1)',
                                            border: `1px solid rgba(100,116,139,0.2)`,
                                            color: '#94A3B8',
                                        }}>
                                            Coming Soon
                                        </div>
                                    </div>

                                    <h4 style={{ fontSize: 18, fontWeight: 700, color: '#F1F5F9', marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>{g.name}</h4>
                                    <p style={{ fontSize: 13, color: '#64748B', lineHeight: 1.6, flex: 1 }}>{g.desc}</p>

                                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 11, color: '#475569', fontWeight: 600 }}>Player Base</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: '#E2E8F0' }}>{g.players}</span>
                                    </div>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>

                </div>
            </div>

            <style>{`
                @media (max-width: 900px) {
                    .live-game-card { flex-direction: column !important; text-align: center; gap: 24px !important; padding: 32px 24px !important; }
                    .live-game-card > div:nth-child(2) { margin: 0 auto; }
                    .live-game-card h3 { justify-content: center; }
                    .live-game-card > div:nth-child(3) > div:first-child { flex-direction: column; }
                    .live-game-card .stats-row { justify-content: center; }
                    
                    .upcoming-games-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .upcoming-games-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    )
}
