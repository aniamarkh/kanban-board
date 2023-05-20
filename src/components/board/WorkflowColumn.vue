<script setup lang="ts">
import Draggable from 'vuedraggable';
import type { Column } from '@/types/types';
import TaskCard from './TaskCard.vue';

defineProps<{ column: Column }>();

const modifyDragItem = (dataTransfer: DataTransfer) => {
  dataTransfer.setDragImage(document.createElement('div'), 0, 0);
};
</script>

<template>
  <Draggable
    :list="column.tasks"
    item-key="id"
    group="task-cards"
    :setData="modifyDragItem"
    class="board__column"
  >
    <template #header>
      <h4 class="column__title">{{ `${column.title} (${column.tasks.length})` }}</h4>
    </template>
    <template #item="{ element }">
      <TaskCard :key="element.id" :task="element" />
    </template>
  </Draggable>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';
.board__column {
  @include flex-column;
  align-items: flex-start;
  gap: 10px;
  min-width: 290px;
  padding-bottom: 100px;
}

.column__title {
  margin-bottom: 6px;
  text-transform: uppercase;
}

.sortable-ghost {
  opacity: 0.4;
  border: 2px solid $dark-grey;
}
</style>
