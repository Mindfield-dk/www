<template>
    <ul>
        <li v-for="p in person" v-bind:key="p.name">{{ p.name }}</li>
    </ul>
</template>
  
<script setup lang="ts">
defineProps<{
  person?: {name: string}[]
}>()
</script>
  
<style lang="css" scoped></style>