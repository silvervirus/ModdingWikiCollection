import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ModdingWikiCollection/', // <-- GitHub Pages repo name
  plugins: [react()]
})

