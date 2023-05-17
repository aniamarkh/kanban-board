export interface Subtask {
  id: string;
  title: string;
  done: boolean;
}

export interface Task {
  id: string;
  title: string;
  desc: string;
  subtasks: Subtask[];
}

export interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

export interface Board {
  title: string;
  columns: Column[];
}

export interface FormState {
  task: Task;
  statusColumnId: string;
  isTitleError: boolean;
}
