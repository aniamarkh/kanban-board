<script setup lang="ts">
import { computed, type ComputedRef } from 'vue';
import Draggable from 'vuedraggable';
import { useBoardStore } from '@/stores/boardStore';
import type { Column } from '@/types/types';
import TaskCard from './TaskCard.vue';

const props = defineProps<{ columnId: string }>();
const boardStore = useBoardStore();

const column: ComputedRef<Column> = computed(() => {
  return boardStore.getColumnById(props.columnId) as Column;
});

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
    @end="boardStore.saveState"
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
  width: 290px;
  padding-bottom: 100px;
}

.column__title {
  margin-bottom: 6px;
  text-transform: uppercase;
}

.sortable-ghost {
  opacity: 0.8;
  border: 2px solid $dark-grey;
}
</style>
