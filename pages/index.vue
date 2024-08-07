<script setup lang="ts">
const { data } = await useFetch('/api/fake-json')
</script>

<template>
  <div>
    <Card v-for="card in data" :key="card.id" :card-data="card" />
    <!-- <pre>

      {{ data }}
    </pre> -->
  </div>
</template>
