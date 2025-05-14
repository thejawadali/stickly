import { Note } from "~~/server/models/note.schema";

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await new Note({
    ...body,
  }).save()
})