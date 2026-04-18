/// <reference types="vitest/config" />
import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import viteTsConfigPaths from "vite-tsconfig-paths"
import tailwindcss from "@tailwindcss/vite"
import { nitro } from "nitro/vite"

const config = defineConfig({
  plugins: [
    devtools(),
    nitro(),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tailwindcss(),

    // ─────────────────────────────────────────────────────────────
    // FIX: Skip tanstackStart() ONLY when running Vitest
    // This is the exact cause of your "Invalid hook call" / useState null errors
    // (tanstackStart plugin conflicts with Vitest + React 19 renderer)
    ...(process.env.VITEST ? [] : [tanstackStart()]),
    // ─────────────────────────────────────────────────────────────

    viteReact(),
  ],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/lib/test/setup.ts'
  },
})

export default config