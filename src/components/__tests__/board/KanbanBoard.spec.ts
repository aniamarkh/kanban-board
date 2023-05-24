import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '../mocks';
import KanbanBoard from '@/components/board/KanbanBoard.vue';
import WorkflowColumn from '@/components/board/WorkflowColumn.vue';
import TaskCard from '@/components/board/TaskCard.vue';
import { useBoardStore } from '@/stores/boardStore';

setActivePinia(createPinia());
const boardStore = useBoardStore();

describe('Kanban Board tests', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    boardStore.board = mockBoard;
    wrapper = mount(KanbanBoard);
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Column 1 (1)');
    expect(wrapper.text()).toContain('Column 2 (1)');
    expect(wrapper.text()).toContain('Task 1');
    expect(wrapper.text()).toContain('Task 2');
    expect(wrapper.text()).toContain('0 of 1 subtasks done');
    expect(wrapper.text()).toContain('1 of 1 subtasks done');
  });

  it('renders the correct number of Columns and Tasks', () => {
    expect(wrapper.findAllComponents(WorkflowColumn).length).toBe(2);
    expect(wrapper.findAllComponents(TaskCard).length).toBe(2);
  });
});
