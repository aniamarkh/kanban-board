<script setup lang="ts">
import { reactive } from 'vue';
import { v4 as uuid } from 'uuid';
import type { Board } from '@/types/types';
import { useBoardStore } from '@/stores/boardStore';
import ButtonComponent from '../ButtonComponent.vue';
import TextInput from '../forms/TextInput.vue';

const boardStore = useBoardStore();
const props = defineProps<{ data: Board }>();
const emit = defineEmits(['close']);

const formState: { board: Board; isTitleError: boolean } = reactive({
  board: JSON.parse(JSON.stringify(props.data)),
  isTitleError: false,
});

const addColumnInput = () => {
  formState.board.columns.push({
    id: uuid(),
    title: '',
    tasks: [],
  });
};

const deleteColumn = (columnId: string) => {
  const columnIndex = formState.board.columns.findIndex((column) => column.id === columnId);
  formState.board.columns.splice(columnIndex, 1);
};

const isValidForm = (): Boolean => {
  if (!formState.board.title.trim().length) {
    formState.isTitleError = true;
    return false;
  } else {
    formState.isTitleError = false;
    return true;
  }
};

const onFormSubmit = () => {
  if (!isValidForm()) return;
  boardStore.board.title = formState.board.title;
  boardStore.board.columns = formState.board.columns.filter((column) => column.title.trim() !== '');
  emit('close');
};
</script>

<template>
  <div class="board-form__wrapper">
    <ButtonComponent @click="$emit('close')" btnClass="no-font" class="board-form__close-button">
      <span class="material-icons-outlined"> close </span>
    </ButtonComponent>
    <form class="board-form__form" @submit.prevent="onFormSubmit" autocomplete="off">
      <TextInput
        v-model="formState.board.title"
        :isError="formState.isTitleError"
        @inputChange="formState.isTitleError = false"
        inputName="Board Name"
        placeholder="Enter board name"
      />
      <div class="board-form__columns">
        <h4>Board Columns</h4>
        <div class="columns__input" v-for="(column, index) in formState.board.columns" :key="index">
          <TextInput
            v-model="formState.board.columns[index].title"
            placeholder="Enter column title"
            :is-required="false"
          />
          <span
            @click="deleteColumn(column.id)"
            class="columns__delete-button material-icons-outlined"
          >
            close
          </span>
        </div>
        <ButtonComponent @click.prevent="addColumnInput" btnClass="secondary">
          + add column
        </ButtonComponent>
      </div>
      <ButtonComponent btnClass="primary" class="board-form__confirm-btn" type="submit">
        Save Changes
      </ButtonComponent>
    </form>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.board-form__wrapper {
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

.board-form__close-button {
  position: absolute;
  width: 25px;
  right: 10px;
  top: 10px;
}

.board-form__form {
  @include flex-column;
  gap: 15px;
}

.board-form__columns {
  @include flex-column;
  gap: 10px;

  .columns__input {
    @include flex-row;
    align-items: center;
    gap: 10px;
  }
}

.columns__delete-button {
  color: $dark-grey;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: $text-color;
  }
}

.task-form__status {
  @include flex-column;
  gap: 10px;
}

.board-form__confirm-btn {
  margin-top: 10px;
}
</style>
