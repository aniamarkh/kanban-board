import { defineStore } from 'pinia'
import type { Board, Column } from '../types/types';

export const useBoardStore = defineStore('board', {
  state() {
    return {
      board: {
        title: 'Example Kanban Board',
        desc: 'It is a sample kanban board',
        columns: [
          {
            id: 1,
            name: 'To Do',
            cards: [
              {
                id: 0,
                title: 'First Card',
                desc: 'Cards desc',
                subtasks: [],
              },
            ],
          },
          {
            id: 2,
            name: 'In Progress',
            cards: [
              {
                id: 1,
                title: 'Second Card',
                desc: 'Cards desc',
                subtasks: [],
              },
            ],
          },
          {
            id: 3,
            name: 'Done',
            cards: [
              {
                id: 2,
                title: 'Third Card',
                desc: 'Cards desc',
                subtasks: [],
              },
            ],
          },
        ],
      },
    };
  },

  getters: {
    getBoard(): Board {
      return this.board;
    },
    getColumnById: (state) => (id: number): Column | undefined => {
      return state.board.columns.find((column) => column.id === id);
    },
  },
});