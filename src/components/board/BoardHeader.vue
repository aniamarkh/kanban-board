<script setup lang="ts">
import { useBoardStore } from '@/stores/boardStore';
import { useModalsStore } from '@/stores/modalsStore';
import ButtonComponent from '@/components/ButtonComponent.vue';
import type { ModalData } from '@/types/types';

const boardStore = useBoardStore();
const modalsStore = useModalsStore();
</script>

<template>
  <header class="header">
    <div class="header__board">
      <h1 class="board__title">{{ boardStore.getBoard.title }}</h1>
    </div>
    <div class="header__buttons">
      <ButtonComponent
        btnClass="primary"
        @click="modalsStore.openModal('TaskForm', null)"
        class="buttons__add-task"
      >
        + add task
      </ButtonComponent>
      <ButtonComponent
        btnClass="secondary"
        @click="modalsStore.openModal('BoardForm', boardStore.getBoard as ModalData)"
        class="buttons__edit-board"
      >
        edit board
      </ButtonComponent>
    </div>
  </header>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';
.header {
  margin: 0 auto;
  width: 100%;
  background-color: $bg-color;
  @include flex-row;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;

  &__board {
    @include flex-row;
    gap: 10px;
    align-items: center;
  }

  &__buttons {
    @include flex-row;
    justify-content: flex-end;
    flex-wrap: nowrap;
    align-items: center;
    gap: 10px;

    .button__wrapper {
      width: 120px;
    }
  }
}

@media (max-width: 700px) {
  .board__title {
    font-size: 22px;
  }

  .header {
    padding: 15px 15px;
    @include flex-column;
    align-items: flex-start;
    gap: 5px;

    &__buttons {
      gap: 5px;
    }
  }
}
</style>
