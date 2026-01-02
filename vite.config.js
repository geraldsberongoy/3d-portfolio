import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          "vendor-react": ["react", "react-dom"],
          "vendor-three-core": ["three"],
          "vendor-three-ecosystem": ["@react-three/fiber", "@react-three/drei", "@react-three/postprocessing"],
          "vendor-animation": ["gsap", "@gsap/react", "motion"],
          "vendor-ui": ["lucide-react", "clsx", "tailwind-merge"],
        },
      },
    },
  },
});
