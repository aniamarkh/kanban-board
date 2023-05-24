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

export interface ModalData extends Board, Task {}

export interface TaskFormState {
  task: Task;
  statusColumnId: string;
  isTitleError: boolean;
}

export interface BoardFormState {
  board: Board;
  isTitleError: boolean;
}
