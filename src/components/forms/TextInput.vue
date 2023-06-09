<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps({
  modelValue: String,
  inputName: String,
  isRequired: {
    type: Boolean,
    default: true,
  },
  isError: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'inputChange']);

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
  emit('inputChange');
};

const inputClass = computed(() => {
  return props.isError ? 'text-input__input--error' : 'text-input__input';
});
</script>

<template>
  <div class="text-input__wrapper">
    <label class="text-input__label" v-if="inputName" :for="inputName">
      {{ inputName }}
    </label>
    <input
      :class="inputClass"
      :id="inputName"
      :value="modelValue"
      @input="onInput($event)"
      v-bind="$attrs"
    />
    <p class="text-input__error" v-if="isError">This field is required</p>
  </div>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.text-input__wrapper {
  position: relative;
  @include flex-column;
  gap: 10px;
  width: 100%;
}

.text-input__label {
  font-weight: bold;
}

.text-input__input {
  height: 40px;
  padding: 10px;
  background-color: $grey;
  border: none;
  border-radius: 10px;
  font-size: 16px;
}

.text-input__input--error {
  @extend .text-input__input;
  border: 1px solid red;
}

.text-input__error {
  font-size: 12px;
  color: $red;
}
</style>
