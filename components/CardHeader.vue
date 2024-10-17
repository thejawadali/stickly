<script setup lang="ts">
import { colorOptions } from '../utils/colorOptions.js'
import type { ColorKey } from '~/types/types'

const emit = defineEmits<{
  (e: 'delete'): void
}>()

const title = defineModel('title', {
  default: 'Add Title',
})

const selectedColor = defineModel('color', {
  default: 'yellow',
})

const items = [
  [{
    color: '#FEF49C',
    value: 'yellow',
    border: '#DCC506',
    click: () => {
      selectedColor.value = 'yellow'
    },
  }],
  [{
    color: '#B2FFA0',
    value: 'green',
    border: '#51BB52',
    click: () => {
      selectedColor.value = 'green'
    },
  }],
  [{
    color: '#ADF4FF',
    value: 'blue',
    border: '#21D0E9',
    click: () => {
      selectedColor.value = 'blue'
    },
  }],
  [{
    color: '#eee',
    value: 'gray',
    border: '#A8A8A8',
    click: () => {
      selectedColor.value = 'gray'
    },
  }],
  [{
    color: '#FFC7C7',
    value: 'pink',
    border: '#F88080',
    click: () => {
      selectedColor.value = 'pink'
    },
  }],
  [{
    color: '#B6CAFF',
    value: 'purple',
    border: '#7D9BEC',
    click: () => {
      selectedColor.value = 'purple'
    },
  }],
]

const selectedColorOption = computed(() => {
  return colorOptions[selectedColor.value as ColorKey]
})
</script>

<template>
  <div :style="`background-color: ${selectedColorOption.header};`" class="grid grid-cols-2 p-1.5">
    <!-- title -->
    <div class="cols-1">
      <input v-model="title" type="text" class="font-base h-5 bg-transparent text-sm outline-none">
    </div>

    <div class="cols-1 flex justify-end gap-x-2">
      <UDropdown v-model="selectedColor" :items="items" :popper="{ placement: 'bottom-start' }">
        <div i-carbon-color-palette class="h-5 w-5" :style="`color: ${selectedColorOption.border};`" />
        <template #item="{ item }">
          <div class="flex items-center gap-x-2" @click="item.click">
            <span class="h-3 w-3 rounded-full" :style="`background-color: ${item.color};`" />
            <span class="truncate capitalize">{{ item.value }}</span>
          </div>
        </template>
      </UDropdown>
      <div i-carbon:trash-can :style="`color: ${selectedColorOption.border};`" @click="emit('delete')" />
    </div>
  </div>
</template>

<style scoped>

</style>
