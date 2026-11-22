import { defineCachedFunction } from 'nitropack/runtime'
import { defineEventHandler, useRuntimeConfig, type RequestEvent } from 'nuxt/server'
import type { ModelForgeDownloads, ModelForgeRelease } from '../../types/modelforge-release'

// Five minutes, as long as the host lets latest.json be cached, so a new release shows soon after its upload.
const getLatest = defineCachedFunction(async (_event: RequestEvent): Promise<ModelForgeDownloads> => {
  const base = useRuntimeConfig().modelforgeDownloads.replace(/\/$/, '')
  const response = await fetch(`${base}/latest.json`)
  // No release uploaded yet: the page says so rather than failing.
  if (response.status === 404) return { release: null }
  if (!response.ok) throw new Error(`latest.json: ${response.status}`)
  const latest = await response.json() as ModelForgeRelease
  const withUrl = (list: ModelForgeRelease['platforms']['mac']) => list.map((file) => ({ ...file, url: `${base}/${file.file}` }))
  return {
    release: {
      ...latest,
      platforms: { mac: withUrl(latest.platforms.mac), win: withUrl(latest.platforms.win), linux: withUrl(latest.platforms.linux) },
      checksums: `${base}/${latest.version}/SHA256SUMS`
    }
  }
}, { name: 'modelforge-latest', maxAge: 60 * 5, getKey: () => 'latest' })

export default defineEventHandler((event) => getLatest(event))
