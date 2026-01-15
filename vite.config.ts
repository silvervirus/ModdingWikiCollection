import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // Use relative paths to make Rollup resolve assets
  plugins: [react()],
})
