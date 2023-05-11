<script setup lang="ts">
import BoardHeader from './components/board/BoardHeader.vue';
import KanbanBoard from './components/board/KanbanBoard.vue';
import ModalComponent from '@/components/modals/ModalComponent.vue';
</script>

<template>
  <div>
    <BoardHeader />
    <main>
      <KanbanBoard />
      <ModalComponent />
    </main>
  </div>
</template>
