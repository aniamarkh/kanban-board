<script setup lang="ts">
import { useBoardStore } from '../stores/boardStore';
import { useModalsStore } from '../stores/modalsStore';
import ButtonComponent from './ButtonComponent.vue';

const boardStore = useBoardStore();
const modalsStore = useModalsStore();

const openTaskForm = () => {
  modalsStore.openModal('TaskForm', boardStore.getBoard);
};
</script>

<template>
  <header class="header">
    <div class="header__board">
      <ButtonComponent btnClass="secondary" class="buttons__show-boards">
        <span class="material-icons-outlined"> expand_more </span>
      </ButtonComponent>
      <h1 class="board__title">{{ boardStore.getBoard.title }}</h1>
    </div>
    <div class="header__buttons">
      <ButtonComponent btnClass="primary" @click="openTaskForm" class="buttons__add-task">
        + add task
      </ButtonComponent>
      <ButtonComponent btnClass="secondary" class="buttons__edit-board">
        <span class="material-icons-outlined"> more_horiz </span>
      </ButtonComponent>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';
.header {
  margin: 0 auto;
  background-color: $bg-color;
  @include flex-row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 30px;

  &__board {
    @include flex-row;
    gap: 10px;
    align-items: center;
  }

  &__buttons {
    @include flex-row;
    gap: 10px;
  }
}
</style>
