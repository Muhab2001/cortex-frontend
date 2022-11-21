<script setup lang="ts">
interface CourseItemProps {
  title: string;
  description?: string;
  extension: string;
  lastUpdated: string;
}

const props = defineProps<CourseItemProps>();

// create a function that returns an icon to render
</script>

<template>
  <div>
    <span name="item-meta-container">
      <span name="item-title">{{ props.title }}</span>
      <span v-if="props.description" name="item-description"></span>
    </span>
    <span name="last-updated">
      <span class="update-indicator"></span>
      <span>{{ props.lastUpdated }}</span>
    </span>
  </div>
</template>

<style></style>
