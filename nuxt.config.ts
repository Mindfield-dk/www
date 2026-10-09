import type { NitroConfig } from 'nitropack/types'

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
      esbuild: {
        options: {
          target: 'esnext'
        }
      }
    } as NitroConfig,
    css: [
        '~/assets/css/main.css',
    ]
  })
