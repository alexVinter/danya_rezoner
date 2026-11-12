import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { resolvePage } from './src/seo'

export default defineConfig(({ isPreview }) => ({
  appType: isPreview ? 'mpa' : 'spa',
  plugins: [
    react(),
    {
      name: 'preview-prerendered-pages',
      configurePreviewServer({ config, middlewares }) {
        const notFoundPath = resolve(config.root, config.build.outDir, '404.html')
        middlewares.use((req, res, next) => {
          if (req.method !== 'GET' && req.method !== 'HEAD') return next()
          const { pathname, search } = new URL(req.url ?? '/', 'http://localhost')
          if (/\.[^/]+$/.test(pathname) && !pathname.endsWith('.html')) return next()
          const { page, removed } = resolvePage(pathname)
          if (page.view === 'not-found') {
            res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' })
            res.end(req.method === 'HEAD' ? undefined : readFileSync(notFoundPath))
            return
          }
          if (page.path !== pathname) {
            res.writeHead(removed ? 301 : 308, { Location: page.path + search })
            res.end()
            return
          }
          req.url = `${page.path === '/' ? '' : page.path}/index.html${search}`
          next()
        })
      },
    },
  ],
  server: {
    port: 3000,
    open: false
  }
}))
