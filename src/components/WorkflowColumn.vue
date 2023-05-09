<script setup lang="ts">
import type { Column } from '../types/types';
import CardComponent from './CardComponent.vue';

defineProps<{ column: Column }>();
</script>

<template>
  <div class="board__column">
    <h4 class="column__title">{{ `${column.title} (${column.cards.length})` }}</h4>
    <CardComponent v-for="(card, index) in column.cards" :key="index" :card="card" />
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
