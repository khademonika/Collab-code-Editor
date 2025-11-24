import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
  proxy: {
     "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
}
,
  theme: {
    extend: {
      animation: {
        // Defines a subtle floating/breathing animation for the background blobs
        blob: 'blob 7s infinite',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '33%': { transform: 'translate(30px, -50px) scale(1.1)' },
          '66%': { transform: 'translate(-20px, 20px) scale(0.9)' },
        },
      },
    },
  },
})