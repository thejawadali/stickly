
export default defineEventHandler(async () => {
  return await NoteSchema.find({})
})
