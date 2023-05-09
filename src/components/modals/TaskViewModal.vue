<script setup lang="ts">
import type { Card } from '@/types/types';
defineProps<{ data: Card }>();
</script>

<template>
  <div>
    <h1>Task View Modal</h1>
    {{ data.title }}
  </div>
</template>
