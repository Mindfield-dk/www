import { createApi } from 'unsplash-js'
import {
  createError,
  defineEventHandler,
  getValidatedQuery,
  useRuntimeConfig
} from 'nuxt/server'

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery<{ id: string }>(event, (input) => {
    const id = Array.isArray(input.id) ? input.id[0] : input.id

    return typeof id === 'string' && id.length > 0 ? { id } : false
  })
  const { unsplashAccessKey } = useRuntimeConfig()

  if (!unsplashAccessKey) {
    throw createError({
      status: 503,
      statusText: 'Unsplash is not configured'
    })
  }

  const serverApi = createApi({ accessKey: unsplashAccessKey })
  const output = await serverApi.GET('/photos/{assetSlug}', {
    params: {
      path: { assetSlug: query.id }
    }
  })

  if (output.error || !output.data) {
    throw createError({
      status: output.response.status,
      statusText: 'Unable to load the requested photo'
    })
  }

  const imageUrl = new URL(output.data.urls.full)
  imageUrl.searchParams.set('w', '200')

  return imageUrl.toString()
})
