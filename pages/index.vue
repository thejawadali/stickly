<script setup lang="ts">
import type { Note } from '~/types/types'

const { execute: createNewNote } = useFetch('/api/notes', {
  method: 'POST',
  immediate: false,
  body: {
    title: 'Untitled',
    body: '',
    color: 'yellow',
    pos_x: 40,
    pos_y: 40,
  },
  onResponse() {
    refresh()
  }
})


const { data: notes, refresh } = useFetch<Note[]>('/api/notes', {
  method: 'get',
})



async function deleteNote(id: any) {
  await $fetch(`/api/notes/${id}`, {
    method: 'DELETE',
  })
  refresh()
}

async function updateNote(id: any, note: Note) {
  await $fetch(`/api/notes/${id}`, {
    method: 'PUT',
    body: note,
  })
  refresh()
}
</script>

<template>
  <div>
    <UButton icon="i-carbon:add-large" size="xl" color="primary" square class="absolute left-1 top-1" variant="link" @click="createNewNote" />
    <div class="overflow-auto p-40">
      <Card v-for="card in notes" :key="String(card._id)" :card-data="card" @delete="deleteNote(card._id)" @update="updateNote(card._id, $event)" />
    </div>
  </div>
</template>
