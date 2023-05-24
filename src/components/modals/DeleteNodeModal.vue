<script setup lang="ts">
import { useModalsStore } from '@/stores/modalsStore';
import { useBoardStore } from '@/stores/boardStore';
import ButtonComponent from '../ButtonComponent.vue';
import type { ModalData } from '@/types/types';

const props = defineProps<{ data: ModalData }>();

const modalsStore = useModalsStore();
const boardStore = useBoardStore();

const deleteTask = () => {
  boardStore.deleteTask(props.data.id);
  modalsStore.closeModal();
};
</script>

<template>
  <div class="delete-modal__wrapper">
    <h3 class="delete-modal__title">Delete '{{ data.title }}' task?</h3>
    <p class="delete-modal__paragraph">This action cannot be reversed.</p>
    <ButtonComponent @click="deleteTask" class="delete-modal__button-delete" btnClass="warn">
      Delete
    </ButtonComponent>
    <ButtonComponent
      @click="modalsStore.closeModal"
      class="delete-modal__button-cancel"
      btnClass="secondary"
      >Cancel</ButtonComponent
    >
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.delete-modal__wrapper {
  position: relative;
  z-index: 4;
  margin: 10px;
  padding: 20px;
  height: auto;
  max-width: 400px;
  @include flex-column;
  align-items: center;
  gap: 10px;
  background-color: $bg-color;
  border-radius: 15px;
  text-align: center;
}

.delete-modal__title {
  color: $red;
}

.delete-modal__paragraph {
  color: $dark-grey;
  margin: 10px 0;
}
</style>
