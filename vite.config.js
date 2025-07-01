import { defineConfig } from 'vite'

export default defineConfig({
  root: '.',
  server: {
    port: 3000,
    open: '/modular-all.html'
  },
  build: {
    rollupOptions: {
      input: {
        main: './modular-all.html'
      }
    }
  }
})