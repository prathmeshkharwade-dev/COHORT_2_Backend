import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
     VitePWA({
     registerType:"autoUpdate",
    manifest:{
      name:'offline-todo',
      short_name:"Todo-app",
      description: "This is a todo app",
      theme_color: "#ffff",
      background_color: "#ffff",
    },
  }),
],
});
