<script setup lang="ts">
import type { Column } from '../types/types';
import TaskCard from './TaskCard.vue';

defineProps<{ column: Column }>();
</script>

<template>
  <div class="board__column">
    <h4 class="column__title">{{ `${column.title} (${column.tasks.length})` }}</h4>
    <TaskCard v-for="(task, index) in column.tasks" :key="index" :task="task" />
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';
.board__column {
  @include flex-column;
  align-items: flex-start;
}

.column__title {
  margin-bottom: 12px;
  text-transform: uppercase;
}
</style>
