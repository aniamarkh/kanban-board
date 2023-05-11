<script setup>
import { defineProps, computed } from 'vue';
import { useBoardStore } from '@/stores/boardStore';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});

const boardStore = useBoardStore();
const columns = computed(() => boardStore.getBoard.columns);
const taskColumn = computed(() => boardStore.getColumnForTask(props.task.id));
const onStatusChange = (event) => {
  const targetColumnId = Number(event.target.value);
  boardStore.moveTask({ taskId: props.task.id, targetColumnId: targetColumnId });
};
</script>

<template>
  <select class="status-select" @change="onStatusChange">
    <option
      v-for="column in columns"
      :key="column.id"
      :value="column.id"
      :selected="column.id === taskColumn.id"
    >
      {{ column.title }}
    </option>
  </select>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.status-select {
  text-indent: 10px;
  padding: 10px;
  font: inherit;
  border-radius: 10px;
  cursor: pointer;
  background-color: $grey;
  border: none;
  @include shadow;
  appearance: none;
  background-image: url('src/assets/expand.svg');
  background-repeat: no-repeat;
  background-position: right 10px center;
  background-size: 25px;
}
</style>
