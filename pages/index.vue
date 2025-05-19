<script setup lang="ts">
import type { Note } from '~/types/types'

definePageMeta({
  middleware: ['auth'],
})
const { data: notes, refresh } = useFetch<Note[]>('/api/notes', {
  method: 'get',
})

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
  },
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

async function signOut() {
  await authClient.signOut()
  navigateTo('/login')
}
</script>

<template>
  <div>
    <UButton con="i-carbon:add-large" size="xl" color="primary" square class="absolute left-2 top-2" label="Add Note" @click="createNewNote" />
    <div class="overflow-auto p-40">
      <Card v-for="card in notes" :key="String(card._id)" :card-data="card" @delete="deleteNote(card._id)" @update="updateNote(card._id, $event)" />
    </div>
    <UButton icon="i-lucide-log-out" size="md" color="primary" variant="solid" class="absolute bottom-2 right-2" @click="signOut" />
  </div>
</template>
