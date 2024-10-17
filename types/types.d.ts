export interface Note {
  id?: number
  title: string
  body: string
  color: ColorKey
  pos_x: number
  pos_y: number
}

export type ColorKey = 'gray' | 'yellow' | 'blue' | 'green' | 'pink' | 'purple'
