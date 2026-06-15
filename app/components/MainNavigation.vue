<template>
  <UHeader class="shadow-sm">
    <template #title>
      <NuxtLink to="/" class="flex items-center gap-2 text-highlighted hover:text-primary transition-colors">
        <UIcon name="i-lucide-box" class="size-7" />
        <span>Mindfield</span>
      </NuxtLink>
    </template>

    <template #right>
      <UColorModeButton />
    </template>
  </UHeader>
</template>
