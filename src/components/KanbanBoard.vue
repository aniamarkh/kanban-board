<script setup lang="ts">
import { useBoardStore } from '../stores/boardStore';
import WorkflowColumn from './WorkflowColumn.vue';

const boardStore = useBoardStore();
</script>

<template>
  <div class="board__wrapper">
    <WorkflowColumn
      v-for="(column, index) in boardStore.getBoard.columns"
      :key="index"
      :column="column"
    />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.board__wrapper {
  max-width: 100%;
  overflow-x: auto;
  @include flex-row;
  gap: 20px;
  align-items: flex-start;
  padding: 25px;
  background: $grey;
  border-radius: 12px;
}
</style>
