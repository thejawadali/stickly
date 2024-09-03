<script setup lang="ts">
import { createNote, deleteNote, fetchNotes } from '../utils/indexedDb.js'
import type { Note } from '../types.ts'

const notes = ref<Note[]>([])
async function createNewNote() {
  const nn: Note = {
    body: '',
    title: 'New Note',
    color: 'yellow',
    pos_x: 40,
    pos_y: 40,
  }
  await createNote(nn)
  notes.value = await fetchNotes()
}

onMounted(async () => {
  notes.value = await fetchNotes()
})

function _deleteNote(id: number) {
  deleteNote(id)
  notes.value = notes.value.filter(note => note.id !== id)
}
</script>

<template>
  <div>
    <UButton icon="i-carbon:add-large" size="xl" color="primary" square class="absolute left-1 top-1" variant="link" @click="createNewNote" />
    <div class="overflow-auto p-40">
      <Card v-for="card in notes" :key="card.id" :card-data="card" @delete="_deleteNote" />
    </div>
  </div>
</template>
