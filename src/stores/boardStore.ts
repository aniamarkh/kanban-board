import { defineStore } from 'pinia'
import type { Board, Column } from '../types/types';

export const useBoardStore = defineStore('board', {
  state() {
    return {
      board: {
        title: 'Example Kanban Board',
        columns: [
          {
            id: 1,
            title: 'To Do',
            cards: [
              {
                id: 0,
                title: 'First Card',
                desc: 'Cards desc',
                subtasks: [{
                  title: 'Do this',
                  done: false,
                },
                {
                  title: 'Do that',
                  done: true,
                }],
              },
            ],
          },
          {
            id: 2,
            title: 'In Progress',
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
            title: 'Done',
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