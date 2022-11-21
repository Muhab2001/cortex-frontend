<template>
  <template v-if="tab === 'Content'">
    <div></div>
  </template>
  <template v-if="tab === 'Assignments'">
    <div></div>
  </template>
  <template v-if="tab === 'Grades'">
    <div></div>
  </template>
  <template v-if="tab === 'Announcements'">
    <div></div>
  </template>
</template>
<script setup lang="ts">
// logic to handle tab state

import { ref } from "vue";

const tab = ref<string>("Content");

function switchTab(newIndex: string) {
  tab.value = newIndex;
}
</script>
<style></style>
