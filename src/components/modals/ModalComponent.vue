<script setup lang="ts">
import { useModalsStore } from '@/stores/modalsStore';
const modalsStore = useModalsStore();
</script>

<template>
  <div
    v-if="modalsStore.activeModalComponent"
    class="modal__window"
    @click="modalsStore.closeModal"
  >
    <component
      @click.stop
      @close="modalsStore.closeModal"
      :is="modalsStore.activeModalComponent"
      :data="modalsStore.modalData"
    />
  </div>
</template>

<style scoped lang="scss">
@import '../../assets/_config.scss';

.modal__window {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  width: 100vw;
  height: 100vh;
  @include flex-row;
  align-items: center;
  justify-content: center;
  background-color: #16161631;
  backdrop-filter: blur(2px);
}

.modal__wrapper {
  @include flex-column;
  z-index: 4;
  height: auto;
  max-width: 520px;
  padding: 20px;
  background-color: $bg-color;
  border-radius: 15px;
}
</style>
