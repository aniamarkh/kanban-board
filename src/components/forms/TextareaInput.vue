<template>
  <div class="textarea-input__wrapper">
    <label class="textarea-input__label" v-if="inputName" :for="inputName">
      {{ inputName }}
    </label>
    <textarea
      class="textarea-input__input"
      rows="3"
      :id="inputName"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      v-bind="$attrs"
    />
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: String,
  inputName: String,
});
</script>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.textarea-input__wrapper {
  position: relative;
  @include flex-column;
  gap: 10px;
}

.textarea-input__label {
  font-weight: bold;
}

.textarea-input__input {
  padding: 10px;
  background-color: $grey;
  border: none;
  @include shadow;
  border-radius: 10px;
}
</style>
