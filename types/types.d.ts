import type { ObjectId } from 'mongoose'

export interface Note {
  _id: ObjectId
  // user_id: ObjectId
  title: string
  body: string
  color: ColorKey
  pos_x: number
  pos_y: number
}

export type ColorKey = 'gray' | 'yellow' | 'blue' | 'green' | 'pink' | 'purple'
