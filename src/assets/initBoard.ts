export const initBoard = {
  title: 'Sample Kanban Board',
  columns: [
    {
      id: '1',
      title: 'To Do',
      tasks: [
        {
          id: '4',
          title: 'Implement Authentication',
          desc: 'Add user authentication for sign-up, login, and password reset functionality.',
          subtasks: [
            {
              id: '7',
              title: 'Integrate OAuth',
              done: false,
            },
            {
              id: '8',
              title: 'Create sign-up form',
              done: false,
            },
            {
              id: '9',
              title: 'Create login form',
              done: false,
            },
            {
              id: '14',
              title: 'Setup password reset functionality',
              done: false,
            },
            {
              id: '15',
              title: 'Test authentication flows',
              done: false,
            },
          ],
        },
        {
          id: '16',
          title: 'Database design',
          desc: 'Design the database schema and establish database connections.',
          subtasks: [
            {
              id: '17',
              title: 'Define database schema',
              done: false,
            },
            {
              id: '18',
              title: 'Setup DB connection',
              done: false,
            },
            {
              id: '19',
              title: 'Test DB connection',
              done: false,
            },
          ],
        },
      ],
    },
    {
      id: '2',
      title: 'In Progress',
      tasks: [
        {
          id: '28',
          title: 'Project Documentation',
          desc: 'Complete the project documentation including API usage, user guide, and developer notes.',
          subtasks: [
            {
              id: '29',
              title: 'Write API usage documentation',
              done: true,
            },
            {
              id: '30',
              title: 'Create user guide',
              done: true,
            },
            {
              id: '31',
              title: 'Complete developer notes',
              done: false,
            },
          ],
        },
        {
          id: '5',
          title: 'Design App Layout',
          desc: 'Create the user interface and overall design of the pet project app.',
          subtasks: [
            {
              id: '10',
              title: 'Choose color scheme',
              done: true,
            },
            {
              id: '11',
              title: 'Design app logo',
              done: false,
            },
            {
              id: '20',
              title: 'Design app navigation',
              done: false,
            },
            {
              id: '21',
              title: 'Develop UI components',
              done: false,
            },
          ],
        },
        {
          id: '24',
          title: 'API Integration',
          desc: 'Integrate the necessary APIs into the app.',
          subtasks: [
            {
              id: '25',
              title: 'Identify necessary APIs',
              done: false,
            },
            {
              id: '26',
              title: 'Create API requests',
              done: false,
            },
            {
              id: '27',
              title: 'Test API responses',
              done: false,
            },
          ],
        },
      ],
    },
    {
      id: '3',
      title: 'Done',
      tasks: [
        {
          id: '6',
          title: 'Set up Project Repository',
          desc: 'Initialize the repository, set up branches, and commit the initial project structure.',
          subtasks: [
            {
              id: '12',
              title: 'Create GitHub repo',
              done: true,
            },
            {
              id: '13',
              title: 'Commit initial project structure',
              done: true,
            },
            {
              id: '22',
              title: 'Setup CI/CD pipeline',
              done: true,
            },
            {
              id: '23',
              title: 'Write initial README',
              done: true,
            },
          ],
        },
      ],
    },
  ],
};
