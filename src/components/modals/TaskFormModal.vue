<script setup lang="ts">
import type { Board } from '@/types/types';
defineProps<{ data: Board }>();
</script>
<template>
  <div>
    <h1>Task Form Modal</h1>
    {{ data.title }}
  </div>
</template>
