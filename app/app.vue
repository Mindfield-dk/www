<template>
  <UApp>
    <UHeader title="Mindfield" to="/" :toggle="false">
      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
