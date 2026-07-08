import { defineConfig } from 'vite-plus'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  base: '/trackutil/',
  plugins: [nodePolyfills()],
})
