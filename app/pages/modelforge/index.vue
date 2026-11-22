<template>
  <UPage>
    <UPageHero
      title="ModelForge"
      description="A lightweight, scriptable ArchiMate modeling tool. Download it for your computer, or use it in the browser."
      :links="[
        { label: 'Open in the browser', to: 'https://modelforge.mindfield.dk/', target: '_blank', trailingIcon: 'i-lucide-arrow-up-right' }
      ]"
      :ui="{ container: 'py-16 sm:py-20 lg:py-24', description: 'text-default' }"
    />

    <UPageSection v-if="pending" :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0' }">
      <UPageGrid>
        <UPageCard v-for="n in 3" :key="n" variant="subtle" :ui="{ root: 'bg-default/90 backdrop-blur-md' }">
          <div class="space-y-3">
            <USkeleton class="h-5 w-1/3" />
            <USkeleton class="h-9 w-full" />
            <USkeleton class="h-4 w-2/3" />
          </div>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection v-else-if="error">
      <UAlert
        color="error"
        variant="soft"
        orientation="vertical"
        icon="i-lucide-triangle-alert"
        title="Unable to load the downloads"
        description="The list of downloads could not be fetched right now."
        :actions="[{ label: 'Retry', color: 'error', variant: 'outline', icon: 'i-lucide-refresh-cw', onClick: () => refresh() }]"
      />
    </UPageSection>

    <UPageSection v-else-if="!release">
      <UEmpty
        icon="i-lucide-package"
        title="No desktop release yet"
        description="The first one is on its way. Until then, ModelForge runs in the browser."
        variant="subtle"
      />
    </UPageSection>

    <template v-else>
      <UPageSection :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0 pb-8 sm:pb-10 lg:pb-12' }">
        <h2 class="mb-8 text-xl font-semibold text-highlighted">
          Version {{ release.version }}
          <span class="ml-2 text-sm font-normal text-muted">released <NuxtTime :datetime="release.date" date-style="long" /></span>
        </h2>

        <UPageGrid>
          <UPageCard
            v-for="platform in platforms"
            :key="platform.id"
            variant="subtle"
            :highlight="platform.id === detected"
            :ui="{ root: 'bg-default/90 backdrop-blur-md', footer: 'w-full' }"
          >
            <template #title>
              <span class="flex items-center gap-2">
                <UIcon :name="platform.icon" class="size-5 text-primary" />
                {{ platform.name }}
                <UBadge v-if="platform.id === detected" label="Your system" color="primary" variant="soft" size="sm" />
              </span>
            </template>

            <template #description>
              <p class="text-toned">{{ platform.note }}</p>
            </template>

            <template #footer>
              <div class="flex flex-col gap-2">
                <UButton
                  v-for="file in release.platforms[platform.id]"
                  :key="file.file"
                  :to="file.url"
                  :label="label(file)"
                  :icon="file.kind === 'installer' ? 'i-lucide-download' : 'i-lucide-file-archive'"
                  :color="file.kind === 'installer' ? 'primary' : 'neutral'"
                  :variant="file.kind === 'installer' ? 'solid' : 'outline'"
                  block
                  external
                  download
                />
              </div>
            </template>
          </UPageCard>
        </UPageGrid>
      </UPageSection>

      <UPageSection :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0' }">
        <UAlert
          color="neutral"
          variant="subtle"
          icon="i-lucide-shield-alert"
          title="The apps are not signed by a developer certificate yet"
          :ui="{ root: 'bg-default/90 backdrop-blur-md' }"
        >
          <template #description>
            <ul class="mt-1 list-disc space-y-1 pl-5">
              <li>
                <strong>macOS</strong> says the developer cannot be verified. Right-click ModelForge in Applications and
                choose Open, or run <code>xattr -dr com.apple.quarantine /Applications/ModelForge.app</code>.
              </li>
              <li><strong>Windows</strong> SmartScreen says the publisher is unknown: choose More info, then Run anyway.</li>
              <li>
                To check a download, compare it with the
                <ULink :to="release.checksums" external class="underline underline-offset-2">SHA-256 checksums</ULink>
                (<code>sha256sum -c SHA256SUMS</code>).
              </li>
            </ul>
          </template>
        </UAlert>
      </UPageSection>
    </template>
  </UPage>
</template>

<script setup lang="ts">
import type { ModelForgeFile } from '~~/server/types/modelforge-release'

useSeoMeta({
  title: 'ModelForge downloads',
  description: 'Download ModelForge, a lightweight, scriptable ArchiMate modeling tool, for macOS, Windows and Linux.'
})

const { data, pending, error, refresh } = await useFetch('/api/modelforge/latest')
const release = computed(() => data.value?.release ?? null)

const platforms = [
  { id: 'mac', name: 'macOS', icon: 'i-simple-icons-apple', note: 'One app for Apple Silicon and Intel Macs.' },
  { id: 'win', name: 'Windows', icon: 'i-simple-icons-windows', note: 'An installer, or a zip to run without installing. 64-bit.' },
  { id: 'linux', name: 'Linux', icon: 'i-simple-icons-linux', note: 'An AppImage that runs on most distributions, or a tar.gz. x86-64.' }
] as const

// Which card to point out; only known in the browser, so the server-rendered page highlights none.
const detected = ref<ModelForgeFile['platform'] | null>(null)
onMounted(() => {
  const agent = navigator.userAgent
  detected.value = /Mac/.test(agent) ? 'mac' : /Win/.test(agent) ? 'win' : /Linux/.test(agent) && !/Android/.test(agent) ? 'linux' : null
})

const size = (bytes: number) => `${Math.round(bytes / 1024 / 1024)} MB`
const extension = (file: string) => file.endsWith('.tar.gz') ? '.tar.gz' : file.slice(file.lastIndexOf('.'))
const label = (file: ModelForgeFile) =>
  `${file.kind === 'installer' ? 'Download' : 'Archive'} ${extension(file.file)} · ${size(file.size)}`
</script>
