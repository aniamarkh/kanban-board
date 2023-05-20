<script setup lang="ts">
import BoardHeader from './components/board/BoardHeader.vue';
import KanbanBoard from './components/board/KanbanBoard.vue';
import ModalOverlay from '@/components/ModalOverlay.vue';
</script>

<template>
  <div class="app-wrapper">
    <BoardHeader />
    <KanbanBoard />
    <ModalOverlay />
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.app-wrapper {
  @include flex-column;
  min-height: 100vh;
}
</style>
