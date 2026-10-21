<template>
  <UApp>
    <UHeader to="/" :toggle="false">
      <template #title>
        <AppLogo />
      </template>

      <template #right>
        <UColorModeButton />
        <UDropdownMenu :items="githubMenu" :content="{ align: 'end' }">
          <UButton
            icon="i-simple-icons-github"
            color="neutral"
            variant="ghost"
            aria-label="GitHub accounts"
          />
        </UDropdownMenu>
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>

    <UFooter :ui="{ root: 'bg-default/80 backdrop-blur-md border-t border-default' }">
      <template #left>
        <p class="text-sm text-muted">
          © {{ year }} Mindfield ·
          Background photo via
          <ULink
            to="https://unsplash.com/photos/a-grassy-hill-with-a-path-going-up-it-CKApUn1rsxA"
            target="_blank"
            rel="noopener noreferrer"
            class="underline underline-offset-2"
          >Unsplash</ULink>
        </p>
      </template>

      <template #right>
        <UButton
          v-for="account in githubAccounts"
          :key="account.login"
          :to="account.to"
          :label="account.login"
          target="_blank"
          rel="noopener noreferrer"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          size="sm"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()

// The listed repositories come from both of these accounts (see server/api/github/repos.ts)
const githubAccounts = [
  { login: 'Mindfield-dk', to: 'https://github.com/Mindfield-dk' },
  { login: 'localgod', to: 'https://github.com/localgod' }
]

const githubMenu = githubAccounts.map(account => ({
  label: account.login,
  icon: 'i-simple-icons-github',
  to: account.to,
  target: '_blank'
}))
const url = useRequestURL()

const title = 'Mindfield – Our Projects'
const description = 'Open source projects from Mindfield and its contributors.'

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }
  ]
})

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  ogType: 'website',
  ogImage: {
    url: new URL('/images/og-image.jpg', url.origin).toString(),
    width: 1200,
    height: 630,
    alt: 'Grassy hillside with a path leading up into the clouds'
  }
})
</script>
