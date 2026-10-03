import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const clientDirectory = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        main: resolve(clientDirectory, 'index.html'),
        todo: resolve(clientDirectory, 'todo/index.html'),
      },
    },
  },
})
