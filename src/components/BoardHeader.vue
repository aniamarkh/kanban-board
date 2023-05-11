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
      <h1 class="board__title">{{ boardStore.getBoard.title }}</h1>
    </div>
    <div class="header__buttons">
      <ButtonComponent btnClass="primary" @click="openTaskForm" class="buttons__add-task">
        + add task
      </ButtonComponent>
      <ButtonComponent btnClass="secondary" class="buttons__edit-board">
        edit board
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
    justify-content: flex-end;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
  }
}
</style>
