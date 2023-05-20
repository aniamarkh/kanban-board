<script setup lang="ts">
import { computed } from 'vue';
import { useBoardStore } from '@/stores/boardStore';
const props = defineProps({
  subtask: {
    type: Object,
    required: true,
  },
  taskId: {
    type: String,
    required: true,
  },
});
const boardStore = useBoardStore();

const toggleSubtask = () => {
  const subtaskNode = boardStore
    .getTaskById(props.taskId)
    ?.subtasks.find((subtask) => subtask.id === props.subtask.id);
  if (subtaskNode) subtaskNode.done = !subtaskNode.done;
};

const labelClass = computed(() => {
  return !props.subtask.done ? 'subtask__label' : 'subtask__label--line-through';
});
</script>

<template>
  <label :for="subtask.id" :class="labelClass">
    <input
      class="subtask__input"
      :id="subtask.id"
      @click="toggleSubtask"
      type="checkbox"
      :checked="subtask.done"
    />
    <span class="subtask__checkbox"></span>
    {{ subtask.title }}
  </label>
</template>

<style scoped lang="scss">
@import '@/assets/_config.scss';

.subtask__label {
  @include flex-row;
  align-items: center;
  gap: 10px;
  padding: 10px;
  background-color: $grey;
  border-radius: 10px;
  cursor: pointer;
  @include shadow;
  @include transition-ease;

  &:hover {
    background-color: #e4e4e4;
  }
}

.subtask__label--line-through {
  @extend .subtask__label;
  text-decoration-line: line-through;
  color: $dark-grey;
}

.subtask__input {
  display: none;

  &:checked + .subtask__checkbox {
    &:after {
      top: 0;
    }
  }
}

.subtask__checkbox {
  width: 20px;
  height: 20px;
  background-color: $bg-color;
  border: 1px solid $grey;
  @include shadow;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  cursor: pointer;

  &:after {
    background-color: $dark-grey;
    width: 10px;
    height: 10px;
    border-radius: 10px;
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 200%;
    bottom: 0;
    margin: auto;
  }
}
</style>
