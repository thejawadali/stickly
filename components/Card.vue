<script setup lang="ts">
defineProps({
  cardData: {
    type: Object,
    default: null,
  },
})
</script>

<template>
  <div
    :style="`background-color: ${cardData.colors.colorBody}; color: ${cardData.colors.colorText}; position: absolute; top: ${cardData.position.y}px; left: ${cardData.position.x}px;`"
    class="w-[400px] cursor-pointer rounded-md shadow"
  >
    <p>{{ cardData.body }}</p>
  </div>
</template>

<style scoped>
.shadow {
  box-shadow:
    0 1px 1px hsl(0deg 0% 0% / 0.075),
    0 2px 2px hsl(0deg 0% 0% / 0.075),
    0 4px 4px hsl(0deg 0% 0% / 0.075),
    0 8px 8px hsl(0deg 0% 0% / 0.075),
    0 16px 16px hsl(0deg 0% 0% / 0.075);
}
</style>
