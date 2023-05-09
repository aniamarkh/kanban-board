<script setup lang="ts">
import { useBoardStore } from '../stores/boardStore';
import ButtonComponent from './ButtonComponent.vue';
const store = useBoardStore();
</script>

<template>
  <header class="header">
    <div class="header__board">
      <ButtonComponent btnClass="secondary" class="buttons__show-boards">
        <span class="material-icons-outlined"> expand_more </span>
      </ButtonComponent>
      <h1 class="board__title">{{ store.getBoard.title }}</h1>
    </div>
    <div class="header__buttons">
      <ButtonComponent btnClass="primary" class="buttons__add-task">+ add task</ButtonComponent>
      <ButtonComponent btnClass="secondary" class="buttons__edit-board">
        <span class="material-icons-outlined"> more_vert </span>
      </ButtonComponent>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';
.header {
  max-width: 1020px;
  margin: 0 auto;
  background-color: $bg-color;
  @include flex-row;
  justify-content: space-between;
  align-items: flex-start;
  padding: 15px 0;

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
