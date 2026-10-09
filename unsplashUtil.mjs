import { createApi } from 'unsplash-js';
const unsplash = createApi({ accessKey: process.env.NUXT_UNSPLASH_ACCESS_KEY })

const t = await unsplash.GET('/photos/{assetSlug}', {
  params: {
    path: { assetSlug: 'a-grassy-hill-with-a-path-going-up-it-CKApUn1rsxA' }
  },
  headers: { 'X-Custom-Header-2': 'bar' }
})

console.log(t.data?.urls.regular)
