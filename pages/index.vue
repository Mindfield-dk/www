<template>
  <div>
    <MainNavigation />
    <!--
<PersonList :person="person" />
-->

    <div class="container">
      <div class="list-group col-sm-12">
        <span v-for="repo in repos" v-bind:key="repo?.name" class="list-group-item list-group-item-action"
          aria-current="true">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">
              <h3>{{ ucfirst(repo?.name) }}</h3>
            </h5>
            <small><span v-for="topic in repo?.topics" v-bind:key="topic" class="m-1 badge bg-secondary">{{ topic
            }}</span></small>
          </div>

          <div class="d-flex w-100 justify-content-between">
            <h6 class="mb-1">
              Created: {{ formatDate(repo.created_at as string) }}
            </h6>
            <h6 class="mb-1">
              Updated: {{ formatDate(repo.updated_at as string) }}
            </h6>
          </div>
          <p class="mb-1">{{ repo?.description }}</p>
          <span><a v-if="repo.html_url" :href="repo?.html_url"><i class="bi bi-github"></i>Github</a>
            <span v-if="repo.homepage"> | </span>
            <a v-if="repo.homepage" :href="repo?.homepage"><i class="bi bi-link-45deg"></i>Homepage</a></span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const repos = (await useFetch(() => '/api/github/repos')).data.value
// const person = (await useFetch(() => '/api/sanity/person')).data.value

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

function formatDate(inputDate: string): string {
  const date = new Date(inputDate);

  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear());

  return `${day}/${month} ${year}`;
}
</script>

<style lang="css" scoped>  .container {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
    text-align: center;
  }

  h1 {
    font-size: 48px;
    margin-bottom: 20px;
    color: #333333;
  }

  p {
    font-size: 18px;
    margin-bottom: 40px;
    color: #666666;
  }

  .btn {
    font-size: 20px;
    border-radius: 4px;
    transition: background-color 0.3s;
  }


  .btn-primary {
    background-color: #007bff;
    color: #ffffff;
    border: none;
  }

  .btn-primary:hover {
    background-color: #0056b3;
  }
</style>