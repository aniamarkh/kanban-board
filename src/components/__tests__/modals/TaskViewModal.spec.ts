import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '../mocks';
import type { ModalData, Task } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import ModalOverlay from '@/components/ModalOverlay.vue';
import SubtaskCheckbox from '@/components/SubtaskCheckbox.vue';
import StatusSelect from '@/components/forms/StatusSelect.vue';

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Delete Node Modal', () => {
  let wrapper: VueWrapper;
  let task: Task;

  beforeEach(() => {
    boardStore.board = mockBoard;
    task = boardStore.getBoard.columns[0].tasks[0];
    modalsStore.openModal('TaskView', task as ModalData);
    wrapper = mount(ModalOverlay);
  });

  it('renders correctly', () => {
    expect(wrapper.find('.task-view__wrapper').exists()).toBe(true);
    expect(wrapper.text()).contains(task.title);
    expect(wrapper.text()).contains(task.desc);
    expect(wrapper.text()).contains('Subtasks (0 of 1)');
    expect(wrapper.findAllComponents(SubtaskCheckbox).length).toBe(1);
    expect(wrapper.text()).contains('Current Status');
    expect(wrapper.findAllComponents(StatusSelect).length).toBe(1);
  });

  it('renders status correctly', () => {
    const options = wrapper.findAll('option');
    expect(options.length).toBe(2);
    expect(options[0].text()).toBe('Column 1');
    expect(options[1].text()).toBe('Column 2');
    expect((wrapper.find('.status-select').element as HTMLSelectElement).value).toBe(
      boardStore.getColumnForTask(task.id)?.id
    );
  });

  it('changes status correctly', async () => {
    await wrapper.find('select').setValue('col2');
    expect((wrapper.find('.status-select').element as HTMLSelectElement).value).toBe('col2');
    expect(boardStore.getColumnForTask(task.id)?.id).toBe('col2');
  });
});
