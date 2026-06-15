// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/ui'],
    devtools: { enabled: true },
    telemetry: false,
    compatibilityDate: '2026-06-15',
    ssr: true,
    vite: {
      server: {
        allowedHosts: ['.gitpod.dev', '.gitpod.io']
      }
    },
    runtimeConfig: {
      UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    },
    nitro: {
      preset: "cloudflare_pages",
      cloudflare: {
        nodeCompat: true
      },
      esbuild: {
        options: {
          target: 'esnext'
        }
      }
    },
    css: [
        '~/assets/css/main.css',
    ]
  })
