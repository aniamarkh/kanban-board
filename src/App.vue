<script setup lang="ts">
import BoardHeader from './components/board/BoardHeader.vue';
import KanbanBoard from './components/board/KanbanBoard.vue';
import ModalOverlay from '@/components/ModalOverlay.vue';
</script>

<template>
  <div>
    <BoardHeader />
    <main>
      <KanbanBoard />
      <ModalOverlay />
    </main>
  </div>
</template>
