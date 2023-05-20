<script setup lang="ts">
import { computed } from 'vue';
import type { ModalData, Task } from '@/types/types';
import { useModalsStore } from '@/stores/modalsStore';

const props = defineProps<{ task: Task }>();
const modalsStore = useModalsStore();

const openTask = () => {
  modalsStore.openModal('TaskView', props.task as ModalData);
};

const subtasksInfo = computed(() => {
  const done = props.task.subtasks.filter((subtask) => subtask.done === true).length;
  return `${done} of ${props.task.subtasks.length} subtasks done`;
});
</script>

<template>
  <div class="task__wrapper" @click="openTask">
    <h4 class="task__title">{{ task.title }}</h4>
    <p class="task__subtask" v-if="task.subtasks.length">
      {{ subtasksInfo }}
    </p>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.task__wrapper {
  @include flex-column;
  align-items: flex-start;
  gap: 5px;
  padding: 16px;
  width: 290px;
  background-color: $bg-color;
  @include shadow;
  border-radius: 8px;
  cursor: pointer;
  @include transition-ease;

  &:hover {
    transform: scale(1.05);
  }
}

.task__subtask {
  color: $dark-grey;
  font-size: 14px;
}
</style>
