import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Check, Moon, Sun, Send } from 'lucide-react'
import { useTheme } from '../components/ThemeProvider'

const SURVEY_KEY = 'ikkii-survey-submitted'

const QUESTIONS = [
  {
    id: 'name',
    type: 'text',
    question: "What's your name? (it doesn't have to be your real name)",
    placeholder: 'Enter a name...',
    required: true,
  },
  {
    id: 'wallets',
    type: 'single',
    question: 'Are you familiar with crypto wallets like Phantom, Backpack, Solflare?',
    options: ['Yes, I use them', "Yes, but I haven't used them", 'No'],
    required: true,
  },
  {
    id: 'bet',
    type: 'single',
    question: 'Have you ever bet anything on your 1v1s with friends? (could be a dare or buying dinner / money)',
    options: ['Yes', 'No'],
    required: true,
    explainId: 'bet_explain',
    explainPlaceholder: 'Care to explain your answer? (optional)',
  },
  {
    id: 'bet_type',
    type: 'single',
    question: 'If yes, was it monetary or non-monetary (like a dare)?',
    options: ['Monetary', 'Non-monetary (like a dare)', 'Both'],
    required: false,
    showIf: (answers) => answers.bet === 'Yes',
  },
  {
    id: 'interest',
    type: 'single',
    question: 'Would you like to use something like this now or in the future?',
    options: ['Now', 'In the future', 'Not interested'],
    required: true,
  },
  {
    id: 'games',
    type: 'multi',
    question: 'If you had to, which game(s) would you duel on with IKKII?',
    options: ['Clash Royale', 'Chess', 'Valorant', 'League of Legends'],
    required: true,
  },
  {
    id: 'add_games',
    type: 'text',
    question: 'What other games should we bring to IKKII?',
    placeholder: 'Name the games you want to see...',
    required: false,
  },
  {
    id: 'suggestions',
    type: 'text',
    question: 'Anything else on your mind?',
    placeholder: 'Ideas, feedback, requests — drop them here...',
    required: false,
  },
  {
    id: 'email',
    type: 'email',
    question: "Drop your email so we can remind you when IKKII launches (dw we won't disturb you with regular emails)",
    placeholder: 'your@email.com',
    required: false,
  },
]

export default function SurveyPage() {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'
  const [answers, setAnswers] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})
  const [discordError, setDiscordError] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(SURVEY_KEY)
    if (saved) setSubmitted(true)
  }, [])

  const visibleQuestions = QUESTIONS.filter(q => !q.showIf || q.showIf(answers))

  const handleMultiToggle = (qid, option) => {
    setAnswers(prev => {
      const current = prev[qid] || []
      const next = current.includes(option)
        ? current.filter(o => o !== option)
        : [...current, option]
      return { ...prev, [qid]: next }
    })
    setErrors(prev => ({ ...prev, [qid]: false }))
  }

  const handleSingle = (qid, option) => {
    setAnswers(prev => ({ ...prev, [qid]: option }))
    setErrors(prev => ({ ...prev, [qid]: false }))
    // Clear conditional question if parent answer changes
    if (qid === 'bet' && option !== 'Yes') {
      setAnswers(prev => {
        const { bet_type, ...rest } = prev
        return rest
      })
    }
  }

  const handleText = (qid, value) => {
    setAnswers(prev => ({ ...prev, [qid]: value }))
    setErrors(prev => ({ ...prev, [qid]: null }))
  }

  const validate = () => {
    const nextErrors = {}
    visibleQuestions.forEach(q => {
      const val = answers[q.id]
      // Required check
      if (q.required) {
        if (!val || (Array.isArray(val) && val.length === 0) || (typeof val === 'string' && val.trim() === '')) {
          nextErrors[q.id] = 'This question is required.'
          return
        }
      }
      // Name length check
      if (q.id === 'name' && val) {
        const trimmed = val.trim()
        if (trimmed.length > 50) {
          nextErrors[q.id] = 'Name must be 50 characters or fewer.'
          return
        }
      }
      // Email format check (only if provided)
      if (q.id === 'email' && val && val.trim() !== '') {
        const basicEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!basicEmail.test(val.trim())) {
          nextErrors[q.id] = 'Please enter a valid email address.'
          return
        }
      }
    })
    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const sendToDiscord = async (data) => {
    const fields = [
      { name: 'Name', value: data.name || 'Not provided', inline: true },
      { name: 'Wallet Familiarity', value: data.wallets || 'Not answered', inline: true },
      { name: 'Bet History', value: data.bet || 'Not answered', inline: true },
    ]

    if (data.bet === 'Yes' && data.bet_type) {
      fields.push({ name: 'Bet Type', value: data.bet_type, inline: true })
    }

    if (data.bet_explain) {
      fields.push({ name: 'Bet Explanation', value: data.bet_explain.slice(0, 1024) })
    }

    fields.push(
      { name: 'Interest', value: data.interest || 'Not answered', inline: true },
      { name: 'Games', value: (data.games || []).join(', ') || 'None selected', inline: false }
    )

    if (data.add_games) {
      fields.push({ name: 'Requested Games', value: data.add_games.slice(0, 1024) })
    }

    if (data.suggestions) {
      fields.push({ name: 'Suggestions', value: data.suggestions.slice(0, 1024) })
    }

    if (data.email) {
      fields.push({ name: 'Email', value: data.email, inline: true })
    }

    const payload = {
      content: null,
      embeds: [{
        title: '\uD83C\uDFAE New IKKII Beta Survey Response',
        color: 0x8B5CF6,
        fields,
        timestamp: new Date().toISOString(),
        footer: {
          text: `Submitted via ${navigator.userAgent.slice(0, 200)}`
        }
      }]
    }

    const res = await fetch('/api/discord', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })

    return res.ok
  }

  const handleSubmit = async () => {
    if (!validate() || submitted) return

    const payload = {
      answers,
      submittedAt: new Date().toISOString(),
    }
    localStorage.setItem(SURVEY_KEY, JSON.stringify(payload))

    let discordOk = true
    try {
      discordOk = await sendToDiscord(answers)
    } catch (err) {
      console.error('Discord webhook failed:', err)
      discordOk = false
    }

    setDiscordError(!discordOk)
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg0)', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 1000,
          padding: '0 24px',
          background: isDark ? 'rgba(4,4,10,0.88)' : 'rgba(248,249,255,0.92)',
          backdropFilter: 'blur(20px)',
          borderBottom: isDark ? '1px solid rgba(30,30,53,0.8)' : '1px solid rgba(200,200,240,0.8)',
        }}
      >
        <div style={{ maxWidth: 1180, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{ fontFamily: "'Cy Grotesk Grand', sans-serif", fontSize: 22, fontWeight: 700, color: 'var(--text1)', letterSpacing: -1, textTransform: 'uppercase' }}>
              IKKII
            </span>
          </a>

          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <a href="/" className="btn btn-outline" style={{ padding: '10px 22px', fontSize: 14, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
              <ArrowLeft size={16} />
              Back to Home
            </a>
            <motion.button
              className="theme-toggle"
              onClick={toggleTheme}
              whileTap={{ scale: 0.9 }}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Light mode' : 'Dark mode'}
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={theme}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {isDark ? <Sun size={16} /> : <Moon size={16} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Content */}
      <main style={{ flex: 1, paddingTop: 120, paddingBottom: 80 }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <AnimatePresence mode="wait">
            {submitted ? (
              <SuccessView key="success" discordError={discordError} />
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* Intro */}
                <div style={{ textAlign: 'center', marginBottom: 48 }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      background: 'rgba(139,92,246,0.08)',
                      border: '1px solid rgba(139,92,246,0.25)',
                      borderRadius: 999,
                      padding: '6px 16px',
                      marginBottom: 24,
                    }}
                  >
                    <span style={{ width: 6, height: 6, borderRadius: 3, background: '#A78BFA', boxShadow: '0 0 6px #A78BFA', display: 'inline-block' }} />
                    <span style={{ fontSize: 13, color: '#A78BFA', fontWeight: 600 }}>Beta Feedback</span>
                  </div>
                  <h1 style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(32px, 4.5vw, 48px)',
                    fontWeight: 700,
                    letterSpacing: -1.5,
                    lineHeight: 1.1,
                    color: 'var(--text1)',
                    marginBottom: 14,
                  }}>
                    Help us build <span style={{
                      background: 'linear-gradient(135deg, var(--purple-light), var(--cyan))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}>IKKII</span> for you
                  </h1>
                  <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 480, margin: '0 auto', lineHeight: 1.7 }}>
                    A quick survey to help us shape the platform. Takes under 2 minutes.
                  </p>
                </div>

                {/* Questions */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {visibleQuestions.map((q, i) => (
                    <motion.div
                      key={q.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.08, duration: 0.5 }}
                      style={{
                        background: 'var(--bg3)',
                        border: `1px solid ${errors[q.id] ? 'rgba(239,68,68,0.5)' : 'var(--border)'}`,
                        borderRadius: 24,
                        padding: 'clamp(24px, 4vw, 36px)',
                        boxShadow: 'var(--shadow-sm)',
                        transition: 'border-color 0.2s',
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: 10,
                          background: 'linear-gradient(135deg, var(--purple-dark), var(--neon))',
                          color: '#fff',
                          fontSize: 14, fontWeight: 700,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          {i + 1}
                        </div>
                        <h3 style={{ fontSize: 17, fontWeight: 600, color: 'var(--text1)', lineHeight: 1.4 }}>
                          {q.question}
                          {q.required && <span style={{ color: 'var(--red)', marginLeft: 4 }}>*</span>}
                        </h3>
                      </div>

                      {q.type === 'multi' && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {q.options.map(opt => {
                            const selected = (answers[q.id] || []).includes(opt)
                            return (
                              <button
                                key={opt}
                                onClick={() => handleMultiToggle(q.id, opt)}
                                style={{
                                  padding: '10px 18px',
                                  borderRadius: 999,
                                  fontSize: 14,
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  border: `1.5px solid ${selected ? 'var(--purple)' : 'var(--border-light)'}`,
                                  background: selected ? 'rgba(124,58,237,0.1)' : 'var(--bg4)',
                                  color: selected ? 'var(--purple-light)' : 'var(--text2)',
                                  transition: 'all 0.2s',
                                }}
                                onMouseEnter={e => {
                                  if (!selected) e.currentTarget.style.borderColor = 'var(--purple)'
                                }}
                                onMouseLeave={e => {
                                  if (!selected) e.currentTarget.style.borderColor = 'var(--border-light)'
                                }}
                              >
                                {opt}
                              </button>
                            )
                          })}
                        </div>
                      )}

                      {q.type === 'single' && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                          {q.options.map(opt => {
                            const selected = answers[q.id] === opt
                            return (
                              <button
                                key={opt}
                                onClick={() => handleSingle(q.id, opt)}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: 12,
                                  padding: '14px 18px',
                                  borderRadius: 14,
                                  fontSize: 15,
                                  fontWeight: 500,
                                  cursor: 'pointer',
                                  border: `1.5px solid ${selected ? 'var(--purple)' : 'var(--border-light)'}`,
                                  background: selected ? 'rgba(124,58,237,0.08)' : 'var(--bg4)',
                                  color: selected ? 'var(--purple-light)' : 'var(--text2)',
                                  transition: 'all 0.2s',
                                  textAlign: 'left',
                                }}
                              >
                                <div style={{
                                  width: 20, height: 20, borderRadius: '50%',
                                  border: `2px solid ${selected ? 'var(--purple)' : 'var(--border-light)'}`,
                                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                                  flexShrink: 0,
                                  transition: 'all 0.2s',
                                }}>
                                  {selected && <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--purple)' }} />}
                                </div>
                                {opt}
                              </button>
                            )
                          })}
                          {q.explainId && (
                            <input
                              type="text"
                              value={answers[q.explainId] || ''}
                              onChange={e => handleText(q.explainId, e.target.value)}
                              placeholder={q.explainPlaceholder || 'Explain your answer (optional)'}
                              style={{
                                width: '100%',
                                padding: '12px 16px',
                                borderRadius: 12,
                                fontSize: 14,
                                fontFamily: 'inherit',
                                border: '1.5px solid var(--border-light)',
                                background: 'var(--bg4)',
                                color: 'var(--text1)',
                                outline: 'none',
                                transition: 'border-color 0.2s',
                                marginTop: 6,
                              }}
                              onFocus={e => e.target.style.borderColor = 'var(--purple)'}
                              onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                            />
                          )}
                        </div>
                      )}

                      {q.type === 'text' && (
                        <textarea
                          value={answers[q.id] || ''}
                          onChange={e => handleText(q.id, e.target.value)}
                          placeholder={q.placeholder}
                          rows={4}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: 14,
                            fontSize: 15,
                            fontFamily: 'inherit',
                            border: '1.5px solid var(--border-light)',
                            background: 'var(--bg4)',
                            color: 'var(--text1)',
                            resize: 'vertical',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = 'var(--purple)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                        />
                      )}

                      {q.type === 'email' && (
                        <input
                          type="email"
                          value={answers[q.id] || ''}
                          onChange={e => handleText(q.id, e.target.value)}
                          placeholder={q.placeholder}
                          style={{
                            width: '100%',
                            padding: '14px 18px',
                            borderRadius: 14,
                            fontSize: 15,
                            fontFamily: 'inherit',
                            border: '1.5px solid var(--border-light)',
                            background: 'var(--bg4)',
                            color: 'var(--text1)',
                            outline: 'none',
                            transition: 'border-color 0.2s',
                          }}
                          onFocus={e => e.target.style.borderColor = 'var(--purple)'}
                          onBlur={e => e.target.style.borderColor = 'var(--border-light)'}
                        />
                      )}

                      {errors[q.id] && (
                        <motion.p
                          initial={{ opacity: 0, y: -4 }}
                          animate={{ opacity: 1, y: 0 }}
                          style={{ fontSize: 13, color: 'var(--red)', marginTop: 10, fontWeight: 500 }}
                        >
                          {errors[q.id]}
                        </motion.p>
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Submit */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  style={{ marginTop: 40, textAlign: 'center' }}
                >
                  <motion.button
                    onClick={handleSubmit}
                    className="btn btn-primary"
                    style={{ fontSize: 16, padding: '16px 40px' }}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Send size={18} />
                    Submit Feedback
                  </motion.button>
                  <p style={{ fontSize: 13, color: 'var(--text4)', marginTop: 16 }}>
                    Your responses are stored locally for now. No personal data is collected.
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid var(--border)', background: 'var(--bg2)', padding: '32px 24px', textAlign: 'center' }}>
        <p style={{ fontSize: 13, color: 'var(--text4)' }}>
          © 2026 Ikkii. Built on <span style={{ color: '#A78BFA', fontWeight: 600 }}>Solana</span>.
        </p>
      </footer>
    </div>
  )
}

function SuccessView({ discordError }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        textAlign: 'center',
        padding: 'clamp(48px, 8vw, 80px) clamp(24px, 4vw, 48px)',
        background: 'var(--bg3)',
        border: '1px solid var(--border)',
        borderRadius: 28,
        boxShadow: 'var(--shadow-lg), 0 0 80px rgba(124,58,237,0.06)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow */}
      <div className="glow-orb" style={{
        width: 400, height: 300,
        background: 'radial-gradient(ellipse, rgba(124,58,237,0.1) 0%, transparent 70%)',
        top: '40%', left: '50%', transform: 'translate(-50%,-50%)',
      }} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        {discordError && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              background: 'rgba(245,158,11,0.1)',
              border: '1px solid rgba(245,158,11,0.3)',
              borderRadius: 12,
              padding: '12px 18px',
              marginBottom: 28,
              fontSize: 14,
              color: 'var(--gold)',
              fontWeight: 500,
              lineHeight: 1.5,
            }}
          >
            We saved your response, but had trouble sending it to our server. Don't worry — we still got it!
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            width: 72, height: 72,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--purple-dark), var(--neon))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px',
            boxShadow: '0 0 40px var(--purple-glow)',
          }}
        >
          <Check size={32} color="#fff" strokeWidth={3} />
        </motion.div>

        <h2 style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: 'clamp(28px, 4vw, 40px)',
          fontWeight: 700,
          letterSpacing: -1,
          lineHeight: 1.15,
          color: 'var(--text1)',
          marginBottom: 14,
        }}>
          Thanks for your feedback!
        </h2>

        <p style={{ fontSize: 17, color: 'var(--text2)', maxWidth: 420, margin: '0 auto 36px', lineHeight: 1.7 }}>
          Your responses help us build a better IKKII. We read every single one.
        </p>

        <a href="/" className="btn btn-primary" style={{ fontSize: 15, padding: '14px 32px' }}>
          Back to Home
        </a>

        <button
          onClick={() => {
            localStorage.removeItem(SURVEY_KEY)
            window.location.reload()
          }}
          style={{
            display: 'block',
            margin: '16px auto 0',
            background: 'none',
            border: 'none',
            color: 'var(--text3)',
            fontSize: 13,
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          Reset and retake survey
        </button>
      </div>
    </motion.div>
  )
}
