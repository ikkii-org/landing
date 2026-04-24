const WEBHOOK_URL = 'https://discord.com/api/webhooks/1496567724522868798/X6X03ILcqBOEWYqzr5YSxNbuusUWldOM9lDAqJgNxm3Jn6FJvpY3liWbXhdnJtzdn3bV'

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const discordRes = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    })

    if (discordRes.ok) {
      return res.status(200).json({ success: true })
    } else {
      const text = await discordRes.text()
      console.error('Discord error:', discordRes.status, text)
      return res.status(500).json({ success: false, error: 'Discord error' })
    }
  } catch (err) {
    console.error('Proxy error:', err)
    return res.status(500).json({ success: false, error: err.message })
  }
}
