const board = {
  title: 'Mock title',
  columns: [
    {
      id: 'col1',
      title: 'Column 1',
      tasks: [
        {
          id: '1',
          title: 'Task 1',
          desc: 'Description 1',
          subtasks: [
            {
              id: 'sub2',
              title: 'Subtask 2',
              done: false,
            },
          ],
        },
      ],
    },
    {
      id: 'col2',
      title: 'Column 2',
      tasks: [
        {
          id: '2',
          title: 'Task 2',
          desc: 'Description 2',
          subtasks: [
            {
              id: 'sub2',
              title: 'Subtask 2',
              done: true,
            },
          ],
        },
      ],
    },
  ],
};

export default board;
