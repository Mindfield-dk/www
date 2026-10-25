
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    modules: ['@nuxt/eslint', '@nuxt/ui'],
    devtools: { enabled: true },
    telemetry: false,
    compatibilityDate: '2026-06-15',
    future: {
      compatibilityVersion: 5
    },
    experimental: {
      routeTypedFetch: true,
      strictRouteTypes: true
    },
    ui: {
      experimental: {
        componentDetection: true
      }
    },
    ssr: true,
    server: {
      builder: 'nitro'
    },
    vite: {
      server: {
        allowedHosts: ['.gitpod.dev', '.gitpod.io']
      }
    },
    runtimeConfig: {
      unsplashAccessKey: '',
      githubToken: ''
    },
    nitro: {
      preset: "cloudflare_pages",
      cloudflare: {
        nodeCompat: true
      },
      // Persist cached function results (e.g. the GitHub repository list) in Cloudflare KV so the
      // cache is shared between Worker isolates and survives restarts. Requires a KV namespace bound
      // as `CACHE` on the Pages project (Settings → Bindings).
      storage: {
        cache: {
          driver: 'cloudflare-kv-binding',
          binding: 'CACHE'
        }
      },
      devStorage: {
        cache: {
          driver: 'memory'
        }
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
