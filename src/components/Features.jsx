import { motion } from 'framer-motion'
import { Swords, Wallet, Gamepad2, Lock, Zap, Trophy } from 'lucide-react'

const features = [
  {
    icon: <Wallet size={24} />,
    title: 'Token Wagering',
    desc: 'Stake SOL, USDC, or any SPL token. Instant escrow. Instant settlement. No waiting, no KYC, no trust required.',
    color: 'var(--primary)',
    glow: 'rgba(20, 241, 149, 0.15)',
  },
  {
    icon: <Swords size={24} />,
    title: 'NFT Duels',
    desc: 'The only escrow protocol that lets you wager NFTs and SFTs. PDA vaults lock your assets until a winner is declared.',
    color: 'var(--secondary)',
    glow: 'rgba(153, 69, 255, 0.15)',
  },
  {
    icon: <Gamepad2 size={24} />,
    title: 'Mobile-First',
    desc: 'Native React Native app with Solana Mobile Wallet Adapter. Create duels, join, and claim winnings — all from your phone.',
    color: 'var(--tertiary)',
    glow: 'rgba(0, 194, 255, 0.15)',
  },
  {
    icon: <Lock size={24} />,
    title: 'Trustless Escrow',
    desc: 'Custom Anchor program with manual CPI. Supports both SPL and Token-2022. Funds locked in PDA vaults until settlement.',
    color: 'var(--primary)',
    glow: 'rgba(20, 241, 149, 0.15)',
  },
  {
    icon: <Zap size={24} />,
    title: '~3s Settlement',
    desc: 'Winner declared? Funds released immediately. No 7-day holds. No withdrawal limits. Your money, your control.',
    color: 'var(--tertiary)',
    glow: 'rgba(0, 194, 255, 0.15)',
  },
  {
    icon: <Trophy size={24} />,
    title: 'Game Integration',
    desc: 'Link your game profile. We verify wins automatically via game APIs — no screenshots, no disputes, no cheating.',
    color: 'var(--secondary)',
    glow: 'rgba(153, 69, 255, 0.15)',
  },
]

export default function Features() {
  return (
    <section id="features" className="section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 64 }}
        >
          <div className="section-label">Features</div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: 700,
            letterSpacing: '-1.5px',
            lineHeight: 1.1,
            color: 'var(--text-primary)',
          }}>
            Built for <span className="gradient-text">competitive gamers</span>
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 18,
            color: 'var(--text-secondary)',
            maxWidth: 560,
            margin: '16px auto 0',
            lineHeight: 1.7,
          }}>
            Tokens for everyday duels. NFTs for high-stakes showdowns.
            Everything settles on-chain in seconds.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: 16,
        }}>
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="glass-card"
              style={{
                padding: 32,
                cursor: 'default',
                transition: 'box-shadow 0.3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow = `0 0 40px ${feature.glow}`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <div style={{
                width: 48,
                height: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: feature.glow,
                border: `1px solid ${feature.color}30`,
                marginBottom: 20,
                color: feature.color,
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 18,
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: 10,
                letterSpacing: '0.02em',
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                color: 'var(--text-secondary)',
                lineHeight: 1.6,
              }}>
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
