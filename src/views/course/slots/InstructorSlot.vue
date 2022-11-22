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
import type { SectionTab } from "typings/sectionViewTabs";
import { ref } from "vue";
const tab = ref<SectionTab>("Content");

function switchTab(newIndex: SectionTab) {
  tab.value = newIndex;
}
</script>
<style lang=""></style>
