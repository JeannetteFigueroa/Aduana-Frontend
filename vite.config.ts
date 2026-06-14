import { defineConfig } from "vite";
import { TanStackStartVitePlugin } from "@tanstack/react-start-plugin";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    TanStackStartVitePlugin({
      customViteReactPlugin: true,
    }),
    react(),
    tsConfigPaths(),
    tailwindcss(),
  ],
});
