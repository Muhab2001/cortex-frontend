<template>
  <template v-if="tab === 'Course Content'">
    <ContentTabVue />
  </template>
  <template v-if="tab === 'Assignments'">
    <AssignmentsTab />
  </template>
  <template v-if="tab === 'Grades'"> <GradesTab /> </template>
  <template v-if="tab === 'Announcements'"> <AnnouncementsTab /> </template>
</template>
<script setup lang="ts">
// logic to handle tab state

import { ref } from "vue";
import ContentTabVue from "@/components/course/tabs/ContentTab.vue";
import type { SectionTab } from "typings/sectionViewTabs";
import AssignmentsTab from "@/components/course/tabs/AssignmentsTab.vue";
import GradesTab from "@/components/course/tabs/GradesTab.vue";
import AnnouncementsTab from "@/components/course/tabs/announcementsTab.vue";
const tab = ref<SectionTab>("Course Content");

function switchTab(newIndex: SectionTab) {
  tab.value = newIndex;
}
</script>
<style></style>
