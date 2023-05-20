<script setup lang="ts">
import { reactive, computed } from 'vue';
import { v4 as uuid } from 'uuid';
import type { FormState, Column, ModalData } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import ButtonComponent from '../ButtonComponent.vue';
import StatusSelect from '../forms/StatusSelect.vue';
import TextInput from '../forms/TextInput.vue';
import TextareaInput from '../forms/TextareaInput.vue';

const boardStore = useBoardStore();
const props = defineProps({
  data: {
    type: Object as () => ModalData | null,
    default: null,
  },
});

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

const statusColumnId = computed(() => {
  return props.data
    ? (boardStore.getColumnForTask(props.data.id) as Column).id
    : boardStore.getBoard.columns[0].id;
});

const formState: FormState = reactive({
  task: props.data ? JSON.parse(JSON.stringify(props.data)) : newTask(),
  statusColumnId: statusColumnId.value,
  isTitleError: false,
});

const addSubtaskInput = () => {
  formState.task.subtasks.push(newSubtask());
};

const deleteSubtask = (subtaskId: string) => {
  const subtaskIndex = formState.task.subtasks.findIndex((subtask) => subtask.id === subtaskId);
  formState.task.subtasks.splice(subtaskIndex, 1);
};

const setStatusForTask = (targetColumnId: string) => {
  formState.statusColumnId = targetColumnId;
};

const isValidForm = (): Boolean => {
  if (!formState.task.title.trim().length) {
    formState.isTitleError = true;
    return false;
  } else {
    formState.isTitleError = false;
    return true;
  }
};

const emit = defineEmits(['close']);

const onFormSubmit = () => {
  if (!isValidForm()) return;

  const formResult = {
    id: formState.task.id,
    title: formState.task.title,
    desc: formState.task.desc,
    subtasks: formState.task.subtasks.filter((subtask) => subtask.title.trim() !== ''),
  };
  if (props.data) {
    boardStore.editTask({ taskObj: formResult, targetColumnId: formState.statusColumnId });
  } else {
    boardStore.addTask({ targetColumnId: formState.statusColumnId, newTask: formResult });
  }
  emit('close');
};
</script>

<template>
  <div class="task-form__wrapper">
    <ButtonComponent @click="$emit('close')" btnClass="no-font" class="task-form__close-button">
      <span class="material-icons-outlined"> close </span>
    </ButtonComponent>
    <form class="task-form__form" @submit.prevent="onFormSubmit" autocomplete="off">
      <TextInput
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
      <div class="task-form__subtasks">
        <h4>Subtasks</h4>
        <div
          class="subtask__input"
          v-for="(subtask, index) in formState.task.subtasks"
          :key="subtask.id"
        >
          <TextInput
            v-model="formState.task.subtasks[index].title"
            placeholder="Enter subtask description"
            :is-required="false"
          />
          <span
            @click="deleteSubtask(subtask.id)"
            class="subtask__delete-button material-icons-outlined"
          >
            close
          </span>
        </div>
        <ButtonComponent @click.prevent="addSubtaskInput" btnClass="secondary">
          + add subtask
        </ButtonComponent>
      </div>
      <div class="task-form__status">
        <h4>Current Status</h4>
        <StatusSelect :task="data" @statusChange="setStatusForTask" />
      </div>
      <ButtonComponent btnClass="primary" class="task-form__confirm-btn" type="submit">
        {{ data ? 'Save Changes' : 'Create New Task' }}
      </ButtonComponent>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.task-form__wrapper {
  @include modal-wrapper;
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

.task-form__subtasks {
  @include flex-column;
  gap: 10px;

  .subtask__input {
    @include flex-row;
    align-items: center;
    gap: 10px;

    .subtask__delete-button {
      color: $dark-grey;
      font-size: 18px;
      cursor: pointer;

      &:hover {
        color: $text-color;
      }
    }
  }
}

.task-form__status {
  @include flex-column;
  gap: 10px;
}
</style>
