import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import SubtaskCheckbox from '@/components/SubtaskCheckbox.vue';
import { useBoardStore } from '@/stores/boardStore';
import type { Subtask, Task } from '@/types/types';

setActivePinia(createPinia());
const boardStore = useBoardStore();

describe('Subtask Checkbox', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    const mockTask: Task = {
      id: '1',
      title: 'Task',
      desc: 'Description',
      subtasks: [
        {
          id: 'sub1',
          title: 'Subtask 1',
          done: false,
        },
      ],
    };
    boardStore.board = {
      title: 'Mock title',
      columns: [
        {
          id: 'col1',
          title: 'Column 1',
          tasks: [mockTask],
        },
      ],
    };

    wrapper = mount(SubtaskCheckbox, {
      props: {
        subtask: mockTask.subtasks[0],
        taskId: '1',
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Subtask 1');
  });

  it('changes subtask.done on toggleSubtask', async () => {
    await wrapper.find('input').trigger('click');
    const updatedSubtask = boardStore
      .getTaskById('1')
      ?.subtasks.find((s: Subtask) => s.id === 'sub1');
    expect(updatedSubtask?.done).toBe(true);
  });
});
