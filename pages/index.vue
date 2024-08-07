<script setup lang="ts">
const { data } = await useFetch('/api/fake-json')
</script>

<template>
  <div class="overflow-auto p-40">
    <Card v-for="card in data" :key="card.id" :card-data="card" />
  </div>
</template>
