<template>
  <UHeader class="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
    <template #left>
      <NuxtLink to="/" class="flex items-center gap-2 font-bold text-xl text-[#000000] dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
        <UIcon name="i-heroicons-cube" class="w-7 h-7" />
        <span>Mindfield</span>
      </NuxtLink>
    </template>

    <template #right>
      <ColorModeButton />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
</script>