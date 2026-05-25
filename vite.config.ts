import { copyFileSync, existsSync } from 'node:fs'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'

/** GitHub Pages needs 404.html = index.html for client-side routes. */
function githubPagesSpaFallback(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const indexPath = 'dist/index.html'
      if (existsSync(indexPath)) {
        copyFileSync(indexPath, 'dist/404.html')
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), ...(command === 'build' ? [githubPagesSpaFallback()] : [])],
  // Project site: https://MandithaNanayakkara.github.io/connect-to-care/
  base: command === 'build' ? '/connect-to-care/' : '/',
}))
