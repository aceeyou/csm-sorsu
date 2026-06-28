import { reactRouter } from "@react-router/dev/vite"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from "vite"
import tsconfigPaths from "vite-tsconfig-paths"
import devtoolsJson from "vite-plugin-devtools-json"
import { vercelPreset } from "@vercel/react-router/vite"

export default defineConfig({
  plugins: [
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
    devtoolsJson(),
    vercelPreset(),
  ],
  server: {
    proxy: {
      // Change to 'csm-sorsu-server.vercel.app' before deployment
      // target: "http://127.0.0.1:1337",
      "/api": {
        target: "https://csm-sorsu-server.vercel.app",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
})
