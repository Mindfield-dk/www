<template>
  <UPage>
    <UPageHero
      title="Our Projects"
      description="Explore our open source repositories and contributions"
    />

    <UPageSection
      v-if="pending"
      title="Loading repositories"
      description="Fetching the latest project information."
    >
      <UProgress animation="carousel" />
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

    <UPageSection v-else-if="repos?.length">
      <UPageGrid>
        <UPageCard
          v-for="repo in repos"
          :key="repo.name"
          :title="ucfirst(repo.name)"
          :description="repo.description || 'No description available'"
          icon="i-lucide-square-code"
          variant="subtle"
        >
          <template #footer>
            <UPageList divide>
              <UPageFeature
                v-if="repo.topics?.length"
                title="Topics"
                :description="repo.topics.join(', ')"
                icon="i-lucide-tags"
              />
              <UPageFeature
                title="Created"
                :description="formatDate(repo.created_at)"
                icon="i-lucide-calendar"
              />
              <UPageFeature
                title="Updated"
                :description="formatDate(repo.updated_at)"
                icon="i-lucide-refresh-cw"
              />
              <UPageFeature
                v-if="repo.html_url"
                :to="repo.html_url"
                target="_blank"
                icon="i-simple-icons-github"
                title="GitHub"
                description="View the source repository"
                rel="noopener noreferrer"
              />
              <UPageFeature
                v-if="repo.homepage"
                :to="repo.homepage"
                target="_blank"
                icon="i-lucide-external-link"
                title="Website"
                description="Open the project website"
                rel="noopener noreferrer"
              />
            </UPageList>
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
const { data: repos, pending, error, refresh } = await useFetch('/api/github/repos')

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
