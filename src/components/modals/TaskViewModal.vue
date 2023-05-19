<script setup lang="ts">
import { computed } from 'vue';
import { useBoardStore } from '@/stores/boardStore';
import type { Task } from '@/types/types';
import ButtonComponent from '../ButtonComponent.vue';
import SubtaskCheckbox from './SubtaskCheckbox.vue';
import StatusSelect from '../forms/StatusSelect.vue';
import DropdownMenu from './DropdownMenu.vue';

const boardStore = useBoardStore();
const props = defineProps<{ data: Task }>();

const subtasksInfo = computed(() => {
  const done = props.data.subtasks.filter((subtask) => subtask.done === true).length;
  return `(${done} of ${props.data.subtasks.length})`;
});

const setStatusForTask = (targetColumnId: string) => {
  boardStore.moveTask({ taskId: props.data.id, targetColumnId: targetColumnId });
};
</script>

<template>
  <div class="task-view__wrapper">
    <div class="task-view__buttons">
      <DropdownMenu target="Task" />
      <ButtonComponent @click="$emit('close')" btnClass="no-font" class="buttons__close-task">
        <span class="material-icons-outlined"> close </span>
      </ButtonComponent>
    </div>
    <h3 class="task-view__title">{{ data.title }}</h3>
    <p v-if="data.desc" class="task-view__desc">{{ data.desc }}</p>
    <div v-if="data.subtasks.length" class="task-view__subtasks">
      <h4>Subtasks {{ subtasksInfo }}</h4>
      <SubtaskCheckbox
        v-for="(subtask, index) in data.subtasks"
        :key="index"
        :subtask="subtask"
        :taskId="data.id"
      />
    </div>
    <div class="task-view__status">
      <h4>Current Status</h4>
      <StatusSelect @statusChange="setStatusForTask" :task="data" />
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.task-view__wrapper {
  position: relative;
  @include flex-column;
  z-index: 4;
  height: auto;
  max-width: 500px;
  width: 100%;
  padding: 30px;
  background-color: $bg-color;
  border-radius: 15px;
  margin: 10px;
}

.task-view__title {
  margin-bottom: 10px;
  width: 80%;
}

.task-view__desc {
  color: $dark-grey;
}

.task-view__buttons {
  @include flex-row;
  gap: 5px;
  position: absolute;
  right: 10px;
  top: 10px;
}

.task-view__subtasks {
  @include flex-column;
  gap: 10px;
  margin-top: 20px;

  h4 {
    margin-bottom: 10px;
  }
}

.task-view__status {
  @include flex-column;
  gap: 10px;
  margin-top: 20px;

  h4 {
    margin-bottom: 10px;
  }
}
</style>
