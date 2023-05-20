<script setup lang="ts">
defineProps({
  modelValue: String,
  inputName: String,
});

const emit = defineEmits(['update:modelValue']);

const onInput = (event: Event) => {
  const target = event.target as HTMLTextAreaElement;
  emit('update:modelValue', target.value);
};
</script>

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
      @input="onInput"
      v-bind="$attrs"
    />
  </div>
</template>

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
  border-radius: 10px;
  font-size: 16px;
}
</style>
