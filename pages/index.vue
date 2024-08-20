<script setup lang="ts">
import { createNote, fetchNotes } from '../utils/indexedDb.js'

export interface INote {
  id?: number
  body: string
  header_color: string
  body_color: string
  text_color: string
  pos_x: number
  pos_y: number
}

const notes = ref<INote[]>([])
async function createNewNote() {
  const nn: INote = {
    body: '2new note from with indexed db',
    header_color: '#AFDA9F',
    body_color: '#BCDEAF',
    text_color: '#18181A',
    pos_x: 0,
    pos_y: 0,
  }
  await createNote(nn)
  notes.value = await fetchNotes()
}

onMounted(async () => {
  notes.value = await fetchNotes()
})
</script>

<template>
  <div>
    <button @click="createNewNote">
      add new
    </button>
    <div class="overflow-auto p-40">
      <Card v-for="card in notes" :key="card.id" :card-data="card" />
    </div>
  </div>
</template>
