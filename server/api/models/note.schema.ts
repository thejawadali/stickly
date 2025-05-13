import { defineMongooseModel } from '#nuxt/mongoose'
import type { Note } from '~/types/types'

export const NoteSchema = defineMongooseModel<Note>({
  name: 'Note',
  schema: {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
    },
    color: {
      type: String,
      default: 'green',
    },
    pos_x: {
      type: Number,
      required: true,
    },
    pos_y: {
      type: Number,
      required: true,
    },
  },
  options: {
    timestamps: true,
  },
})
