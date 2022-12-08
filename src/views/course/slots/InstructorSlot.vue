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
import type { Role } from "@/enums/roles";
import { useAuth } from "@/stores/auth";
import type { SectionTab } from "typings/CourseViewTabs";
import { watch, defineAsyncComponent } from "vue";
import SkeletonTab from "@/components/utils/SkeletonTab.vue";

const AnnouncementsTab = defineAsyncComponent({
  loader: () => import("@/components/course/tabs/AnnouncementsTab.vue"),
  loadingComponent: SkeletonTab,
});
const AssignmentsTab = defineAsyncComponent({
  loader: () => import("@/components/course/tabs/AssignmentsTab.vue"),
  loadingComponent: SkeletonTab,
});
const ContentTabVue = defineAsyncComponent({
  loader: () => import("@/components/course/tabs/ContentTab.vue"),
  loadingComponent: SkeletonTab,
});
const GradesTab = defineAsyncComponent({
  loader: () => import("@/components/course/tabs/GradesTab.vue"),
  loadingComponent: SkeletonTab,
});

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
