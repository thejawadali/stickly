export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  return await new NoteSchema({
    ...body,
  }).save()
})