import { describe, it, expect, beforeEach } from 'vitest';
import { VueWrapper, mount } from '@vue/test-utils';
import { setActivePinia, createPinia } from 'pinia';
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import mockBoard from '../mocks';
import type { ModalData, Task, TaskFormState } from '@/types/types';
import ModalOverlay from '@/components/ModalOverlay.vue';
import StatusSelect from '@/components/forms/StatusSelect.vue';
import TaskFormModal from '@/components/modals/TaskFormModal.vue';

interface TaskFormInstance {
  formState: TaskFormState;
}

setActivePinia(createPinia());
const boardStore = useBoardStore();
const modalsStore = useModalsStore();

describe('Task Form Modal', () => {
  let wrapper: VueWrapper;
  let vm: TaskFormInstance;

  beforeEach(() => {
    boardStore.board = mockBoard;
    modalsStore.openModal('TaskForm', null);
    wrapper = mount(ModalOverlay);
    vm = wrapper.findComponent(TaskFormModal).vm as unknown as TaskFormInstance;
  });

  it('renders correctly when no task prop is provided', () => {
    expect(wrapper.find('.task-form__wrapper').exists()).toBe(true);
    const inputs = wrapper.findAll('input');
    expect(inputs.length).toBe(2);
    expect((inputs[0].element as HTMLInputElement).value).toBe('');
    expect((inputs[1].element as HTMLInputElement).value).toBe('');
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe('');
    expect(wrapper.findAll('.task-form__subtask').length).toBe(1);
    expect(wrapper.findAllComponents(StatusSelect).length).toBe(1);
    expect((wrapper.find('.status-select').element as HTMLSelectElement).value).toBe(
      boardStore.getBoard.columns[0].id
    );
    expect(wrapper.find('.task-form__confirm-btn').exists()).toBe(true);
  });

  it('renders correctly when task prop is provided', () => {
    const task: Task = boardStore.getBoard.columns[0].tasks[0];
    modalsStore.openModal('TaskForm', task as ModalData);
    wrapper = mount(ModalOverlay);

    const inputs = wrapper.findAll('input');
    expect((inputs[0].element as HTMLInputElement).value).toBe(
      boardStore.getTaskById(task.id)?.title
    );
    expect((inputs[1].element as HTMLInputElement).value).toBe(
      boardStore.getTaskById(task.id)?.subtasks[0].title
    );
    expect((wrapper.find('textarea').element as HTMLTextAreaElement).value).toBe(
      boardStore.getTaskById(task.id)?.desc
    );
    expect(wrapper.findAll('.task-form__subtask').length).toBe(1);
    expect(wrapper.findAllComponents(StatusSelect).length).toBe(1);
    expect((wrapper.find('.status-select').element as HTMLSelectElement).value).toBe(
      boardStore.getColumnForTask(task.id)?.id
    );
    expect(wrapper.find('.task-form__confirm-btn').exists()).toBe(true);
  });

  it('adds new subtask correctly', async () => {
    await wrapper.find('.subtasks__add-btn').trigger('click');
    expect(vm.formState.task.subtasks.length).toBe(2);
    expect(wrapper.findAll('.task-form__subtask').length).toBe(2);
  });

  it('deletes a subtask correctly', async () => {
    await wrapper.find('.subtask__delete-button').trigger('click');
    expect(vm.formState.task.subtasks.length).toBe(0);
    expect(wrapper.findAll('.task-form__subtask').length).toBe(0);
  });

  it('sets status for a task correctly', async () => {
    await wrapper.find('select').setValue('col2');
    expect((wrapper.find('.status-select').element as HTMLSelectElement).value).toBe('col2');
    expect(vm.formState.statusColumnId).toBe('col2');
  });

  it('validates a form correctly', async () => {
    expect((wrapper.findAll('input')[0].element as HTMLInputElement).value).toBe('');
    await wrapper.find('.task-form__form').trigger('submit.prevent');
    expect(wrapper.text()).toContain('This field is required');
    expect(vm.formState.isTitleError).toBe(true);

    await wrapper.findAll('input')[0].setValue('New Task');
    expect((wrapper.findAll('input')[0].element as HTMLInputElement).value).toBe('New Task');
    await wrapper.find('.task-form__form').trigger('submit.prevent');
    expect(wrapper.text()).not.toContain('This field is required');
    expect(vm.formState.isTitleError).toBe(false);
    expect(vm.formState.task.title).toBe('New Task');
  });

  it('adds new task correctly when no task prop is provided', async () => {
    await wrapper.findAll('input')[0].setValue('New Task');
    await wrapper.find('textarea').setValue('New Description');
    await wrapper.findAll('input')[1].setValue('New Subtask');
    await wrapper.find('select').setValue('col2');
    await wrapper.find('.task-form__form').trigger('submit.prevent');

    const newTaskId = vm.formState.task.id;

    expect(boardStore.getTaskById(newTaskId)?.title).toBe('New Task');
    expect(boardStore.getTaskById(newTaskId)?.desc).toBe('New Description');
    expect(boardStore.getTaskById(newTaskId)?.subtasks[0].title).toBe('New Subtask');
    expect(boardStore.getColumnForTask(newTaskId)?.id).toBe('col2');
  });

  it('edits a task correctly when a task prop is provided', async () => {
    const task: Task = boardStore.getBoard.columns[0].tasks[0];
    modalsStore.openModal('TaskForm', task as ModalData);
    wrapper = mount(ModalOverlay);

    await wrapper.findAll('input')[0].setValue('Edited Task');
    await wrapper.find('textarea').setValue('Edited Description');
    await wrapper.findAll('input')[1].setValue('Edited Subtask');
    await wrapper.find('select').setValue('col2');
    await wrapper.find('.task-form__form').trigger('submit.prevent');

    expect(boardStore.getTaskById(task.id)?.title).toBe('Edited Task');
    expect(boardStore.getTaskById(task.id)?.desc).toBe('Edited Description');
    expect(boardStore.getTaskById(task.id)?.subtasks[0].title).toBe('Edited Subtask');
    expect(boardStore.getColumnForTask(task.id)?.id).toBe('col2');
  });
});
