import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '../mocks';
import type { ModalData, Task } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import ModalOverlay from '@/components/ModalOverlay.vue';

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Delete Node Modal', () => {
  let wrapper: VueWrapper;
  let task: Task;

  beforeEach(() => {
    boardStore.board = mockBoard;
    task = boardStore.getBoard.columns[0].tasks[0];
    modalsStore.openModal('DeleteNode', task as ModalData);
    wrapper = mount(ModalOverlay);
  });

  it('renders correctly', () => {
    expect(wrapper.find('.delete-modal__wrapper').exists()).toBe(true);
    expect(wrapper.find('.delete-modal__button-delete').exists()).toBe(true);
    expect(wrapper.find('.delete-modal__button-cancel').exists()).toBe(true);
    expect(wrapper.text()).toContain(task.title);
  });

  it('deletes task', async () => {
    await wrapper.find('.delete-modal__button-delete').trigger('click');
    expect(boardStore.getTaskById(task.id)).toBe(undefined);
  });
});
