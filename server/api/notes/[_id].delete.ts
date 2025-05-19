import { Note } from "~~/server/models/note.schema";

export default defineEventHandler(async (event) => {
  const _id = event.context.params?._id
  const note = await Note.findOne({ _id })
  if (!note) {
    return createError({
      statusCode: 404,
      statusMessage: 'Note not found',
    })
  }
  return await Note.findOneAndDelete({ _id })
})
