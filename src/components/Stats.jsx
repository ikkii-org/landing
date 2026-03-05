import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
    { value: 400, suffix: 'ms', label: 'Settlement Time', desc: 'Solana finality' },
    { value: 2.5, suffix: '%', label: 'Platform Fee', desc: 'Transparent, on-chain' },
    { value: 0, prefix: '<$', suffix: '.001', label: 'Per Transaction', desc: 'Solana compute cost' },
    { value: 100, suffix: '%', label: 'Non-Custodial', desc: 'Your keys, your coins' },
]

function CountUp({ to, suffix, prefix, duration = 1.8, inView }) {
    const [val, setVal] = useState(0)
    const hasDecimal = String(to).includes('.')

    useEffect(() => {
        if (!inView) return
        let start = null
        const step = (ts) => {
            if (!start) start = ts
            const progress = Math.min((ts - start) / (duration * 1000), 1)
            const ease = 1 - Math.pow(1 - progress, 3)
            setVal(ease * to)
            if (progress < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [inView, to, duration])

    const display = hasDecimal ? val.toFixed(1) : Math.floor(val)

    return (
        <span>
            {prefix}{display}{suffix}
        </span>
    )
}

export default function Stats() {
    const ref = useRef(null)
    const inView = useInView(ref, { once: true, margin: '-80px' })

    return (
        <section ref={ref} style={{ padding: '80px 0', background: 'linear-gradient(to bottom, rgba(139,92,246,0.04), transparent)' }}>
            <div style={{ position: 'absolute', inset: 0, borderTop: '1px solid rgba(139,92,246,0.1)', borderBottom: '1px solid rgba(139,92,246,0.1)', pointerEvents: 'none' }} />
            <div className="container">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, position: 'relative' }} className="stats-grid">
                    {/* Dividers */}
                    {stats.map((s, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={inView ? { opacity: 1, y: 0 } : {}}
                            transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                            style={{
                                textAlign: 'center', padding: '20px 16px',
                                borderRight: i < stats.length - 1 ? '1px solid rgba(30,30,53,0.8)' : 'none',
                            }}
                        >
                            <div style={{
                                fontFamily: 'Space Grotesk, sans-serif',
                                fontSize: 'clamp(36px, 4vw, 54px)',
                                fontWeight: 700, lineHeight: 1,
                                background: 'linear-gradient(135deg, #A78BFA, #06B6D4)',
                                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
                                backgroundClip: 'text',
                                marginBottom: 8,
                            }}>
                                <CountUp to={s.value} suffix={s.suffix} prefix={s.prefix} inView={inView} />
                            </div>
                            <div style={{ fontSize: 15, fontWeight: 700, color: '#F1F5F9', marginBottom: 4 }}>{s.label}</div>
                            <div style={{ fontSize: 13, color: '#64748B' }}>{s.desc}</div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) { .stats-grid { grid-template-columns: repeat(2, 1fr) !important; } }
        @media (max-width: 480px) { .stats-grid { grid-template-columns: 1fr !important; } }
        @media (max-width: 640px) {
            .stats-grid > div { border-right: none !important; border-bottom: 1px solid rgba(30,30,53,0.8); padding: 18px 0 !important; }
            .stats-grid > div:last-child { border-bottom: none; }
        }
      `}</style>
        </section>
    )
}
