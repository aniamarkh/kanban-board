import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { setActivePinia, createPinia } from 'pinia';
import mockBoard from '@/assets/mocks';
import type { ModalData, BoardFormState } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import ModalOverlay from '@/components/ModalOverlay.vue';
import BoardFormModal from '@/components/modals/BoardFormModal.vue';

interface BoardFormInstance {
  formState: BoardFormState;
}

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Board Form Modal', () => {
  let wrapper: VueWrapper;
  let vm: BoardFormInstance;

  beforeEach(() => {
    boardStore.board = mockBoard;
    modalsStore.openModal('BoardForm', boardStore.getBoard as ModalData);
    wrapper = mount(ModalOverlay);
    vm = wrapper.findComponent(BoardFormModal).vm as unknown as BoardFormInstance;
  });

  it('renders correctly', () => {
    expect(wrapper.find('.board-form__wrapper').exists()).toBe(true);
    expect(wrapper.findAll('.text-input__input').length).toBe(3);
    expect(wrapper.text()).toContain('Board Name');
    expect(wrapper.text()).toContain('Board Columns');
    expect(wrapper.text()).toContain('+ add column');
    expect(wrapper.find('.board-form__confirm-btn').exists()).toBe(true);
    expect(wrapper.find('.board-form__close-button').exists()).toBe(true);
    expect(wrapper.findAll('.columns__input').length).toBe(2);
  });

  it('renders correct input values', () => {
    const inputs = wrapper.findAll('input');
    expect(inputs[0].element.value).toBe(boardStore.getBoard.title);
    expect(inputs[1].element.value).toBe(boardStore.getBoard.columns[0].title);
    expect(inputs[2].element.value).toBe(boardStore.getBoard.columns[1].title);
  });

  it('adds new column', async () => {
    await wrapper.find('.board-form__column-btn').trigger('click');
    expect(vm.formState.board.columns.length).toBe(3);
    await nextTick();
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(4);
  });

  it('deletes column', async () => {
    await wrapper.findAll('.columns__delete-button')[0].trigger('click');
    expect(vm.formState.board.columns.length).toBe(1);
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(2);
  });

  it('validate form', async () => {
    await wrapper.findAll('input')[0].setValue('');
    expect(wrapper.findAll('input')[0].element.value).toBe('');
    await wrapper.find('.board-form__form').trigger('submit.prevent');
    await nextTick();
    expect(wrapper.text()).toContain('This field is required');

    await wrapper.findAll('input')[0].setValue('New title');
    expect(wrapper.findAll('input')[0].element.value).toBe('New title');
    await wrapper.find('.board-form__form').trigger('submit.prevent');
    await nextTick();
    expect(wrapper.text()).not.toContain('This field is required');
  });
});
