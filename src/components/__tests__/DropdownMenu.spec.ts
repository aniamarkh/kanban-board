import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '@/assets/mocks';
import type { ModalData, Task } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import ModalOverlay from '@/components/ModalOverlay.vue';
import DropdownMenu from '@/components/DropdownMenu.vue';

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Dropdown Menu', () => {
  let wrapper: VueWrapper;
  let task: Task;

  beforeEach(() => {
    boardStore.board = mockBoard;
    task = boardStore.getBoard.columns[0].tasks[0];
    modalsStore.openModal('TaskView', task as ModalData);
    wrapper = mount(ModalOverlay);
  });

  it('renders correctly', async () => {
    expect(wrapper.find('.dropdown').exists()).toBe(false);
    await wrapper.find('.dropdown__icon').trigger('click');
    expect(wrapper.find('.dropdown').exists()).toBe(true);
    expect(wrapper.findComponent(DropdownMenu).exists()).toBe(true);
  });
});
