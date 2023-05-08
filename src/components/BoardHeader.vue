<script setup lang="ts">
import { useBoardStore } from '../stores/boardStore';
import ButtonComponent from './ButtonComponent.vue';
const store = useBoardStore();
</script>

<template>
  <header class="header">
    <div class="header__board">
      <h1 class="board__title">{{store.getBoard.title}}</h1>
      <p class="board__desc">{{store.getBoard.desc}}</p>
    </div>
    <div class="header__buttons">
      <ButtonComponent type="primary" class="buttons__add-task">+ add task</ButtonComponent>
      <ButtonComponent type="secondary" class="buttons__edit-board">
        <span class="material-icons-outlined">
        more_vert
        </span>
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
  align-items: center;
  padding: 15px;
}

.header__buttons {
  @include flex-row;
  gap: 10px;
}
</style>
