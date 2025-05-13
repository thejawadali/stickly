<script setup lang="ts">
import { colorOptions } from '../utils/colorOptions.js'
import type { ColorKey, Note } from '~/types/types'

const props = defineProps<{
  cardData: Note
}>()
const emit = defineEmits<{
  (e: 'delete'): void,
  (e: 'update', note: Note): void
}>()
const bodyText = ref(props.cardData.body)
const title = ref(props.cardData.title)
const textarea = ref()
const color = ref<ColorKey>(props.cardData.color)
const cardElem = ref<HTMLElement | null>()

const { width: screenWidth, height: screenHeight } = useWindowSize()
const zIndex = ref(1)

const { style, x, y } = useDraggable(cardElem, {
  initialValue: { x: props.cardData.pos_x, y: props.cardData.pos_y },
  onMove: (position) => {
    const width = cardElem?.value?.clientWidth || 0
    const height = cardElem?.value?.clientHeight || 0
    position.x = Math.min(Math.max(position.x, 0), screenWidth.value - width)
    position.y = Math.min(Math.max(position.y, 0), screenHeight.value - height)
  },
  onStart: () => {
    zIndex.value = 2
  },
  onEnd: () => {
    zIndex.value = 1
    update()
    // // only change if the note has been moved
    // if (x.value !== props.cardData.pos_x || y.value !== props.cardData.pos_y) {
    // }
  },
})

function isModified() {
  return (
    title.value !== props.cardData.title ||
    bodyText.value !== props.cardData.body ||
    color.value !== props.cardData.color ||
    x.value !== props.cardData.pos_x ||
    y.value !== props.cardData.pos_y
  )
}

function autoGrow() {
  if (textarea.value) {
    textarea.value.textarea.style.height = 'auto'
    textarea.value.textarea.style.height = `${textarea.value.textarea.scrollHeight}px`
  }
}

watchDebounced(
  [bodyText, title, color],
  update,
  { debounce: 500, maxWait: 1000 },
)

onMounted(autoGrow)

async function update() {
  if (!isModified()) return
  emit('update', {
    ...props.cardData,
    title: title.value,
    body: bodyText.value,
    color: color.value,
    pos_x: x.value,
    pos_y: y.value,
  } )
}
</script>

<template>
  <div
    ref="cardElem" :style="`background-color: ${colorOptions[`${color}`].body};
    ${style} z-index: ${zIndex};`"
    class="absolute w-[400px] cursor-pointer overflow-hidden rounded-md bg-green text-black shadow"
  >
    <!-- header -->
    <CardHeader v-model:title="title" v-model:color="color" @delete="emit('delete')" />
    <UTextarea
      ref="textarea" v-model="bodyText" variant="none" class="w-full [&_textarea]:max-h-[200px]"
      @input="autoGrow"
    />
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
