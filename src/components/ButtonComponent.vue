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
.button__wrapper {
  width: 100%;
}

.button {
  background-color: $text-color;
  color: $bg-color;
  padding: 5px 10px;
  border-radius: 10px;
  font-weight: bold;
  height: 35px;
  width: 100%;
  @include shadow;
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
  color: $dark-grey;
  font-weight: normal;

  &:hover {
    color: $text-color;
  }
}

.button--warn {
  @extend .button;
  background-color: $red-pale;
  color: $bg-color;
  font-weight: normal;

  &:hover {
    background-color: $red;
  }
}

.button--no-font {
  background-color: inherit;
  color: $dark-grey;
  font-weight: normal;
  @include transition-ease;

  &:hover {
    color: $text-color;
  }
}
</style>
