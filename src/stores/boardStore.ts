import { defineStore } from 'pinia';
import type { Board, Column, Subtask, Task } from '../types/types';

export const useBoardStore = defineStore('board', {
  state(): { board: Board } {
    return {
      board: {
        title: 'Sample Kanban Board',
        columns: [
          {
            id: 1,
            title: 'To Do',
            tasks: [
              {
                id: 4,
                title: 'Implement Authentication',
                desc: 'Add user authentication for sign-up, login, and password reset functionality.',
                subtasks: [
                  {
                    id: 7,
                    title: 'Integrate OAuth',
                    done: false,
                  },
                  {
                    id: 8,
                    title: 'Create sign-up form',
                    done: false,
                  },
                  {
                    id: 9,
                    title: 'Create login form',
                    done: false,
                  },
                ],
              },
            ],
          },
          {
            id: 2,
            title: 'In Progress',
            tasks: [
              {
                id: 5,
                title: 'Design App Layout',
                desc: 'Create the user interface and overall design of the pet project app.',
                subtasks: [
                  {
                    id: 10,
                    title: 'Choose color scheme',
                    done: true,
                  },
                  {
                    id: 11,
                    title: 'Design app logo',
                    done: false,
                  },
                ],
              },
            ],
          },
          {
            id: 3,
            title: 'Done',
            tasks: [
              {
                id: 6,
                title: 'Set up Project Repository',
                desc: 'Initialize the repository, set up branches, and commit the initial project structure.',
                subtasks: [
                  {
                    id: 12,
                    title: 'Create GitHub repo',
                    done: true,
                  },
                  {
                    id: 13,
                    title: 'Commit initial project structure',
                    done: true,
                  },
                ],
              },
            ],
          },
        ],
      },
    };
  },

  actions: {
    addTask({ targetColumnId, newTask }: { targetColumnId: number; newTask: Task }) {
      const targetColumn = this.getColumnById(targetColumnId);
      if (targetColumn) targetColumn.tasks.push(newTask);
    },

    moveTask({ taskId, targetColumnId }: { taskId: number; targetColumnId: number }) {
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
      }
    },

    deleteTask(taskId: number) {
      for (const column of this.board.columns) {
        const taskIndex = column.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          column.tasks.splice(taskIndex, 1)[0];
          break;
        }
      }
    },
  },

  getters: {
    getBoard(): Board {
      return this.board;
    },

    getColumnById: (state: { board: Board }) => {
      return (id: number): Column | undefined =>
        state.board.columns.find((column) => column.id === id);
    },

    getColumnForTask(state: { board: Board }) {
      return (taskId: number): Column | undefined => {
        for (const column of state.board.columns) {
          const taskExists = column.tasks.some((task) => task.id === taskId);
          if (taskExists) return column;
        }
      };
    },

    getTask(state: { board: Board }) {
      return (id: number): Task | undefined => {
        for (const column of state.board.columns) {
          const task = column.tasks.find((task) => task.id === id);
          if (!task) continue;
          return task;
        }
      };
    },

    getSubtask() {
      return (taskId: number, subtaskId: number): Subtask | undefined => {
        const task = this.getTask(taskId);
        if (!task) return;
        return task.subtasks.find((subtask) => subtask.id === subtaskId);
      };
    },
  },
});
