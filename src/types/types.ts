export interface Subtask {
  title: string
  done: boolean
}

export interface Card {
  id: number
  title: string
  desc: string
  subtasks: Subtask[]
}

export interface Column {
  id: number
  title: string
  cards: Card[]
}

export interface Board {
  title: string
  desc: string
  columns: Column[]
}