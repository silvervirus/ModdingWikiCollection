import express from 'express'
const response = await fetch(url, options)

const router = express.Router()

router.get('/import-nexus-mod', async (req, res) => {
  const { modId } = req.query

  if (!modId) {
    return res.status(400).json({ error: 'Missing modId' })
  }

  try {
    const response = await fetch(
      `https://api.nexusmods.com/v1/games/subnautica/mods/${modId}.json`,
      {
        headers: {
          apikey: process.env.NEXUS_API_KEY!,
          'User-Agent': 'YourSiteName/1.0',
        },
      }
    )

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Nexus API error' })
    }

    const mod = await response.json()

    res.json({
      title: mod.name,
      description: mod.summary,
      mod_version: mod.version,
      download_link: mod.url,
      banner_url: mod.picture_url,
      game_version: mod.game_versions?.[0] ?? '',
      release_channel: 'stable',
      nexus_mod_id: mod.mod_id,
      nexus_game: 'subnautica',
    })
  } catch (err: any) {
    res.status(500).json({ error: err.message })
  }
})

export default router

