<script setup lang="ts">
import { computed, ref } from 'vue';
import { useBoardStore } from '@/stores/boardStore';
import type { Column, Task } from '@/types/types';

const props = defineProps({
  task: {
    type: Object as () => Task | null,
    default: null,
  },
});

const emit = defineEmits(['statusChange']);

const boardStore = useBoardStore();

const columns = computed(() => boardStore.getBoard.columns);

const selectedColumnId = ref(
  props.task && props.task.id
    ? (boardStore.getColumnForTask(props.task.id) as Column).id
    : columns.value[0].id
);

const onStatusChange = (event: Event) => {
  const targetColumnId = (event.target as HTMLSelectElement).value;
  selectedColumnId.value = targetColumnId;
  emit('statusChange', targetColumnId);
};
</script>

<template>
  <select class="status-select" @change="onStatusChange" v-model="selectedColumnId">
    <option v-for="column in columns" :key="column.id" :value="column.id">
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
