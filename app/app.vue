<template>
  <UApp>
    <UHeader to="/" :toggle="false">
      <template #title>
        <AppLogo />
      </template>

      <template #right>
        <UColorModeButton />
        <UTooltip text="Mindfield on GitHub">
          <UButton
            to="https://github.com/Mindfield-dk"
            target="_blank"
            rel="noopener noreferrer"
            icon="i-simple-icons-github"
            color="neutral"
            variant="ghost"
            aria-label="Mindfield on GitHub"
          />
        </UTooltip>
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
          to="https://github.com/Mindfield-dk"
          target="_blank"
          rel="noopener noreferrer"
          icon="i-simple-icons-github"
          color="neutral"
          variant="ghost"
          aria-label="Mindfield on GitHub"
        />
      </template>
    </UFooter>
  </UApp>
</template>

<script setup lang="ts">
const year = new Date().getFullYear()
const url = useRequestURL()

const title = 'Mindfield – Open source projects'
const description = 'Open source tools from Mindfield for enterprise architecture, diagramming and developer workflows.'

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
