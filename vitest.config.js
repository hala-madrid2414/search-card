import { defineConfig, mergeConfig } from 'vitest/config'
import { createVitestConfig } from '@lynx-js/react/testing-library/vitest-config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const defaultConfig = await createVitestConfig()
const config = defineConfig({
  test: {},
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})

export default mergeConfig(defaultConfig, config)
