import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const WEBHOOK_URL = 'https://discord.com/api/webhooks/1496567728956379136/3d3x2hm8ijAHouL3eA-Y9T1Jz2z_xFrxhg22SFm2AYWSvgAUKPT8S7o2SpKttco5dyy4'

function discordProxy() {
  return {
    name: 'discord-proxy',
    configureServer(server) {
      server.middlewares.use('/api/discord', async (req, res, next) => {
        if (req.method === 'OPTIONS') {
          res.setHeader('Access-Control-Allow-Origin', '*')
          res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
          res.setHeader('Access-Control-Allow-Headers', 'Content-Type')
          res.statusCode = 200
          res.end()
          return
        }

        if (req.method !== 'POST') {
          res.statusCode = 405
          res.end(JSON.stringify({ error: 'Method not allowed' }))
          return
        }

        let body = ''
        req.on('data', chunk => { body += chunk })
        req.on('end', async () => {
          try {
            const discordRes = await fetch(WEBHOOK_URL, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body,
            })

            res.setHeader('Access-Control-Allow-Origin', '*')
            res.statusCode = discordRes.ok ? 200 : 500
            res.end(JSON.stringify({ success: discordRes.ok }))
          } catch (err) {
            console.error('Discord proxy error:', err)
            res.statusCode = 500
            res.end(JSON.stringify({ success: false, error: err.message }))
          }
        })
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), discordProxy()],
})
