<script setup lang="ts">
import type { Card } from '../types/types';
import { useModalsStore } from '../stores/modalsStore';
const props = defineProps<{ card: Card }>();
const modalsStore = useModalsStore();

const openTask = () => {
  modalsStore.openModal('TaskView', props.card);
};
</script>

<template>
  <div class="card__wrapper" @click="openTask">
    <h4 class="card__title">{{ card.title }}</h4>
    <p class="card__desc">{{ card.desc }}</p>
    <div class="card__subtask" v-if="card.subtasks.length">subtasks</div>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';

.card__wrapper {
  @include flex-column;
  align-items: flex-start;
  padding: 16px;
  gap: 8px;
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
</style>
