<template>
  <!-- This is the isntructor! -->
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
import ContentTabVue from "@/components/course/tabs/ContentTab.vue";
import type { Role } from "@/enums/roles";
import { useAuth } from "@/stores/auth";
import type { SectionTab } from "typings/CourseViewTabs";
import { ref } from "vue";

interface SectionSlotProps {
  sectionId: number;
  role: Role;
  tab: SectionTab;
}

const props = defineProps<SectionSlotProps>();
const auth = useAuth();
</script>
<style lang=""></style>
