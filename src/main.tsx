import React from 'react'
import ReactDOM from 'react-dom/client'
import '@fontsource-variable/golos-text'
import App from './App'
import { resolvePage } from './seo'
import './index.css'

const root = document.getElementById('root')!
const { page } = resolvePage(location.pathname, location.hash)
const adVisible = root.dataset.adVisible
const initialAdVisible = adVisible === undefined ? undefined : adVisible === 'true'
const app = (
  <React.StrictMode>
    <App initialPage={page} initialAdVisible={initialAdVisible} />
  </React.StrictMode>
)

if (root.dataset.page === page.path && root.hasChildNodes()) {
  ReactDOM.hydrateRoot(root, app)
} else {
  ReactDOM.createRoot(root).render(app)
}
