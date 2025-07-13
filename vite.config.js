import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   base: mode === 'development' ? '/' : '/Studio-Mellow-/',
// })

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  /** dev 用 /，上線（GitHub Pages）自動變成 /Studio-Mellow-/ */
  base: mode === 'development' ? '/' : '/Studio-Mellow-/',
}));