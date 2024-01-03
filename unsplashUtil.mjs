import { createApi } from 'unsplash-js';
const unsplash = createApi({accessKey: process.env.UNSPLASH_ACCESS_KEY}).photos

const t = await unsplash.get(
  { photoId: 'a-grassy-hill-with-a-path-going-up-it-CKApUn1rsxA' },
  { headers: { 'X-Custom-Header-2': 'bar' } },
);

console.log(t.response.urls.regular)
