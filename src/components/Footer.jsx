import { Github, Twitter, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid rgba(59, 74, 63, 0.3)',
      padding: '48px 0',
      background: 'var(--bg-elevated)',
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 24,
        }}>
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: 4,
              color: 'var(--text-primary)',
              textTransform: 'uppercase',
            }}>
              IKKII
            </span>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 12,
              color: 'var(--text-muted)',
              letterSpacing: '0.05em',
            }}>
              Built on Solana
            </span>
          </div>

          {/* Links */}
          <div style={{ display: 'flex', gap: 32, alignItems: 'center', flexWrap: 'wrap' }}>
            <a href="https://github.com/ikkii-org" target="_blank" rel="noopener" style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Github size={16} /> GitHub
            </a>
            <a href="https://x.com/ikkiiapp" target="_blank" rel="noopener" style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Twitter size={16} /> X / Twitter
            </a>
            <a href="mailto:hello@ikkii.app" style={{
              color: 'var(--text-muted)',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              fontSize: 13,
              fontWeight: 500,
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
            >
              <Mail size={16} /> hello@ikkii.app
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 32,
          paddingTop: 24,
          borderTop: '1px solid rgba(59, 74, 63, 0.2)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 16,
        }}>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}>
            © 2026 Ikkii. All rights reserved.
          </span>
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 12,
            color: 'var(--text-muted)',
          }}>
            Crypto Dueling Arena
          </span>
        </div>
      </div>
    </footer>
  )
}
