// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    devtools: { enabled: true },
    telemetry: false,
    ssr: true,
    runtimeConfig: {
      UNSPLASH_ACCESS_KEY: process.env.UNSPLASH_ACCESS_KEY,
      GITHUB_TOKEN: process.env.GITHUB_TOKEN
    },
    nitro: {
      preset: "cloudflare_pages",
      esbuild: {
        options: {
          target: 'esnext'
        }
      }
    },
    css: [
        '@/assets/css/main.css',
    ],
    app: {
      head: {
        link: [
          { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css' },
          { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.2/font/bootstrap-icons.min.css' }
        ],
        script: [
          { src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js', body: true }
        ]
      }
    }
  })