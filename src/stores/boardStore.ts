import { defineStore } from 'pinia';
import { initBoard } from '@/assets/initBoard';
import type { Board, Column, Task } from '../types/types';

export const useBoardStore = defineStore('board', {
  state(): { board: Board } {
    const savedState = localStorage.getItem('board');
    return savedState ? JSON.parse(savedState) : { board: initBoard };
  },

  actions: {
    addTask({ targetColumnId, newTask }: { targetColumnId: string; newTask: Task }) {
      const targetColumn = this.getColumnById(targetColumnId);
      if (!targetColumn) return;
      targetColumn.tasks.push(newTask);
    },

    moveTask({ taskId, targetColumnId }: { taskId: string; targetColumnId: string }) {
      const task: Task = { ...(this.getTaskById(taskId) as Task) };
      this.deleteTask(taskId);
      const targetColumn = this.getColumnById(targetColumnId);
      if (task && targetColumn) targetColumn.tasks.push(task);
    },

    deleteTask(taskId: string) {
      const column = this.getColumnForTask(taskId);
      if (!column) return;
      const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
      column.tasks.splice(taskIndex, 1)[0];
    },

    editTask({ taskObj, targetColumnId }: { taskObj: Task; targetColumnId: string }) {
      const column = this.getColumnForTask(taskObj.id);
      if (!column) return;
      const taskIndex = column.tasks.findIndex((task) => task.id === taskObj.id);
      column.tasks[taskIndex] = taskObj;
      if (targetColumnId !== column.id) this.moveTask({ taskId: taskObj.id, targetColumnId });
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

    getTaskById() {
      return (id: string): Task | undefined => {
        const column = this.getColumnForTask(id);
        if (!column) return;
        return column.tasks.find((task) => task.id === id);
      };
    },
  },
});
