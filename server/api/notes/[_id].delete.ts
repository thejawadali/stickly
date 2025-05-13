export default defineEventHandler(async (event) => {
  const _id = event.context.params?._id
  const note = await NoteSchema.findOne({ _id })
  if (!note) {
    return createError({
      statusCode: 404,
      statusMessage: 'Note not found',
    })
  }
  return await NoteSchema.findOneAndDelete({ _id })
})
