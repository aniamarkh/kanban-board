export interface Subtask {
  title: string;
  done: boolean;
}

export interface Card {
  id: number;
  title: string;
  desc: string;
  subtasks: Subtask[];
}

export interface Column {
  id: number;
  name: string;
  cards: Card[];
}

export interface Board {
  title: string;
  desc: string;
  columns: Column[];
}

export interface ButtonProps {
  type: 'primary' | 'secondary'
};