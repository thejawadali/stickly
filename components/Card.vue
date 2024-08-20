<script setup lang="ts">
import { deleteNote, updateNote } from '../utils/indexedDb.js'

export interface INote {
  id: number
  body: string
  header_color: string
  body_color: string
  text_color: string
  pos_x: number
  pos_y: number
}

const props = defineProps<{
  cardData: INote
}>()

const bodyText = ref(props.cardData.body)
const textarea = ref()
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
  },
})

function autoGrow() {
  if (textarea.value) {
    textarea.value.textarea.style.height = 'auto'
    textarea.value.textarea.style.height = `${textarea.value.textarea.scrollHeight}px`
  }
}

watchDebounced(
  bodyText,
  update,
  { debounce: 500, maxWait: 1000 },
)

onMounted(autoGrow)

async function update() {
  await updateNote(props.cardData.id, {
    ...props.cardData,
    body: bodyText.value,
    pos_x: x.value,
    pos_y: y.value,
  })
}
</script>

<template>
  <div
    ref="cardElem" :style="`background-color: ${cardData.body_color}; color: ${cardData.text_color};
    ${style} z-index: ${zIndex};`"
    class="absolute w-[400px] cursor-pointer overflow-hidden rounded-md bg-green shadow"
  >
    <!-- header -->
    <div :style="`background-color: ${cardData.header_color};`" class="flex items-center justify-between p-1.5">
      <!-- <div i-material-symbols:delete text-4xl /> -->
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24" width="24" height="24" stroke="#000000" fill="none" strokeWidth="1.5"
        @click="deleteNote(cardData.id)"
      >
        <path
          d="m6 8 .668 8.681c.148 1.924.222 2.885.84 3.423.068.06.14.115.217.165.685.449 1.63.26 3.522-.118.36-.072.54-.108.721-.111h.064c.182.003.361.039.72.11 1.892.379 2.838.568 3.523.12.076-.05.15-.106.218-.166.617-.538.691-1.5.84-3.423L18 8"
        />
        <path
          strokeLinecap="round"
          d="m10.151 12.5.245 3.492M13.849 12.5l-.245 3.492M4 8s4.851 1 8 1 8-1 8-1M8 5l.447-.894A2 2 0 0 1 10.237 3h3.527a2 2 0 0 1 1.789 1.106L16 5"
        />
      </svg>
    </div>
    <UTextarea ref="textarea" v-model="bodyText" variant="none" class="w-full [&_textarea]:max-h-[200px]" @input="autoGrow" />
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
