<template>
  <div class="min-h-screen">
    <MainNavigation />

    <UContainer class="py-8 sm:py-12">
      <!-- Header Section with backdrop -->
      <div class="mb-10 text-center">
        <div class="inline-block bg-elevated/95 backdrop-blur-sm px-8 py-6 rounded-lg shadow-lg ring ring-default">
          <h1 class="text-4xl sm:text-5xl font-bold text-highlighted mb-3">
            Our Projects
          </h1>
          <p class="text-lg text-toned max-w-2xl">
            Explore our open source repositories and contributions
          </p>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="pending" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="index in 6"
          :key="index"
          variant="subtle"
          class="backdrop-blur-sm"
        >
          <template #header>
            <USkeleton class="h-7 w-2/3" />
          </template>

          <div class="space-y-4">
            <USkeleton class="h-4 w-full" />
            <USkeleton class="h-4 w-5/6" />
            <USkeleton class="h-4 w-1/2" />
          </div>

          <template #footer>
            <USkeleton class="h-8 w-full" />
          </template>
        </UCard>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="text-center py-16">
        <UAlert
          color="error"
          variant="soft"
          orientation="vertical"
          icon="i-lucide-triangle-alert"
          title="Unable to load repositories"
          description="The repository list could not be fetched right now."
          class="mx-auto max-w-md text-start"
          :actions="[{
            label: 'Retry',
            color: 'error',
            variant: 'outline',
            icon: 'i-lucide-refresh-cw',
            onClick: () => refresh()
          }]"
        />
      </div>

      <!-- Repository Grid -->
      <div v-else-if="repos?.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="repo in repos"
          :key="repo?.name"
          variant="subtle"
          class="hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] backdrop-blur-sm"
        >
          <template #header>
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-xl font-bold text-highlighted truncate">
                {{ ucfirst(repo?.name) }}
              </h3>
              <UIcon
                name="i-lucide-square-code"
                class="size-6 text-primary flex-shrink-0"
              />
            </div>
          </template>

          <div class="space-y-4">
            <!-- Description -->
            <p class="text-toned text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]">
              {{ repo?.description || 'No description available' }}
            </p>

            <!-- Topics/Tags -->
            <div v-if="repo?.topics?.length" class="flex flex-wrap gap-2">
              <UBadge
                v-for="topic in repo.topics"
                :key="topic"
                color="primary"
                variant="soft"
                size="xs"
                class="font-medium"
              >
                {{ topic }}
              </UBadge>
            </div>

            <!-- Dates -->
            <div class="flex items-center justify-between text-xs text-muted pt-3 border-t border-muted">
              <div class="flex items-center gap-1.5">
                <UIcon name="i-lucide-calendar" class="size-4" />
                <span class="font-semibold">Created: {{ formatDate(repo.created_at as string) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <UIcon name="i-lucide-refresh-cw" class="size-4" />
                <span class="font-semibold">{{ formatDate(repo.updated_at as string) }}</span>
              </div>
            </div>
          </div>

          <template #footer>
            <div class="flex items-center gap-2">
              <UButton
                v-if="repo.html_url"
                :to="repo.html_url"
                target="_blank"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-simple-icons-github"
                class="flex-1"
              >
                GitHub
              </UButton>
              <UButton
                v-if="repo.homepage"
                :to="repo.homepage"
                target="_blank"
                color="neutral"
                variant="outline"
                size="sm"
                icon="i-lucide-external-link"
                class="flex-1"
              >
                Website
              </UButton>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Empty State -->
      <div v-else class="text-center py-16">
        <UEmpty
          icon="i-lucide-folder-open"
          title="No repositories found"
          variant="subtle"
          class="mx-auto max-w-md backdrop-blur-sm"
        />
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
interface RepositorySummary {
  name: string
  description: string | null
  topics: string[]
  created_at: string | null
  updated_at: string | null
  html_url: string
  homepage: string | null
}

const { data: repos, pending, error, refresh } = await useFetch<RepositorySummary[]>('/api/github/repos')

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @return {string} The input string with the first letter capitalized.
 */
function ucfirst(str = ''): string {
  if (str.length === 0) {
    return str; // If the string is empty, return it as is
  } else {
    return str.charAt(0).toUpperCase() + str.slice(1); // Capitalize first letter and concatenate the rest of the string
  }
}

/**
 * Formats a given date into a specific format.
 *
 * @param {string} inputDate - The input date to be formatted.
 * @return {string} The formatted date in the format "DD/MM-YYYY".
 */
function formatDate(inputDate?: string | null): string {
  if (!inputDate) {
    return 'Unknown';
  }

  const date = new Date(inputDate);

  if (Number.isNaN(date.getTime())) {
    return 'Unknown';
  }

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear());

  return `${day}/${month}-${year}`;
}
</script>
