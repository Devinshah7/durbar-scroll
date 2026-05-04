import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  vite: {
    ssr: {
      noExternal: [],
      optimizeDeps: {
        exclude: ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing', 'postprocessing'],
      },
    },
    optimizeDeps: {
      exclude: ['three'],
    },
  },
});
