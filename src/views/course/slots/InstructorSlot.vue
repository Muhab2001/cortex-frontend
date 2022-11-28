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
  <!-- Delete the conditional rendering clause -->
  <template v-if="props.tab === 'Grades'">
    <GradesTab :role="auth.userProfile.role" :section-id="props.sectionId" />
  </template>
  <template v-if="props.tab === 'Announcements'">
    <!-- this is an announcement -->
    <AnnouncementsTab
      :role="auth.userProfile.role"
      :section-id="props.sectionId"
    />
  </template>
</template>

<script setup lang="ts">
import AnnouncementsTab from "@/components/course/tabs/AnnouncementsTab.vue";
import AssignmentsTab from "@/components/course/tabs/AssignmentsTab.vue";
import ContentTabVue from "@/components/course/tabs/ContentTab.vue";
import GradesTab from "@/components/course/tabs/GradesTab.vue";
import type { Role } from "@/enums/roles";
import { useAuth } from "@/stores/auth";
import type { SectionTab } from "typings/CourseViewTabs";
import { watch } from "vue";

interface SectionSlotProps {
  sectionId: number;
  role: Role;
  tab: SectionTab;
}

const props = defineProps<SectionSlotProps>();
const auth = useAuth();

watch(
  () => props.tab,
  () => {
    console.log(props.tab);
  }
);
</script>
<style lang=""></style>
