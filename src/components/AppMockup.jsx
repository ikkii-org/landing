import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Exact colors from the real app ───────────────────────────────────────────
const C = {
    bg: '#0A0A0F',
    bgSecondary: '#13131A',
    bgCard: '#1A1A2E',
    bgCard2: '#0D0E1A',
    border: '#1E2030',
    purple: '#8B5CF6',
    purpleLight: '#A78BFA',
    cyan: '#06B6D4',
    success: '#10B981',
    amber: '#F59E0B',
    textMuted: '#64748B',
    textSub: '#94A3B8',
    textWhite: '#F1F5F9',
    danger: '#EF4444',
}

// ─── Shared mini-UI primitives ─────────────────────────────────────────────────
function Card({ children, style }) {
    return (
        <div style={{
            background: C.bgCard, border: `1px solid ${C.border}`,
            borderRadius: 16, padding: 14, ...style,
        }}>
            {children}
        </div>
    )
}

function Avatar({ name, color = C.purple }) {
    return (
        <div style={{
            width: 32, height: 32, borderRadius: 10,
            background: `${color}22`, border: `1px solid ${color}44`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 700, fontSize: 13, color, flexShrink: 0,
        }}>
            {name[0].toUpperCase()}
        </div>
    )
}

function Pill({ label, color }) {
    return (
        <span style={{
            fontSize: 9, fontWeight: 700, padding: '2px 7px',
            borderRadius: 999, background: `${color}18`,
            border: `1px solid ${color}44`, color, letterSpacing: 0.5, textTransform: 'uppercase',
        }}>
            {label}
        </span>
    )
}

// ─── Screen: Home ─────────────────────────────────────────────────────────────
function HomeScreen() {
    const duels = [
        { player: 'shivaraj', opp: 'apex_h', stake: '1.00 SOL', game: 'Clash Royale', status: 'OPEN', statusColor: C.cyan },
        { player: 'xVelo', opp: 'null_ptr', stake: '0.5 SOL', game: 'Clash Royale', status: 'ACTIVE', statusColor: C.success },
        { player: 'NightFrag', opp: 'darkx', stake: '2.00 SOL', game: 'Clash Royale', status: 'SETTLED', statusColor: C.textMuted },
    ]
    return (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 14px 8px' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: C.textWhite, marginBottom: 2 }}>Home</div>
                <div style={{ fontSize: 10, color: C.textMuted }}>Live duels on Ikkiii</div>
            </div>
            <div style={{ flex: 1, overflow: 'hidden', padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {duels.map((d, i) => (
                    <Card key={i} style={{ padding: '10px 12px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <Avatar name={d.player} color={C.purple} />
                                <span style={{ fontSize: 11, fontWeight: 600, color: C.textWhite }}>{d.player}</span>
                            </div>
                            <span style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, letterSpacing: 1 }}>VS</span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexDirection: 'row-reverse' }}>
                                <Avatar name={d.opp} color={C.cyan} />
                                <span style={{ fontSize: 11, fontWeight: 600, color: C.textWhite }}>{d.opp}</span>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ fontSize: 9, color: C.textMuted }}>{d.game}</div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <span style={{ fontSize: 12, fontWeight: 700, color: C.purpleLight }}>{d.stake}</span>
                                <Pill label={d.status} color={d.statusColor} />
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    )
}

// ─── Screen: Create ────────────────────────────────────────────────────────────
function CreateScreen() {
    return (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '16px 14px' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.textWhite, marginBottom: 2 }}>Create Duel</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 14 }}>Challenge someone on-chain</div>

            {/* Game selector */}
            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Game</div>
                <div style={{ background: C.bgCard, border: `1px solid ${C.purple}55`, borderRadius: 12, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 12, color: C.textWhite, fontWeight: 600 }}>Clash Royale</span>
                    <Pill label="Live" color={C.success} />
                </div>
            </div>

            {/* Stake */}
            <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Stake Amount</div>
                <div style={{ background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 12, padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: 18, fontWeight: 700, color: C.textWhite }}>1.00</span>
                    <div style={{ display: 'flex', gap: 4 }}>
                        {['SOL', 'USDC'].map((t, i) => (
                            <div key={t} style={{ padding: '3px 8px', borderRadius: 8, fontSize: 10, fontWeight: 700, background: i === 0 ? `${C.purple}22` : C.bgCard2, border: `1px solid ${i === 0 ? C.purple : C.border}`, color: i === 0 ? C.purpleLight : C.textMuted }}>
                                {t}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Expiry */}
            <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 9, color: C.textMuted, fontWeight: 700, letterSpacing: 1, marginBottom: 6, textTransform: 'uppercase' }}>Expires In</div>
                <div style={{ display: 'flex', gap: 6 }}>
                    {['1h', '6h', '24h'].map((t, i) => (
                        <div key={t} style={{ flex: 1, textAlign: 'center', padding: '6px 0', borderRadius: 10, fontSize: 11, fontWeight: 700, background: i === 1 ? `${C.purple}22` : C.bgCard, border: `1px solid ${i === 1 ? C.purple : C.border}`, color: i === 1 ? C.purpleLight : C.textMuted }}>
                            {t}
                        </div>
                    ))}
                </div>
            </div>

            {/* Fee note */}
            <div style={{ background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '8px 10px', marginBottom: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: 9, color: C.textMuted }}>Platform fee</span>
                <span style={{ fontSize: 9, color: C.purpleLight, fontWeight: 700 }}>2.5%</span>
            </div>

            {/* Button */}
            <div style={{ background: `linear-gradient(135deg, ${C.purple}, #7C3AED)`, borderRadius: 12, padding: '11px', textAlign: 'center' }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#fff' }}>Create Duel on Solana</span>
            </div>
        </div>
    )
}

// ─── Screen: Wallet ────────────────────────────────────────────────────────────
function WalletScreen() {
    return (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '16px 14px' }}>
            <div style={{ fontSize: 18, fontWeight: 900, color: C.textWhite, marginBottom: 2 }}>Wallet</div>
            <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 12 }}>Manage your escrow balance</div>

            <Card style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 9, color: C.textMuted, letterSpacing: 1, textTransform: 'uppercase', fontWeight: 700, marginBottom: 6 }}>Total Balance</div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                    <span style={{ fontSize: 26, fontWeight: 900, color: C.textWhite }}>24.50</span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.purple }}>USDC</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6 }}>
                    {[
                        { label: 'Available', val: '24.50', color: C.success },
                        { label: 'Locked', val: '1.00', color: C.amber },
                        { label: 'Wallet USDC', val: '50.00', color: '#3B82F6' },
                        { label: 'Solana', val: '2.40', color: C.purpleLight },
                    ].map(({ label, val, color }) => (
                        <div key={label} style={{ background: C.bgCard2, border: `1px solid ${C.border}`, borderRadius: 10, padding: '7px 8px' }}>
                            <div style={{ fontSize: 8, color: C.textMuted, textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700, marginBottom: 3 }}>{label}</div>
                            <div style={{ fontSize: 14, fontWeight: 700, color }}>{val}</div>
                        </div>
                    ))}
                </div>
            </Card>

            <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <div style={{ flex: 1, background: `linear-gradient(135deg, ${C.purple}, #7C3AED)`, borderRadius: 11, padding: '9px', textAlign: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#fff' }}>Deposit</span>
                </div>
                <div style={{ flex: 1, background: C.bgCard, border: `1px solid ${C.border}`, borderRadius: 11, padding: '9px', textAlign: 'center' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.textSub }}>Withdraw</span>
                </div>
            </div>

            <div style={{ fontSize: 12, fontWeight: 700, color: C.textWhite, marginBottom: 8 }}>Recent Activity</div>
            {[
                { type: 'REWARD', amt: '+1.00', label: 'Duel won', color: C.success },
                { type: 'STAKE', amt: '-0.50', label: 'Duel staked', color: C.amber },
            ].map(({ type, amt, label, color }) => (
                <div key={type} style={{ display: 'flex', alignItems: 'center', paddingBottom: 8, borderBottom: `1px solid ${C.border}`, marginBottom: 8, gap: 10 }}>
                    <div style={{ width: 30, height: 30, borderRadius: '50%', background: `${color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span style={{ fontSize: 12 }}>{type === 'REWARD' ? '🏆' : '🔒'}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 11, fontWeight: 600, color: C.textWhite }}>{type}</div>
                        <div style={{ fontSize: 9, color: C.textMuted }}>{label}</div>
                    </div>
                    <div style={{ fontSize: 12, fontWeight: 700, color }}>{amt} SOL</div>
                </div>
            ))}
        </div>
    )
}

// ─── Screen: Leaderboard ───────────────────────────────────────────────────────
function LeaderboardScreen() {
    const entries = [
        { rank: 1, name: 'Striker_x', w: 42, l: 8, wr: '84.0', earned: '128.5', isMe: false },
        { rank: 2, name: 'NightFrag', w: 38, l: 11, wr: '77.6', earned: '96.2', isMe: false },
        { rank: 3, name: 'apex_h', w: 31, l: 10, wr: '75.6', earned: '74.0', isMe: false },
        { rank: 7, name: 'shivaraj', w: 18, l: 9, wr: '66.7', earned: '40.1', isMe: true },
    ]
    const medals = ['🥇', '🥈', '🥉']
    return (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ padding: '16px 14px 8px' }}>
                <div style={{ fontSize: 18, fontWeight: 900, color: C.textWhite, marginBottom: 2 }}>Leaderboard</div>
                <div style={{ fontSize: 10, color: C.textMuted, marginBottom: 10 }}>Top duelers on Ikkiii</div>

                {/* Your rank card */}
                <Card style={{ marginBottom: 10, padding: '10px 12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 36, height: 36, borderRadius: 10, background: `${C.purple}22`, border: `1px solid ${C.purple}44`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <span style={{ fontSize: 13, fontWeight: 900, color: C.purpleLight }}>#7</span>
                            </div>
                            <div>
                                <div style={{ fontSize: 11, fontWeight: 700, color: C.textWhite }}>Your Rank</div>
                                <div style={{ fontSize: 9, color: C.textMuted }}>18W - 9L</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 14, fontWeight: 700, color: C.textWhite }}>66.7%</div>
                            <div style={{ fontSize: 9, color: C.textMuted }}>Win Rate</div>
                        </div>
                    </div>
                </Card>
            </div>

            <div style={{ flex: 1, overflow: 'hidden', padding: '0 14px', display: 'flex', flexDirection: 'column', gap: 0 }}>
                {entries.map((e) => (
                    <div key={e.rank} style={{ display: 'flex', alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${C.border}`, background: e.isMe ? `${C.purple}12` : 'transparent', margin: '0 -4px', padding: '7px 4px', gap: 8 }}>
                        <div style={{ width: 22, textAlign: 'center' }}>
                            {e.rank <= 3 ? <span style={{ fontSize: 14 }}>{medals[e.rank - 1]}</span> : <span style={{ fontSize: 10, color: C.textMuted, fontWeight: 700 }}>#{e.rank}</span>}
                        </div>
                        <Avatar name={e.name} color={e.isMe ? C.purpleLight : C.textSub} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 11, fontWeight: 600, color: e.isMe ? C.purpleLight : C.textWhite, display: 'flex', alignItems: 'center', gap: 4 }}>
                                {e.name}
                                {e.isMe && <span style={{ fontSize: 7, padding: '1px 5px', borderRadius: 999, background: `${C.purple}30`, color: C.purpleLight, fontWeight: 700 }}>YOU</span>}
                            </div>
                            <div style={{ fontSize: 9, color: C.textMuted }}>{e.w}W · {e.l}L · {e.wr}%</div>
                        </div>
                        <div style={{ fontSize: 10, fontWeight: 700, color: C.success }}>{e.earned} SOL</div>
                    </div>
                ))}
            </div>
        </div>
    )
}

// ─── Screen: Profile ───────────────────────────────────────────────────────────
function ProfileScreen() {
    return (
        <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: '16px 14px' }}>
            {/* Avatar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: `${C.purple}22`, border: `2px solid ${C.purple}55`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, fontWeight: 900, color: C.purpleLight }}>S</div>
                <div>
                    <div style={{ fontSize: 16, fontWeight: 900, color: C.textWhite }}>shivaraj</div>
                    <div style={{ fontSize: 10, color: C.textMuted }}>Rank #7 · Clash Royale</div>
                    <div style={{ fontSize: 9, color: C.purple, marginTop: 2 }}>7Ab3...dF9k</div>
                </div>
            </div>

            {/* Stats grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6, marginBottom: 12 }}>
                {[
                    { label: 'Total Duels', val: '27', color: C.purpleLight },
                    { label: 'Win Rate', val: '66.7%', color: C.success },
                    { label: 'Total Won', val: '40 SOL', color: C.amber },
                ].map(({ label, val, color }) => (
                    <Card key={label} style={{ padding: '8px 10px', textAlign: 'center' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color }}>{val}</div>
                        <div style={{ fontSize: 8, color: C.textMuted, marginTop: 2 }}>{label}</div>
                    </Card>
                ))}
            </div>

            {/* Recent duels */}
            <div style={{ fontSize: 11, fontWeight: 700, color: C.textWhite, marginBottom: 8 }}>Recent Duels</div>
            {[
                { opp: 'NightFrag', result: 'WIN', amt: '+1.00 SOL', color: C.success },
                { opp: 'xVelo', result: 'LOSS', amt: '-0.50 SOL', color: C.danger },
                { opp: 'darkx', result: 'WIN', amt: '+0.50 SOL', color: C.success },
            ].map((d, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '7px 0', borderBottom: `1px solid ${C.border}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Avatar name={d.opp} color={d.result === 'WIN' ? C.success : C.danger} />
                        <div>
                            <div style={{ fontSize: 10, fontWeight: 600, color: C.textWhite }}>vs {d.opp}</div>
                            <div style={{ fontSize: 9, color: C.textMuted }}>Clash Royale</div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <Pill label={d.result} color={d.color} />
                        <div style={{ fontSize: 10, fontWeight: 700, color: d.color, marginTop: 3 }}>{d.amt}</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

// ─── Tab icons (SVG paths matching Ionicons) ────────────────────────────────────
const TABS = [
    {
        id: 'home', label: 'Home',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 512 512" fill={active ? C.purple : C.textMuted}>
                <path d="M80 212v236a16 16 0 0016 16h120a16 16 0 0016-16V328a8 8 0 018-8h32a8 8 0 018 8v120a16 16 0 0016 16h120a16 16 0 0016-16V212" />
                <path d="M480 256L266.89 52c-5-5.28-16.69-5.34-21.78 0L0 256" fill="none" stroke={active ? C.purple : C.textMuted} strokeWidth="32" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M400 179L400 64l-48 0 0 69" />
            </svg>
        ),
        Screen: HomeScreen,
    },
    {
        id: 'create', label: 'Create',
        icon: (active) => (
            <svg width="22" height="22" viewBox="0 0 512 512" fill={active ? C.purple : C.textMuted}>
                <path d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208 208-93.31 208-208S370.69 48 256 48z" />
                <path d="M256 176v160M176 256h160" stroke="#fff" strokeWidth="32" strokeLinecap="round" />
            </svg>
        ),
        Screen: CreateScreen,
    },
    {
        id: 'wallet', label: 'Wallet',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 512 512" fill={active ? C.purple : C.textMuted}>
                <rect x="48" y="144" width="416" height="288" rx="32" ry="32" />
                <path d="M411.36 144v-30A50 50 0 00352 64.9L88.64 109.85A50 50 0 0048 159v58" />
                <circle cx="368" cy="288" r="24" fill={active ? '#fff' : C.bgCard} />
            </svg>
        ),
        Screen: WalletScreen,
    },
    {
        id: 'ranks', label: 'Ranks',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 512 512" fill={active ? C.purple : C.textMuted}>
                <path d="M480 224H336L304 48H208l-32 176H32l68.06 142.25L80 464h352l-20.06-97.75L480 224z" />
            </svg>
        ),
        Screen: LeaderboardScreen,
    },
    {
        id: 'profile', label: 'Profile',
        icon: (active) => (
            <svg width="20" height="20" viewBox="0 0 512 512" fill={active ? C.purple : C.textMuted}>
                <path d="M256 256c52.8 0 96-43.2 96-96s-43.2-96-96-96-96 43.2-96 96 43.2 96 96 96zm0 48c-63.6 0-192 32.1-192 96v48h384v-48c0-63.9-128.4-96-192-96z" />
            </svg>
        ),
        Screen: ProfileScreen,
    },
]

// ─── Main phone mockup ─────────────────────────────────────────────────────────
export default function AppMockup() {
    const [activeTab, setActiveTab] = useState('profile')
    const ActiveScreen = TABS.find(t => t.id === activeTab).Screen

    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {/* Phone frame */}
            <motion.div
                initial={{ opacity: 0, y: 40, rotateX: 8 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                style={{
                    width: 270,
                    height: 560,
                    background: '#09090F',
                    borderRadius: 32, // Android typically has slightly sharper corners than iPhone
                    border: '3px solid #111111', // Darker rim
                    boxShadow: '0 60px 120px rgba(0,0,0,0.7), 0 0 0 1px rgba(139,92,246,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                    display: 'flex',
                    flexDirection: 'column',
                    overflow: 'hidden',
                    position: 'relative',
                    userSelect: 'none',
                }}
            >
                {/* Notch / status bar (Android Style) */}
                <div style={{
                    height: 34, background: C.bg, flexShrink: 0,
                    display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
                    padding: '0 18px 4px',
                    position: 'relative',
                }}>
                    <span style={{ fontSize: 11, fontWeight: 500, color: C.textWhite, fontFamily: 'system-ui, sans-serif' }}>10:41</span>
                    {/* Hole-punch camera */}
                    <div style={{ width: 14, height: 14, background: '#050505', borderRadius: '50%', border: '1px solid #1A1A1A', position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)' }} />
                    <div style={{ display: 'flex', gap: 5, alignItems: 'flex-end', paddingBottom: 1 }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill={C.textWhite}><path d="M12 21L23.6 7c-.6-.5-4.8-4-11.6-4C5.1 3 .9 6.5.4 7L12 21z" /></svg>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill={C.textWhite}><path d="M2 22h20V2L2 22z" /></svg>
                        <svg width="10" height="12" viewBox="0 0 24 24" fill={C.textWhite}><path d="M16 4h-2V2h-4v2H8c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z" /></svg>
                    </div>
                </div>

                {/* Screen content */}
                <div style={{ flex: 1, background: C.bg, overflow: 'hidden', position: 'relative' }}>
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 16 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -16 }}
                            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                            style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                        >
                            <ActiveScreen />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Bottom tab bar — exact style from _layout.tsx */}
                <div style={{
                    height: 60, background: C.bg,
                    borderTop: `1px solid ${C.border}`,
                    display: 'flex', alignItems: 'flex-start', paddingTop: 6,
                    flexShrink: 0,
                }}>
                    {TABS.map((tab) => {
                        const active = activeTab === tab.id
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                style={{
                                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
                                    gap: 2, background: 'none', border: 'none', cursor: 'pointer',
                                    padding: '2px 0',
                                }}
                            >
                                <motion.div
                                    animate={{ scale: active ? 1.1 : 1 }}
                                    transition={{ duration: 0.18 }}
                                >
                                    {tab.icon(active)}
                                </motion.div>
                                <span style={{ fontSize: 9, fontWeight: 600, letterSpacing: 0.4, color: active ? C.purple : C.textMuted }}>
                                    {tab.label}
                                </span>
                                {active && (
                                    <motion.div
                                        layoutId="tab-indicator"
                                        style={{ width: 4, height: 4, borderRadius: 2, background: C.purple }}
                                    />
                                )}
                            </button>
                        )
                    })}
                </div>
            </motion.div>
        </div>
    )
}
