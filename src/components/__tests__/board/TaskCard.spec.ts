import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '../mocks';
import TaskCard from '@/components/board/TaskCard.vue';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import type { Task } from '@/types/types';
import TaskViewModal from '@/components/modals/TaskViewModal.vue';

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Task Card tests', () => {
  let wrapper: VueWrapper;
  let task: Task;

  beforeEach(() => {
    boardStore.board = mockBoard;
    task = boardStore.getColumnById('col1')?.tasks[0] as Task;
    wrapper = mount(TaskCard, {
      props: {
        task: task,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Task 1');
    expect(wrapper.text()).toContain(`0 of ${task.subtasks.length} subtasks done`);
  });

  it('opens task view modal on click', async () => {
    await wrapper.find('.task__wrapper').trigger('click');
    expect(modalsStore.getModalData).toBe(task);
    expect(modalsStore.getModalsStore).toBe(TaskViewModal);
  });

  it('renders correctly when no subtasks', () => {
    wrapper = mount(TaskCard, {
      props: {
        task: {
          id: '2',
          title: 'Task 2',
          desc: 'Description 2',
          subtasks: [],
        },
      },
    });

    expect(wrapper.find('.task__subtask').exists()).toBe(false);
  });
});
