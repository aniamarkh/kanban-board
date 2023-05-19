import { defineStore } from 'pinia';
import { initBoard } from '@/assets/initBoard';
import type { Board, Column, Subtask, Task } from '../types/types';

export const useBoardStore = defineStore('board', {
  state(): { board: Board } {
    const savedState = localStorage.getItem('board');
    if (savedState) {
      return {
        board: JSON.parse(savedState),
      };
    }
    return {
      board: initBoard,
    };
  },

  actions: {
    addTask({ targetColumnId, newTask }: { targetColumnId: string; newTask: Task }) {
      const targetColumn = this.getColumnById(targetColumnId);
      if (targetColumn) {
        targetColumn.tasks.push(newTask);
        this.saveState();
      }
    },

    moveTask({ taskId, targetColumnId }: { taskId: string; targetColumnId: string }) {
      let task;
      for (const column of this.board.columns) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          task = column.tasks.splice(taskIndex, 1)[0];
          break;
        }
      }
      const targetColumn = this.getColumnById(targetColumnId);
      if (task && targetColumn) {
        targetColumn.tasks.push(task);
        this.saveState();
      }
    },

    deleteTask(taskId: string) {
      for (const column of this.board.columns) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1)[0];
          break;
        }
      }
      this.saveState();
    },

    saveState() {
      localStorage.setItem('board', JSON.stringify(this.board));
    },
  },

  getters: {
    getBoard(): Board {
      return this.board;
    },

    getColumnById: (state: { board: Board }) => {
      return (id: string): Column | undefined =>
        state.board.columns.find((column) => column.id === id);
    },

    getColumnForTask(state: { board: Board }) {
      return (taskId: string): Column | undefined => {
        for (const column of state.board.columns) {
          const taskExists = column.tasks.some((task) => task.id === taskId);
          if (taskExists) return column;
        }
      };
    },

    getTask(state: { board: Board }) {
      return (id: string): Task | undefined => {
        for (const column of state.board.columns) {
          const task = column.tasks.find((task) => task.id === id);
          if (!task) continue;
          return task;
        }
      };
    },

    getSubtask() {
      return (taskId: string, subtaskId: string): Subtask | undefined => {
        const task = this.getTask(taskId);
        if (!task) return;
        return task.subtasks.find((subtask) => subtask.id === subtaskId);
      };
    },
  },
});
