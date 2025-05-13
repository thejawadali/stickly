export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  console.log(body)
  const _id = event.context.params?._id
  console.log(_id)
  const note = await NoteSchema.findOne({ _id })
  if (!note) {
    return createError({
      statusCode: 404,
      statusMessage: 'Note not found',
    })
  }
  return await NoteSchema.findOneAndUpdate({ _id }, body)
})
