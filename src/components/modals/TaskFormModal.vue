<script setup lang="ts">
import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { v4 as uuid } from 'uuid';
import type { FormState } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import ButtonComponent from '../ButtonComponent.vue';
import StatusSelect from '../forms/StatusSelect.vue';
import TextInput from '../forms/TextInput.vue';
import TextareaInput from '../forms/TextareaInput.vue';

const boardStore = useBoardStore();

const newSubtask = () => ({
  id: uuid(),
  title: '',
  done: false,
});

const newTask = () => ({
  id: uuid(),
  title: '',
  desc: '',
  subtasks: [newSubtask()],
});

const formState: FormState = reactive({
  task: newTask(),
  statusColumnId: boardStore.getBoard.columns[0].id,
  isTitleError: false,
});

const titleInput: Ref<string> = ref('');

const addSubtaskInput = () => {
  formState.task.subtasks.push(newSubtask());
};

const setStatusForNewTask = (targetColumnId: string) => {
  formState.statusColumnId = targetColumnId;
};

const isValidForm = (): Boolean => {
  if (formState.task.title.trim().length === 0) {
    formState.isTitleError = true;
    return false;
  } else {
    formState.isTitleError = false;
    return true;
  }
};

const resetForm = () => {
  formState.task = newTask();
  formState.statusColumnId = boardStore.getBoard.columns[0].id;
};

const onFormSubmit = () => {
  if (isValidForm()) {
    const newTask = {
      id: formState.task.id,
      title: formState.task.title,
      desc: formState.task.desc,
      subtasks: formState.task.subtasks.filter((subtask) => subtask.title.trim() !== ''),
    };
    boardStore.addTask({ targetColumnId: formState.statusColumnId, newTask: newTask });
    resetForm();
  }
};
</script>

<template>
  <div class="task-form__wrapper">
    <ButtonComponent @click="$emit('close')" btnClass="no-font" class="task-form__close-button">
      <span class="material-icons-outlined"> close </span>
    </ButtonComponent>
    <form class="task-form__form" @submit.prevent="onFormSubmit" autocomplete="off">
      <TextInput
        :ref="titleInput"
        v-model="formState.task.title"
        :isError="formState.isTitleError"
        @inputChange="formState.isTitleError = false"
        inputName="Task Title"
        placeholder="Enter title for a task"
      />
      <TextareaInput
        v-model="formState.task.desc"
        inputName="Task Description"
        placeholder="Enter description for a task"
      />
      <div class="task-view__subtasks">
        <h4>Subtasks</h4>
        <TextInput
          v-for="(subtask, index) in formState.task.subtasks"
          :key="subtask.id"
          v-model="formState.task.subtasks[index].title"
          placeholder="subtask"
          :isRequired="false"
        />
        <ButtonComponent @click.prevent="addSubtaskInput" btnClass="secondary">
          + add subtask
        </ButtonComponent>
      </div>
      <div class="task-form__status">
        <h4>Current Status</h4>
        <StatusSelect @statusChange="setStatusForNewTask" />
      </div>
      <ButtonComponent btnClass="primary" class="task-form__confirm-btn" type="submit">
        Create New Task
      </ButtonComponent>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.task-form__wrapper {
  position: relative;
  @include flex-column;
  z-index: 4;
  height: auto;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  background-color: $bg-color;
  border-radius: 15px;
  margin: 10px;
}

.task-form__close-button {
  position: absolute;
  width: 25px;
  right: 10px;
  top: 10px;
}

.task-form__form {
  @include flex-column;
  gap: 15px;
}

.task-view__subtasks {
  @include flex-column;
  gap: 10px;
}

.task-form__status {
  @include flex-column;
  gap: 10px;
}
</style>
