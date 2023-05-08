<script setup lang="ts">
import { computed } from 'vue';

interface ButtonProps {
  type: 'primary' | 'secondary'
};
const props = defineProps<ButtonProps>();

const buttonClass = computed(() => {
  return 'button--' + props.type;
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
  background-color: $primary;
  color: $bg-color;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  height: 35px;
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
  color: $primary;
  font-weight: normal;

}
</style>
