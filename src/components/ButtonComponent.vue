<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  btnClass: {
    type: String,
    required: true,
  },
});

const buttonClass = computed(() => {
  return 'button--' + props.btnClass;
});
</script>

<template>
  <div class="button__wrapper">
    <button :class="buttonClass">
      <slot></slot>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import '../assets/_config.scss';
.button {
  background-color: $text-color;
  color: $bg-color;
  padding: 5px 10px;
  border-radius: 20px;
  font-weight: bold;
  height: 35px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);
  white-space: nowrap;
  @include transition-ease;

  &:hover {
    transform: scale(1.05);
  }
}

.button--primary {
  @extend .button;
}

.button--secondary {
  @extend .button;
  background-color: $grey;
  color: $text-color;
  font-weight: normal;
}
</style>
