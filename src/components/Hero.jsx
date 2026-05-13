import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Shield, Zap, Trophy, ChevronDown } from 'lucide-react'

const letterVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.04, duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  })
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const headline = 'WAGER. PLAY. WIN.'
  const subline = 'ON-CHAIN.'

  return (
    <section 
      ref={ref} 
      style={{ 
        position: 'relative', 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center',
        overflow: 'hidden',
        paddingTop: 72 
      }}
    >
      {/* Grid overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(rgba(20, 241, 149, 0.06) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
        maskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)',
        WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, transparent 100%)',
        zIndex: 1,
      }} />

      <motion.div style={{ y, opacity, width: '100%', position: 'relative', zIndex: 2 }}>
        <div className="container">
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            padding: '80px 0 120px',
          }}>

            {/* Live badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
              className="tag"
              style={{ marginBottom: 40 }}
            >
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--primary)',
                boxShadow: '0 0 8px var(--primary)',
                display: 'inline-block',
                animation: 'pulse 2s ease-in-out infinite',
              }} />
              Now Live on Solana Devnet
            </motion.div>

            {/* Main Headline */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 700,
              letterSpacing: '0.08em',
              lineHeight: 1.05,
              marginBottom: 8,
              fontSize: 'clamp(36px, 8vw, 80px)',
            }}>
              <div style={{ display: 'flex', gap: '0.15em', flexWrap: 'wrap', justifyContent: 'center' }}>
                {headline.split('').map((ch, i) => (
                  <motion.span
                    key={i}
                    custom={i}
                    variants={letterVariants}
                    initial="hidden"
                    animate="visible"
                    style={{ 
                      display: 'inline-block',
                      color: ch === ' ' ? 'transparent' : 'var(--text-primary)',
                    }}
                  >
                    {ch === ' ' ? '\u00A0' : ch}
                  </motion.span>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="gradient-text"
                style={{
                  fontSize: 'clamp(36px, 8vw, 80px)',
                  marginTop: 8,
                }}
              >
                {subline}
              </motion.div>
            </h1>

            {/* Body */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.6 }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 2vw, 20px)',
                color: 'var(--text-secondary)',
                lineHeight: 1.7,
                marginBottom: 40,
                marginTop: 24,
                maxWidth: 560,
              }}
            >
              Challenge any gamer to a 1v1 duel. Stake{' '}
              <span style={{ color: 'var(--primary)', fontWeight: 600 }}>SOL or USDC</span>{' '}
              in a trustless smart contract. Winner takes all —{' '}
              <span style={{ color: 'var(--tertiary)', fontWeight: 600 }}>instantly, permissionlessly</span>.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <a href="#waitlist" className="btn btn-primary" style={{ fontSize: 14, padding: '16px 32px' }}>
                Start Dueling <ArrowRight size={16} />
              </a>
              <a href="#how-it-works" className="btn btn-secondary" style={{ fontSize: 14, padding: '16px 32px' }}>
                How it works
              </a>
            </motion.div>

            {/* Trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              style={{
                display: 'flex',
                gap: 32,
                marginTop: 48,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {[
                { icon: <Shield size={14} />, text: 'Trustless Escrow' },
                { icon: <Zap size={14} />, text: '400ms Settlement' },
                { icon: <Trophy size={14} />, text: 'On-Chain Rankings' },
              ].map(({ icon, text }) => (
                <div 
                  key={text} 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8, 
                    color: 'var(--text-muted)', 
                    fontSize: 13, 
                    fontWeight: 500,
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.02em',
                  }}
                >
                  <span style={{ color: 'var(--primary)' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.0 }}
        style={{
          position: 'absolute',
          bottom: 32,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 3,
        }}
      >
        <span style={{
          fontFamily: 'var(--font-display)',
          fontSize: 10,
          color: 'var(--text-muted)',
          letterSpacing: 3,
          textTransform: 'uppercase',
          fontWeight: 600,
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} color="var(--text-muted)" />
        </motion.div>
      </motion.div>
    </section>
  )
}
