import { motion } from 'framer-motion'
import { Crosshair, Users, Crown } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: <Crosshair size={24} />,
    title: 'Create a Duel',
    desc: 'Choose your game, pick tokens or an NFT, set the stake amount, and set a duration. Your wager is locked in a trustless escrow vault.',
    color: 'var(--primary)',
  },
  {
    num: '02',
    icon: <Users size={24} />,
    title: 'Someone Joins',
    desc: 'Your opponent matches your stake into the escrow vault. The duel goes live. Both stakes are locked until a winner is declared.',
    color: 'var(--tertiary)',
  },
  {
    num: '03',
    icon: <Crown size={24} />,
    title: 'Winner Takes All',
    desc: 'Play your match. Both submit the result. Escrow releases the full pot to the winner instantly — no middleman, no delays.',
    color: 'var(--secondary)',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section" style={{ background: 'var(--bg-elevated)' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="section-label">How It Works</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            Three steps to your <span className="gradient-text-purple">first duel</span>
          </h2>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 24,
          position: 'relative',
        }}>
          {/* Connecting line */}
          <div style={{
            position: 'absolute',
            top: 40,
            left: '16.66%',
            right: '16.66%',
            height: 1,
            background: 'linear-gradient(90deg, var(--primary) 0%, var(--tertiary) 50%, var(--secondary) 100%)',
            opacity: 0.2,
            zIndex: 0,
          }} className="hide-mobile" />

          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              style={{
                textAlign: 'center',
                padding: 40,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <div style={{
                width: 64,
                height: 64,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px',
                background: `linear-gradient(135deg, ${step.color}20, ${step.color}05)`,
                border: `1px solid ${step.color}30`,
                color: step.color,
                position: 'relative',
                boxShadow: `0 0 30px ${step.color}20`,
              }}>
                {step.icon}
                <div style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  fontFamily: 'var(--font-display)',
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: 2,
                  color: step.color,
                  background: 'var(--bg)',
                  padding: '2px 6px',
                  border: `1px solid ${step.color}40`,
                }}>
                  {step.num}
                </div>
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 20,
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 12,
                letterSpacing: '0.02em',
              }}>
                {step.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 15,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}>
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
        }
      `}</style>
    </section>
  )
}
