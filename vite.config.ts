import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// 站点可能部署在子路径下，资源用相对路径
export default defineConfig({
  base: './',
  plugins: [react()],
})
