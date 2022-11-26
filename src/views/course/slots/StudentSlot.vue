<template>
  <template v-if="props.tab === 'Course Content'">
    <ContentTabVue
      :role="auth.userProfile.role"
      :section-id="props.sectionId"
    />
  </template>
  <template v-if="props.tab === 'Assignments'">
    <AssignmentsTab
      :role="auth.userProfile.role"
      :section-id="props.sectionId"
    />
  </template>
  <template v-if="props.tab === 'Grades'">
    <GradesTab :role="auth.userProfile.role" :section-id="props.sectionId" />
  </template>
  <template v-if="props.tab === 'Announcements'">
    <AnnouncementsTab
      :role="auth.userProfile.role"
      :section-id="props.sectionId"
    />
  </template>
</template>
<script setup lang="ts">
// logic to handle tab state

import { ref } from "vue";
import ContentTabVue from "@/components/course/tabs/ContentTab.vue";
import AssignmentsTab from "@/components/course/tabs/AssignmentsTab.vue";
import GradesTab from "@/components/course/tabs/GradesTab.vue";
import AnnouncementsTab from "@/components/course/tabs/AnnouncementsTab.vue";
import { useAuth } from "@/stores/auth";
import type { SectionTab } from "typings/CourseViewTabs";
import type { Role } from "@/enums/roles";

interface SectionSlotProps {
  sectionId: number;
  role: Role;
  tab: SectionTab;
}

const props = defineProps<SectionSlotProps>();
const auth = useAuth();
</script>
<style></style>
