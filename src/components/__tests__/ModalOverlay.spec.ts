import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from './mocks';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import ModalOverlay from '../ModalOverlay.vue';
import TaskFormModal from '@/components/modals/TaskFormModal.vue';

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Modals Overlay tests', () => {
  let wrapper: VueWrapper;

  beforeEach(() => {
    boardStore.board = mockBoard;
  });

  it('renders correctly when there is no active modal', () => {
    wrapper = mount(ModalOverlay);

    expect(wrapper.find('.modal__window').exists()).toBe(false);
  });

  it('renders correctly when there is an active modal', () => {
    modalsStore.openModal('TaskForm', null);
    wrapper = mount(ModalOverlay);

    expect(wrapper.find('.modal__window').exists()).toBe(true);
    expect(wrapper.findComponent(TaskFormModal).exists()).toBe(true);
  });

  it('closes modal on click', async () => {
    modalsStore.openModal('TaskForm', null);
    const wrapper = mount(ModalOverlay);

    await wrapper.find('.modal__window').trigger('click');

    expect(modalsStore.activeModalComponent).toBe(null);
    expect(modalsStore.modalData).toBe(null);
  });
});
