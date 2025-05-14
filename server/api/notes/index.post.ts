import { Note } from "~~/server/models/note.schema";
// import { z } from 'zod';
import type { H3Event } from 'h3';
import * as yup from 'yup';

const bodySchema = yup.object({
  title: yup.string().required('Title is required'),
  pos_x: yup.number().optional(),
  pos_y: yup.number().optional(),
  color: yup.string().optional(),
  body: yup.string().optional(),
});

export default defineEventHandler(async (event: H3Event) => {
  const body = await readBody(event)

  try {
    // Validate request body against the schema
    const validatedData = await bodySchema.validate(body, { abortEarly: false });

    return await new Note({
      ...validatedData,
    }).save()
  } catch (validationError: any) {
    return createError({
      statusCode: 400,
      statusMessage: "Validation error",
      message: validationError.errors[0]
    })
  }
})