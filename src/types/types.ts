export interface Subtask {
  id: number
  title: string
  done: boolean
}

export interface Task {
  id: number
  title: string
  desc: string
  subtasks: Subtask[]
}

export interface Column {
  id: number
  title: string
  tasks: Task[]
}

export interface Board {
  title: string
  columns: Column[]
}