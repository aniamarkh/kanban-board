<script setup>
import { defineProps, computed, ref } from 'vue';
import { useBoardStore } from '@/stores/boardStore';

const props = defineProps({
  task: {
    type: Object,
    default: null,
  },
});

const boardStore = useBoardStore();
const columns = computed(() => boardStore.getBoard.columns);
const selectedColumnId = ref(
  props.task ? boardStore.getColumnForTask(props.task.id).id : columns.value[0].id
);

const emit = defineEmits(['statusChange']);

const onStatusChange = (event) => {
  const targetColumnId = Number(event.target.value);
  selectedColumnId.value = targetColumnId;
  if (props.task) {
    boardStore.moveTask({ taskId: props.task.id, targetColumnId: targetColumnId });
  } else {
    emit('statusChange', targetColumnId);
  }
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
