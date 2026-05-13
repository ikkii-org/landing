import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

function CountUp({ end, duration = 2, suffix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return
    let startTime = null
    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      setCount(Math.floor(progress * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isInView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const stats = [
  { value: 400, suffix: 'ms', label: 'Block Time', color: 'var(--primary)' },
  { value: 65000, suffix: '+', label: 'Transactions Per Second', color: 'var(--tertiary)' },
  { value: 3, suffix: 's', label: 'Avg Settlement', color: 'var(--secondary)' },
  { value: 99, suffix: '%', label: 'Uptime', color: 'var(--primary)' },
]

export default function Stats() {
  return (
    <section id="stats" className="section" style={{ padding: '80px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: 1,
            background: 'var(--border)',
            border: '1px solid var(--border)',
          }}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              style={{
                background: 'var(--surface)',
                padding: '40px 24px',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(32px, 4vw, 48px)',
                fontWeight: 700,
                color: stat.color,
                letterSpacing: '-2px',
                lineHeight: 1,
                marginBottom: 12,
                textShadow: `0 0 30px ${stat.color}40`,
              }}>
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{
                fontFamily: 'var(--font-display)',
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 3,
                textTransform: 'uppercase',
                color: 'var(--text-muted)',
              }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
