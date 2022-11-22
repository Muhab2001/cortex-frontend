<template>
  <template v-if="props.tab === 'Course Content'">
    <div></div>
  </template>
  <template v-if="props.tab === 'Assignments'">
    <div></div>
  </template>
  <template v-if="props.tab === 'Grades'">
    <div></div>
  </template>
  <template v-if="props.tab === 'Announcements'">
    <div></div>
  </template>
</template>

<script setup lang="ts">
import type { SectionTabProps } from "typings/CourseViewTabs";
import { ref } from "vue";

const props = defineProps<SectionTabProps>();
</script>
<style lang=""></style>
