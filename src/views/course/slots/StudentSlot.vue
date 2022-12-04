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

import { ref, defineAsyncComponent } from "vue";

import { useAuth } from "@/stores/auth";
import type { SectionTab } from "typings/CourseViewTabs";
import type { Role } from "@/enums/roles";

const AnnouncementsTab = defineAsyncComponent(
  () => import("@/components/course/tabs/AnnouncementsTab.vue")
);
const AssignmentsTab = defineAsyncComponent(
  () => import("@/components/course/tabs/AssignmentsTab.vue")
);
const ContentTabVue = defineAsyncComponent(
  () => import("@/components/course/tabs/ContentTab.vue")
);
const GradesTab = defineAsyncComponent(
  () => import("@/components/course/tabs/GradesTab.vue")
);

interface SectionSlotProps {
  sectionId: number;
  role: Role;
  tab: SectionTab;
}

const props = defineProps<SectionSlotProps>();
const auth = useAuth();
</script>
<style></style>
