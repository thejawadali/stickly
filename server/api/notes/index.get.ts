import { Note } from '~~/server/models/note.schema'

export default defineEventHandler(async () => {
  return await Note.find({})
})
