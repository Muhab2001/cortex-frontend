<template lang="">
  <div></div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { AssignmentItem, SectionTabProps } from "typings/sectionViewTabs";

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<AssignmentItem[]>([]);
</script>
<style lang=""></style>
