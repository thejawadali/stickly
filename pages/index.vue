<script setup lang="ts">
import { createNote, deleteNote, fetchNotes } from '../utils/indexedDb.js'
import type { Note } from '../types.ts'

const notes = ref<Note[]>([])
async function createNewNote() {
  const nn: Note = {
    body: '',
    title: 'New Note',
    color: 'yellow',
    pos_x: 0,
    pos_y: 0,
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
    <button @click="createNewNote">
      add new
    </button>
    <div class="overflow-auto p-40">
      <Card v-for="card in notes" :key="card.id" :card-data="card" @delete="_deleteNote" />
    </div>
  </div>
</template>
