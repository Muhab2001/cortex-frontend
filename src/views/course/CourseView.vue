<template lang="">
  <!-- include an outer framework -->
  <!-- conditional rendering for the slot according to user role -->
  <div></div>
</template>
<script setup lang="ts">
interface CoruseProps {
  courseName: string;
  courseID: string;
  sectionNum: string | number;
  sectionId: number;
}

const props = defineProps<CoruseProps>();
</script>
<style lang=""></style>
