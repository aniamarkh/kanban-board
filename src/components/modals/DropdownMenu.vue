<script setup lang="ts">
import { computed, ref } from 'vue';
import { useModalsStore } from '@/stores/modalsStore';
import type { Task } from '@/types/types';

defineProps<{ target: String }>();

const isDropdownOpen = ref(false);
const dropdownClass = computed(() => {
  return isDropdownOpen.value ? 'dropdown' : 'dropdown--closed';
});

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const modalsStore = useModalsStore();
const openDeleteModal = () => {
  modalsStore.openModal('DeleteNode', modalsStore.modalData as Task);
};
const openFormModal = () => {
  modalsStore.openModal('TaskForm', modalsStore.modalData as Task);
};
</script>

<template>
  <div class="dropdown__wrapper" @blur="closeDropdown" tabindex="0" @click.stop>
    <span @click="isDropdownOpen = !isDropdownOpen" class="material-icons-outlined dropdown__icon">
      more_horiz
    </span>
    <div v-if="isDropdownOpen" :class="dropdownClass">
      <p class="dropdown__option" @click="openFormModal">Edit {{ target }}</p>
      <p class="dropdown__option--delete" @click="openDeleteModal">Delete {{ target }}</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.dropdown__wrapper {
  @include flex-row;
  height: auto;
}

.dropdown__icon {
  z-index: 5;
  cursor: pointer;
  color: $dark-grey;
  @include transition-ease;

  &:hover {
    color: $text-color;
  }
}

.dropdown {
  position: absolute;
  background-color: $bg-color;
  z-index: 3;
  right: 30px;
  @include flex-column;
  gap: 10px;
  @include shadow;
  width: 140px;
  padding: 25px 10px 10px;
  border-radius: 10px;
}

.dropdown--closed {
  display: none;
}

.dropdown__option {
  color: $dark-grey;
  cursor: pointer;
  @include transition-ease;

  &:hover {
    color: $text-color;
  }
}

.dropdown__option--delete {
  @extend .dropdown__option;
  color: $red-pale;

  &:hover {
    color: $red;
  }
}
</style>
