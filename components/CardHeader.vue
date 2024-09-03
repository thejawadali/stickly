<script setup lang="ts">
const emit = defineEmits<{
  (e: 'delete'): void
}>()

const title = defineModel('title', {
  default: 'Add Title',
})
</script>

<template>
  <div :style="`background-color: ${'#AFDA9F'};`" class="grid grid-cols-2 p-1.5">
    <!-- title -->
    <div class="cols-1">
      <input v-model="title" type="text" class="font-base h-5 bg-transparent text-sm outline-none">
    </div>

    <div class="cols-1 flex justify-end">
      <div i-carbon:trash-can @click="emit('delete')" />
    </div>
  </div>
</template>

<style scoped>

</style>
