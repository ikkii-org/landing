import { motion } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'

export default function CTA() {
  return (
    <section id="waitlist" className="section" style={{ padding: '160px 0' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{
            position: 'relative',
            maxWidth: 800,
            margin: '0 auto',
            textAlign: 'center',
            padding: '80px 48px',
            background: 'linear-gradient(135deg, rgba(20, 241, 149, 0.03), rgba(153, 69, 255, 0.03))',
            border: '1px solid rgba(59, 74, 63, 0.3)',
            overflow: 'hidden',
          }}
        >
          {/* Glow effects */}
          <div style={{
            position: 'absolute',
            top: -100,
            left: -100,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(20, 241, 149, 0.08), transparent 70%)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute',
            bottom: -100,
            right: -100,
            width: 300,
            height: 300,
            background: 'radial-gradient(circle, rgba(153, 69, 255, 0.08), transparent 70%)',
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-label" style={{ marginBottom: 24 }}>
              Get Early Access
            </div>
            
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: 700,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              color: 'var(--text-primary)',
              marginBottom: 20,
            }}>
              Be the first to <span className="gradient-text">duel</span>
            </h2>
            
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 17,
              color: 'var(--text-secondary)',
              lineHeight: 1.7,
              maxWidth: 480,
              margin: '0 auto 40px',
            }}>
              Join the waitlist for early access to the Ikkii beta.
              Be among the first to wager NFTs in competitive duels.
            </p>

            <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a 
                href="https://tally.so/r/waitlist-ikkii" 
                target="_blank" 
                rel="noopener"
                className="btn btn-primary"
                style={{ fontSize: 14, padding: '16px 32px' }}
              >
                Join Waitlist <ArrowRight size={16} />
              </a>
              <a 
                href="https://x.com/ikkiiapp" 
                target="_blank" 
                rel="noopener"
                className="btn btn-secondary"
                style={{ fontSize: 14, padding: '16px 32px' }}
              >
                <MessageCircle size={16} /> Follow on X
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
