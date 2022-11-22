<template>
  <template v-if="props.tab === 'Course Content'">
    <ContentTabVue />
  </template>
  <template v-if="props.tab === 'Assignments'">
    <AssignmentsTab />
  </template>
  <template v-if="props.tab === 'Grades'"> <GradesTab /> </template>
  <template v-if="props.tab === 'Announcements'">
    <AnnouncementsTab />
  </template>
</template>
<script setup lang="ts">
// logic to handle tab state

import { ref } from "vue";
import ContentTabVue from "@/components/course/tabs/ContentTab.vue";
import type { SectionTabProps } from "typings/CourseViewTabs";
import AssignmentsTab from "@/components/course/tabs/AssignmentsTab.vue";
import GradesTab from "@/components/course/tabs/GradesTab.vue";
import AnnouncementsTab from "@/components/course/tabs/AnnouncementsTab.vue";

const props = defineProps<SectionTabProps>();
</script>
<style></style>
