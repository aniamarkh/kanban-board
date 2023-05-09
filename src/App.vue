<script setup lang="ts">
import BoardHeader from './components/BoardHeader.vue';
import KanbanBoard from './components/KanbanBoard.vue';
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
