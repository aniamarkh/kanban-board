import { defineStore } from 'pinia';
import { initBoard } from '@/assets/initBoard';
import type { Board, Column, Subtask, Task } from '../types/types';

export const useBoardStore = defineStore('board', {
  state(): { board: Board } {
    const savedState = localStorage.getItem('board');
    return savedState ? { board: JSON.parse(savedState) } : { board: initBoard };
  },

  actions: {
    addTask({ targetColumnId, newTask }: { targetColumnId: string; newTask: Task }) {
      const targetColumn = this.getColumnById(targetColumnId);
      if (targetColumn) {
        targetColumn.tasks.push(newTask);
        this.saveToLocalStore();
      }
    },

    moveTask({ taskId, targetColumnId }: { taskId: string; targetColumnId: string }) {
      const task: Task = { ...(this.getTask(taskId) as Task) };
      this.deleteTask(taskId);
      const targetColumn = this.getColumnById(targetColumnId);
      if (task && targetColumn) {
        targetColumn.tasks.push(task);
        this.saveToLocalStore();
      }
    },

    deleteTask(taskId: string) {
      const column = this.getColumnForTask(taskId);
      if (column) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        column.tasks.splice(taskIndex, 1)[0];
      }
      this.saveToLocalStore();
    },

    editTask({
      taskId,
      taskObj,
      targetColumnId,
    }: {
      taskId: string;
      taskObj: Task;
      targetColumnId: string;
    }) {
      const column = this.getColumnForTask(taskId);
      if (column) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        column.tasks[taskIndex] = taskObj;
        if (targetColumnId !== column.id) {
          this.moveTask({ taskId, targetColumnId });
        }
        this.saveToLocalStore();
      }
    },

    saveToLocalStore() {
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
