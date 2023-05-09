<script setup lang="ts">
import { useBoardStore } from '../stores/boardStore';
import WorkflowColumn from './WorkflowColumn.vue';

const store = useBoardStore();
</script>

<template>
  <div class="board__wrapper">
    <WorkflowColumn
      v-for="(column, index) in store.getBoard.columns"
      :key="index"
      :column="column"
    />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.board__wrapper {
  min-width: 100%;
  @include flex-row;
  gap: 20px;
  align-items: flex-start;
  padding: 25px;
  background: $grey;
  border-radius: 12px;
}
</style>
