<template>
  <UPage>
    <UPageHero
      title="Our Projects"
      description="Open source projects from Mindfield and its contributors."
      :ui="{ container: 'py-16 sm:py-20 lg:py-24', description: 'text-default' }"
    />

    <UPageSection v-if="showDemos" :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0 pb-12 sm:pb-16 lg:pb-20' }">
      <div>
      <h2 class="mb-8 flex items-center gap-2 text-xl font-semibold text-highlighted">
        <span class="relative flex size-2.5">
          <span class="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
          <span class="relative inline-flex size-2.5 rounded-full bg-primary" />
        </span>
        Live demos
      </h2>

      <UPageGrid class="lg:grid-cols-2">
        <UPageCard
          v-for="demo in demos"
          :key="demo.url"
          :to="demo.url"
          target="_blank"
          variant="subtle"
          :ui="{
            root: 'bg-default/90 backdrop-blur-md overflow-hidden transition-colors hover:ring-primary/50',
            container: 'p-0 sm:p-0 gap-0',
            body: 'w-full',
            footer: 'w-full'
          }"
        >
          <template #header>
            <!-- Browser window chrome, so demos read as websites rather than repositories -->
            <div class="flex w-full items-center gap-3 border-b border-default bg-elevated/60 px-4 py-2.5">
              <div class="flex gap-1.5">
                <span class="size-2.5 rounded-full bg-error/70" />
                <span class="size-2.5 rounded-full bg-warning/70" />
                <span class="size-2.5 rounded-full bg-success/70" />
              </div>
              <div class="flex min-w-0 flex-1 items-center gap-1.5 rounded-md bg-default px-2.5 py-1 font-mono text-xs text-muted ring ring-default">
                <UIcon name="i-lucide-lock" class="size-3 shrink-0" />
                <span class="truncate">{{ hostname(demo.url) }}</span>
              </div>
            </div>
          </template>

          <template #body>
            <div class="space-y-3 px-4 pt-4 sm:px-6 sm:pt-5">
              <div class="flex items-center justify-between gap-3">
                <h3 class="flex items-center gap-2 text-base font-semibold text-highlighted">
                  <UIcon name="i-lucide-globe" class="size-5 text-primary" />
                  {{ demo.name }}
                </h3>
                <UBadge label="Live" color="primary" variant="soft" size="sm" icon="i-lucide-radio" />
              </div>
              <p class="text-toned">
                {{ demo.description }}
              </p>
              <div v-if="demo.tags?.length" class="flex flex-wrap gap-1.5">
                <UBadge
                  v-for="tag in demo.tags"
                  :key="tag"
                  :label="tag"
                  color="neutral"
                  variant="soft"
                  size="sm"
                />
              </div>
            </div>
          </template>

          <template #footer>
            <div class="flex items-center gap-2 px-4 pt-4 pb-4 sm:px-6 sm:pb-5">
              <UButton
                label="Visit site"
                trailing-icon="i-lucide-arrow-up-right"
                color="primary"
                size="sm"
                tabindex="-1"
                aria-hidden="true"
              />
              <!-- Raised above the card's full-size link overlay so it stays clickable -->
              <UButton
                v-if="demo.repo"
                :to="demo.repo"
                target="_blank"
                rel="noopener noreferrer"
                label="Source"
                icon="i-lucide-square-code"
                color="neutral"
                variant="outline"
                size="sm"
                class="relative z-[1]"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
      </div>
    </UPageSection>

    <UContainer v-if="showDemos">
      <h2 class="mb-8 text-xl font-semibold text-highlighted">
        Repositories
      </h2>
    </UContainer>

    <UPageSection v-if="pending" :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0' }">
      <UPageGrid>
        <UPageCard
          v-for="n in 6"
          :key="n"
          variant="subtle"
          :ui="{ root: 'bg-default/90 backdrop-blur-md' }"
        >
          <div class="space-y-3">
            <USkeleton class="h-5 w-1/3" />
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-2/3" />
            <div class="flex gap-2 pt-2">
              <USkeleton class="h-5 w-16" />
              <USkeleton class="h-5 w-20" />
            </div>
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
        title="Unable to load repositories"
        description="The repository list could not be fetched right now."
        :actions="[{
          label: 'Retry',
          color: 'error',
          variant: 'outline',
          icon: 'i-lucide-refresh-cw',
          onClick: () => refresh()
        }]"
      />
    </UPageSection>

    <UPageSection v-else-if="repos?.length" :ui="{ container: 'pt-0 sm:pt-0 lg:pt-0' }">
      <UPageGrid>
        <UPageCard
          v-for="repo in repos"
          :key="repo.name"
          :title="repo.full_name || repo.name"
          :to="repo.html_url"
          target="_blank"
          icon="i-lucide-square-code"
          variant="subtle"
          :ui="{
            root: 'bg-default/90 backdrop-blur-md transition-colors hover:ring-primary/50',
            title: 'font-mono text-[15px]',
            description: 'text-toned',
            footer: 'w-full'
          }"
        >
          <template #title>
            <span v-if="repo.full_name" class="font-normal text-muted">{{ repo.full_name.split('/')[0] }}/</span>{{ repo.name }}
          </template>

          <template #description>
            <p>{{ repo.description }}</p>
            <div v-if="repo.topics?.length" class="mt-3 flex flex-wrap gap-1.5">
              <UBadge
                v-for="topic in repo.topics"
                :key="topic"
                :label="topic"
                color="neutral"
                variant="soft"
                size="sm"
              />
            </div>
          </template>

          <template #footer>
            <div class="flex items-center justify-between gap-3 border-t border-default pt-4 text-sm text-muted">
              <div class="flex flex-wrap items-center gap-x-4 gap-y-1">
                <span v-if="repo.language" class="inline-flex items-center gap-1.5">
                  <UIcon name="i-lucide-code" class="size-4" />
                  {{ repo.language }}
                </span>
                <span v-if="repo.stargazers_count" class="inline-flex items-center gap-1.5">
                  <UIcon name="i-lucide-star" class="size-4" />
                  {{ repo.stargazers_count }}
                </span>
                <span v-if="repo.updated_at" class="inline-flex items-center gap-1.5">
                  <UIcon name="i-lucide-history" class="size-4" />
                  <span>Updated <NuxtTime :datetime="repo.updated_at" relative title /></span>
                </span>
              </div>

              <!-- Raised above the card's full-size link overlay so it stays clickable -->
              <UButton
                v-if="repo.homepage"
                :to="repo.homepage"
                target="_blank"
                rel="noopener noreferrer"
                label="Website"
                trailing-icon="i-lucide-arrow-up-right"
                color="neutral"
                variant="outline"
                size="xs"
                class="relative z-[1] shrink-0"
              />
            </div>
          </template>
        </UPageCard>
      </UPageGrid>
    </UPageSection>

    <UPageSection v-else>
      <UEmpty
        icon="i-lucide-folder-open"
        title="No repositories found"
        variant="subtle"
      />
    </UPageSection>
  </UPage>
</template>

<script setup lang="ts">
import { demos } from '~/data/demos'

// Live demos section is disabled for now; set to true to show it
const showDemos = false

const { data: repos, pending, error, refresh } = await useFetch('/api/github/repos')

const hostname = (url: string) => new URL(url).hostname
</script>
