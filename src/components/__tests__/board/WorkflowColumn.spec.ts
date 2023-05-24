import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '../mocks';
import WorkflowColumn from '@/components/board/WorkflowColumn.vue';
import { useBoardStore } from '@/stores/boardStore';
import type { Column } from '@/types/types';

setActivePinia(createPinia());
const boardStore = useBoardStore();

describe('Workflow Column tests', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    boardStore.board = mockBoard;
    wrapper = mount(WorkflowColumn, {
      props: {
        column: boardStore.getColumnById('col1') as Column,
      },
    });
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Column 1 (1)');
    expect(wrapper.text()).toContain('Task 1');
    expect(wrapper.text()).toContain('0 of 1 subtasks done');
  });
});
