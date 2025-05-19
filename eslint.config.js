// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default nuxt(
  // @ts-ignore
  antfu(
    {
      unocss: true,
      formatters: true,
      rules: {
        'node/prefer-global/process': ['off'],
        'no-console': ['off'],
      },
      ignores: ['.pnpm-store/**'],
    },
  ),
)
