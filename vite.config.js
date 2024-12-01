import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000,
        host: '0.0.0.0'
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '#root': resolve(__dirname)
        }
    },
})