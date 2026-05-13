import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'

const testimonials = [
    {
        text: "Finally — a wagering platform where I don't have to trust a random Discord admin. I created a 1 SOL duel, my opponent joined, we played, and the contract settled automatically. Insane experience.",
        name: 'NightFrag',
        rank: '#3 Global',
        game: 'Valorant',
        avatar: 'N',
        color: '#FF4655',
        wins: 142,
        amount: '12.4 SOL',
    },
    {
        text: "Used to bet on games through shady Telegram groups. Lost money to rugs twice. Ikkiii's on-chain escrow changed everything. Disputed a duel, the verification oracle auto-resolved it in my favor. No drama.",
        name: 'apex_hunter',
        rank: '#7 Global',
        game: 'CS2',
        avatar: 'A',
        color: '#F0A500',
        wins: 98,
        amount: '8.8 SOL',
    },
    {
        text: "The mobile app is incredibly clean. Connected my wallet, created my first duel in under 2 minutes, and the whole thing settled on-chain instantly after the match. This is the future of competitive gaming.",
        name: 'xVelocity',
        rank: '#19 Global',
        game: 'Valorant',
        avatar: 'X',
        color: '#8B5CF6',
        wins: 67,
        amount: '5.1 SOL',
    },
]

export default function Testimonials() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })
    const [active, setActive] = useState(0)

    const prev = () => setActive(i => (i - 1 + testimonials.length) % testimonials.length)
    const next = () => setActive(i => (i + 1) % testimonials.length)

    const t = testimonials[active]

    return (
        <section id="testimonials" className="section" ref={ref} style={{ background: 'linear-gradient(to bottom, var(--bg0), var(--bg2) 50%, var(--bg0))' }}>
            <div className="glow-orb" style={{ width: 600, height: 400, background: 'radial-gradient(ellipse, rgba(139,92,246,0.07) 0%, transparent 70%)', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }} />

            <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 64 }}
                >
                    <div className="section-tag">Leaderboard Voices</div>
                    <h2 className="section-title">Trusted by <span className="grad">top players</span></h2>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    style={{ maxWidth: 760, margin: '0 auto' }}
                >
                    {/* Quote card */}
                    <div
                        key={active}
                        className="testimonial-card"
                        style={{
                            background: 'var(--bg3)',
                            border: `1px solid ${t.color}44`,
                            borderRadius: 24,
                            position: 'relative',
                            overflow: 'hidden',
                            boxShadow: 'var(--shadow-lg)',
                            marginBottom: 24,
                        }}
                    >
                        {/* Top accent */}
                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${t.color}, transparent)` }} />

                        {/* Quote mark */}
                        <div style={{ position: 'absolute', top: 28, left: 40, fontSize: 72, lineHeight: 1, color: 'var(--border-light)', fontFamily: 'Georgia, serif', fontWeight: 700, userSelect: 'none' }}>"</div>

                        {/* Stars */}
                        <div style={{ display: 'flex', gap: 4, marginBottom: 24 }}>
                            {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="#F59E0B" color="#F59E0B" />)}
                        </div>

                        <p style={{ fontSize: 18, color: 'var(--text1)', lineHeight: 1.75, fontStyle: 'italic', marginBottom: 32, position: 'relative', zIndex: 1 }}>
                            "{t.text}"
                        </p>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                                <div style={{
                                    width: 48, height: 48, borderRadius: 14,
                                    background: `${t.color}18`,
                                    border: `1px solid ${t.color}44`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontFamily: 'Space Grotesk, sans-serif', fontWeight: 700, fontSize: 20, color: t.color,
                                }}>{t.avatar}</div>
                                <div>
                                    <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--text1)' }}>{t.name}</div>
                                    <div style={{ fontSize: 13, color: t.color, fontWeight: 600 }}>{t.rank} · {t.game}</div>
                                </div>
                            </div>
                            <div style={{ display: 'flex', gap: 16 }}>
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)' }}>{t.wins}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>Wins</div>
                                </div>
                                <div style={{ width: 1, background: 'var(--border)' }} />
                                <div style={{ textAlign: 'center' }}>
                                    <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--purple-light)' }}>{t.amount}</div>
                                    <div style={{ fontSize: 11, color: 'var(--text3)' }}>Won</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                        <button onClick={prev} className="btn btn-outline" style={{ padding: '10px 14px', borderRadius: 12 }}>
                            <ChevronLeft size={18} />
                        </button>
                        <div style={{ display: 'flex', gap: 8 }}>
                            {testimonials.map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActive(i)}
                                    style={{
                                        width: i === active ? 24 : 8, height: 8,
                                        borderRadius: 4, border: 'none', cursor: 'pointer',
                                        background: i === active ? 'var(--purple)' : 'var(--border-light)',
                                        transition: 'all 0.3s',
                                    }}
                                />
                            ))}
                        </div>
                        <button onClick={next} className="btn btn-outline" style={{ padding: '10px 14px', borderRadius: 12 }}>
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </motion.div>
            </div>
            <style>{`
                .testimonial-card { padding: 48px 48px 40px; }
                @media (max-width: 640px) {
                    .testimonial-card { padding: 28px 22px 24px; border-radius: 18px !important; }
                }
                @media (max-width: 400px) {
                    .testimonial-card { padding: 22px 16px 20px; }
                }
            `}</style>
        </section>
    )
}
