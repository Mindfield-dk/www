import { createApi } from 'unsplash-js'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const { UNSPLASH_ACCESS_KEY } = useRuntimeConfig()
  const serverApi = createApi({
    accessKey: UNSPLASH_ACCESS_KEY
  })
  const output = await serverApi.photos.get({ photoId: query.id as string })
  const regular = output?.response?.urls.full
  return `${regular}&w=200`
})