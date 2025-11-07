<template>
  <div class="min-h-screen">
    <MainNavigation />
    
    <UContainer class="py-8 sm:py-12">
      <!-- Header Section with backdrop -->
      <div class="mb-10 text-center">
        <div class="inline-block bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
          <h1 class="text-4xl sm:text-5xl font-bold text-[#000000] dark:!text-white mb-3">
            Our Projects
          </h1>
          <p class="text-lg text-gray-800 dark:text-gray-100 max-w-2xl">
            Explore our open source repositories and contributions
          </p>
        </div>
      </div>

      <!-- Repository Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <UCard
          v-for="repo in repos"
          :key="repo?.name"
          class="hover:shadow-2xl transition-all duration-200 hover:scale-[1.02] bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm"
        >
          <template #header>
            <div class="flex items-start justify-between gap-3">
              <h3 class="text-xl font-bold text-[#000000] dark:!text-white truncate">
                {{ ucfirst(repo?.name) }}
              </h3>
              <UIcon 
                name="i-heroicons-code-bracket-square" 
                class="w-6 h-6 text-primary-600 dark:text-primary-400 flex-shrink-0"
              />
            </div>
          </template>

          <div class="space-y-4">
            <!-- Description -->
            <p class="text-gray-800 dark:text-gray-100 text-sm leading-relaxed line-clamp-3 min-h-[3.75rem]">
              {{ repo?.description || 'No description available' }}
            </p>

            <!-- Topics/Tags -->
            <div v-if="repo?.topics?.length" class="flex flex-wrap gap-2">
              <UBadge
                v-for="topic in repo.topics"
                :key="topic"
                color="primary"
                variant="solid"
                size="xs"
                class="font-medium"
              >
                {{ topic }}
              </UBadge>
            </div>

            <!-- Dates -->
            <div class="flex items-center justify-between text-xs text-gray-700 dark:text-gray-200 pt-3 border-t border-gray-300 dark:border-gray-600">
              <div class="flex items-center gap-1.5">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                <span class="font-semibold">Created: {{ formatDate(repo.created_at as string) }}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <UIcon name="i-heroicons-arrow-path" class="w-4 h-4" />
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
                variant="solid"
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
                variant="solid"
                size="sm"
                icon="i-heroicons-arrow-top-right-on-square"
                class="flex-1"
              >
                Website
              </UButton>
            </div>
          </template>
        </UCard>
      </div>

      <!-- Empty State -->
      <div v-if="!repos || repos.length === 0" class="text-center py-16">
        <div class="inline-block bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm px-8 py-6 rounded-2xl shadow-lg">
          <UIcon name="i-heroicons-folder-open" class="w-20 h-20 mx-auto text-gray-600 dark:text-gray-300 mb-4" />
          <p class="text-lg text-gray-900 dark:text-white font-semibold">No repositories found</p>
        </div>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
const { data: repos } = await useFetch('/api/github/repos')

/**
 * Capitalizes the first letter of a string.
 *
 * @param {string} str - The input string.
 * @return {string} The input string with the first letter capitalized.
 */
function ucfirst(str: string): string {
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
function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear());

  return `${day}/${month}-${year}`;
}
</script>

