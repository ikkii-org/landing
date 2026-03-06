import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sword } from 'lucide-react'

const games = [
    {
        name: 'Clash Royale',
        abbr: 'CR',
        icon: 'https://cdn-assets-eu.frontify.com/s3/frontify-enterprise-files-eu/eyJwYXRoIjoic3VwZXJjZWxsXC9maWxlXC80SEQzUWJTN0g3VnJkUE1ENVp2eC5wbmcifQ:supercell:m3Kilkm5YQ79_Njnrsso7xomOdmXqQlrAZPacydXARM?width=180',
        color: '#8B5CF6',
        glow: 'rgba(139,92,246,0.15)',
        players: '100M+',
        desc: 'Live 1v1 duels · Trophy matchmaking · Results auto-verified via API',
        status: 'live',
    },
    {
        name: 'Valorant',
        abbr: 'VL',
        icon: '/valorant.svg',
        color: '#FF4655',
        glow: 'rgba(255,70,85,0.1)',
        players: '14.5M',
        desc: 'Tactical 5v5 shooter · Official match API integration in progress',
        status: 'soon',
    },
    {
        name: 'CS2',
        abbr: 'CS',
        icon: '/cs2.svg',
        color: '#F0A500',
        glow: 'rgba(240,165,0,0.1)',
        players: '32M',
        desc: 'Premier ranked verification · Anti-cheat sync',
        status: 'soon',
    },
    {
        name: 'Apex Legends',
        abbr: 'AL',
        icon: '/apex.svg',
        color: '#CD2626',
        glow: 'rgba(205,38,38,0.1)',
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
            <div className="glow-orb" style={{ width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', top: '10%', left: '-10%' }} />
            <div className="glow-orb" style={{ width: 500, height: 500, background: 'radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)', bottom: '0%', right: '-5%' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 64 }}
                >
                    <div className="section-tag">Supported Games</div>
                    <h2 className="section-title">Your game.<br /><span className="grad">Your wager.</span></h2>
                    <p className="section-sub" style={{ margin: '16px auto 0', textAlign: 'center', maxWidth: 640 }}>
                        We integrate directly with official game APIs. No screenshots, no trust required. The smart contract talks to the game server.
                    </p>
                </motion.div>

                <div style={{ maxWidth: 1080, margin: '0 auto' }}>

                    {/* Live game hero card */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={inView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
                        whileHover={{
                            y: -4,
                            borderColor: `${liveGame.color}60`,
                            boxShadow: `var(--shadow-lg), 0 0 50px ${liveGame.glow}`
                        }}
                        style={{
                            background: 'var(--bg3)',
                            border: '1px solid var(--border)',
                            borderRadius: 32,
                            padding: '40px 48px',
                            marginBottom: 24,
                            cursor: 'default',
                            position: 'relative',
                            overflow: 'hidden',
                            display: 'flex', gap: 40, alignItems: 'center',
                            boxShadow: 'var(--shadow-md)',
                            transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                        }}
                        className="live-game-card"
                    >
                        {/* Top accent */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${liveGame.color}, transparent)` }} />
                        <div style={{ position: 'absolute', top: '-20%', left: '-10%', width: 300, height: 300, background: `radial-gradient(circle, ${liveGame.glow}, transparent 70%)`, pointerEvents: 'none' }} />

                        {/* Large icon */}
                        <div style={{ flexShrink: 0, position: 'relative' }}>
                            <div style={{
                                width: 120, height: 120, borderRadius: 28,
                                background: `linear-gradient(135deg, ${liveGame.color}15, ${liveGame.color}05)`,
                                border: `1px solid ${liveGame.color}30`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                position: 'relative', zIndex: 1
                            }}>
                                {liveGame.icon
                                    ? <img src={liveGame.icon} alt={liveGame.name} style={{ width: 84, height: 84, objectFit: 'contain', borderRadius: 20 }} />
                                    : <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: 36, fontWeight: 900, color: liveGame.color, letterSpacing: -1 }}>{liveGame.abbr}</span>
                                }
                            </div>
                            <motion.div animate={{ y: [-5, 5, -5], rotate: [0, 5, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }} style={{ position: 'absolute', top: -15, right: -15, width: 40, height: 40, background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.3)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Sword size={18} color="var(--green)" />
                            </motion.div>
                        </div>

                        {/* Content */}
                        <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 12 }}>
                                <h3 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text1)', fontFamily: 'Space Grotesk, sans-serif', letterSpacing: -0.5 }}>{liveGame.name}</h3>
                                <div style={{
                                    display: 'flex', alignItems: 'center', gap: 6, padding: '4px 12px', borderRadius: 999,
                                    background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.35)',
                                }}>
                                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 10px var(--green)' }} />
                                    <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--green)', textTransform: 'uppercase', letterSpacing: 1 }}>Live Now</span>
                                </div>
                            </div>
                            <p style={{ fontSize: 16, color: 'var(--text2)', lineHeight: 1.6, marginBottom: 24, maxWidth: 500 }}>
                                {liveGame.desc}
                            </p>

                            <div style={{ display: 'flex', gap: 24 }}>
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Player Base</div>
                                    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text1)', fontFamily: 'Space Grotesk, sans-serif' }}>{liveGame.players}</div>
                                </div>
                                <div style={{ width: 1, background: 'var(--border)' }} />
                                <div>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Match Data</div>
                                    <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--green)', display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="M22 4L12 14.01l-3-3" /></svg>
                                        Official API
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Upcoming games grid */}
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
                                    whileHover={{ y: -4, borderColor: 'var(--border-light)' }}
                                    style={{
                                        background: 'var(--bg3)',
                                        border: '1px solid var(--border)',
                                        borderRadius: 24,
                                        padding: '24px 28px',
                                        position: 'relative',
                                        overflow: 'hidden',
                                        height: '100%',
                                        display: 'flex', flexDirection: 'column',
                                        boxShadow: 'var(--shadow-sm)',
                                        transition: 'box-shadow 0.3s, border-color 0.3s, transform 0.3s',
                                    }}
                                >
                                    <div style={{ position: 'absolute', top: 0, right: 0, width: 100, height: 100, background: `radial-gradient(circle at top right, ${g.glow}, transparent 70%)` }} />

                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                                        <div style={{
                                            width: 44, height: 44, borderRadius: 12,
                                            background: `${g.color}12`,
                                            border: `1px solid ${g.color}25`,
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 14, color: g.color,
                                            overflow: 'hidden',
                                        }}>
                                            {g.icon
                                                ? <img src={g.icon} alt={g.name} style={{ width: 36, height: 36, objectFit: 'contain' }} />
                                                : g.abbr
                                            }
                                        </div>
                                        <div style={{
                                            fontSize: 9, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase',
                                            padding: '4px 10px', borderRadius: 999,
                                            background: 'var(--bg4)',
                                            border: '1px solid var(--border)',
                                            color: 'var(--text3)',
                                        }}>
                                            Coming Soon
                                        </div>
                                    </div>

                                    <h4 style={{ fontSize: 18, fontWeight: 700, color: 'var(--text1)', marginBottom: 8, fontFamily: 'Space Grotesk, sans-serif' }}>{g.name}</h4>
                                    <p style={{ fontSize: 13, color: 'var(--text3)', lineHeight: 1.6, flex: 1 }}>{g.desc}</p>

                                    <div style={{ marginTop: 20, paddingTop: 16, borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 11, color: 'var(--text3)', fontWeight: 600 }}>Player Base</span>
                                        <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text1)' }}>{g.players}</span>
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
                    .upcoming-games-grid { grid-template-columns: repeat(2, 1fr) !important; }
                }
                @media (max-width: 600px) {
                    .upcoming-games-grid { grid-template-columns: 1fr !important; }
                }
            `}</style>
        </section>
    )
}
