<template>
  <b-container id="app">
    <mvidio />
    <navigation />
    <b-container class="main">
      <router-view />
      <footer>
        <p>&copy; 2020 Mindfield (Build: {{ build }})</p>
      </footer>
    </b-container>
  </b-container>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Video from "./components/Video.vue";
export default {
  components: {
    navigation: Navigation,
    mvidio: Video
  },
  data() {
    return {
      build: process.env.VUE_APP_VERSION
    };
  }
};
</script>

<style>
body {
  padding-top: 3rem;
  padding-bottom: 3rem;
  color: #5a5a5a;
}

.main {
  background-color: #ffffff;
}

.marketing {
  margin-top: 4rem;
}

.marketing .col-lg-4 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.marketing h2 {
  font-weight: normal;
}

.marketing .col-lg-4 p {
  margin-right: 0.75rem;
  margin-left: 0.75rem;
}
</style>
