import { openDB } from 'idb'

// Database configuration
const dbName = 'sticky_notes_db'
const storeName = 'notes'

// Initialize the database
export async function initDB() {
  return openDB(dbName, 1, {
    upgrade(db) {
      // Create the object store with key 'id'
      db.createObjectStore(storeName, { keyPath: 'id', autoIncrement: true })
    },
  })
}

// Create a note
export async function createNote(note: Note) {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  await store.add(note)
  await tx.done
}

// Read all notes
export async function fetchNotes(): Promise<Note[]> {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readonly')
  const store = tx.objectStore(storeName)
  const notes = await store.getAll()
  await tx.done
  return notes
}

// Update a note by ID
export async function updateNote(id: number, updatedNote: Note) {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  const existingNote = await store.get(id)
  if (existingNote) {
    const note = { ...existingNote, ...updatedNote, id }
    await store.put(note)
  }
  await tx.done
}

// Delete a note
export async function deleteNote(id: number) {
  const db = await initDB()
  const tx = db.transaction(storeName, 'readwrite')
  const store = tx.objectStore(storeName)
  await store.delete(id)
  await tx.done
}
