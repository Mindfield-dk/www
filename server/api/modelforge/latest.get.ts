import { defineCachedFunction } from 'nitropack/runtime'
import { defineEventHandler, useRuntimeConfig, type RequestEvent } from 'nuxt/server'
import type { ModelForgeDownloads, ModelForgeRelease } from '../../types/modelforge-release'

// A release is cached for five minutes, as long as the host lets latest.json be cached, so a new one shows soon after
// its upload. "No release yet" is never cached: it would hide the first release until the cache let it go.
const getLatest = defineCachedFunction(async (_event: RequestEvent): Promise<ModelForgeDownloads> => {
  const base = useRuntimeConfig().modelforgeDownloads.replace(/\/$/, '')
  // The query keeps any cache between here and the host from answering with an older latest.json (or its 404).
  const response = await fetch(`${base}/latest.json?t=${Date.now()}`)
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
}, {
  // A new name, so the entry cached before the first release, which said there was none, is not read again.
  name: 'modelforge-release',
  maxAge: 60 * 5,
  // Once five minutes are up, wait for the host rather than show the old answer once more.
  swr: false,
  getKey: () => 'latest',
  validate: (entry) => entry.value?.release != null
})

export default defineEventHandler((event) => getLatest(event))
