import type { Note as NoteType } from '~/types/types'
import { Schema, model } from "mongoose";


export const NoteSchema = new Schema<NoteType>({
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
  {
    timestamps: true,
  }
)



export const Note = model<NoteType>('Note', NoteSchema)
