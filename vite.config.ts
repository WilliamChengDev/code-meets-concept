import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  base: '/code-meets-concept/',  // Replaced with actual GitHub repo name
  plugins: [react()],
})
