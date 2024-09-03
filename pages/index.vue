<script setup lang="ts">
import { createNote, fetchNotes } from '../utils/indexedDb.js'
import type { Note } from '../types.ts'

const notes = ref<Note[]>([])
async function createNewNote() {
  const nn: Note = {
    body: '',
    title: 'New Note',
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
