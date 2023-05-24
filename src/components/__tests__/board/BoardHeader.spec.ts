import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '../mocks';
import BoardHeader from '@/components/board/BoardHeader.vue';
import TaskFormModal from '@/components/modals/TaskFormModal.vue';
import BoardFormModal from '@/components/modals/BoardFormModal.vue';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Board Header tests', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    boardStore.board = mockBoard;

    wrapper = mount(BoardHeader);
  });

  it('renders correctly', () => {
    expect(wrapper.text()).toContain('Mock title');
  });

  it('add task button opens correct modal', async () => {
    await wrapper.find('.buttons__add-task').trigger('click');
    expect(modalsStore.modalData).toBe(null);
    expect(modalsStore.activeModalComponent).toBe(TaskFormModal);
  });

  it('edit board button opens correct modal', async () => {
    await wrapper.find('.buttons__edit-board').trigger('click');
    expect(modalsStore.modalData).toBe(boardStore.getBoard);
    expect(modalsStore.activeModalComponent).toBe(BoardFormModal);
  });
});
