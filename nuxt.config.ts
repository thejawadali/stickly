import { appDescription } from './constants/index'

export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    '@unocss/nuxt',
    '@pinia/nuxt',
    '@vite-pwa/nuxt',
    '@nuxt/eslint',
    '@nuxt/ui',
  ],
  pwa: {
    manifest: {
      name: 'Stickly',
      short_name: 'Stickly',
      description: 'Stickly',
      icons: [
        {
          src: 'icons/64.png',
          sizes: '64x64',
          type: 'image/png',
        },
        {
          src: 'icons/128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'icons/256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'icons/512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    workbox: {
      navigateFallback: '/',
    },
    devOptions: {
      enabled: true,
      type: 'module',
    }, 
  },
  imports: {
    dirs: [
      './types',
    ],
  },

  css: [
    '@unocss/reset/tailwind.css',
    './assets/index.css',
  ],

  app: {
    head: {
      viewport: 'width=device-width,initial-scale=1',
      link: [
        { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
        { rel: 'icon', type: 'image/svg+xml', href: '/nuxt.svg' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
      ],
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: appDescription },
        { name: 'apple-mobile-web-app-status-bar-style', content: 'black-translucent' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: 'white' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#222222' },
      ],
    },
  },
  runtimeConfig: {
    mongoUri: process.env.MONGODB_URI,
    githubId: process.env.AUTH_GITHUB_ID,
    githubSecret: process.env.AUTH_GITHUB_SECRET,
    googleId: process.env.AUTH_GOOGLE_ID,
    googleSecret: process.env.AUTH_GOOGLE_SECRET,
  },

  devtools: {
    enabled: true,
  },

  features: {
    // For UnoCSS
    inlineStyles: false,
  },
  nitro: {
    plugins: ["~/server/plugins/mongoose.ts"],
  },
  eslint: {
    config: {
      standalone: false,
    },
  },

  // mongoose: {
  //   uri: process.env.MONGODB_URI,
  //   options: {},
  //   modelsDir: 'models',
  //   devtools: true,
  // },

  compatibilityDate: '2025-05-13',
})