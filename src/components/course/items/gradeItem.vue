<script setup lang="ts">
import { useRouter } from "vue-router";

interface GradeItemProps {
  title: string;
  description?: string;
  lastUpdated?: string;
  editable: boolean;
  score?: number;
  assignmentId: number;
}

const props = defineProps<GradeItemProps>();
const router = useRouter();
// TODO: a function to open the grade page, for instructors only

function editGrades() {}

function navigateToGradeView() {
  router.push({
    path: "/grade",
    params: {
      assignmentId: props.assignmentId,
    },
  });
}
</script>

<template>
  <div>
    <span name="item-meta-container">
      <span name="item-title">{{ props.title }}</span>
      <span v-if="props.description" name="item-description"></span>
      <span v-if="props.lastUpdated"
        >Last updated by {{ props.lastUpdated }}</span
      >
    </span>
    <span v-if="props.score" name="score">
      <span>{{ props.score }}</span>
    </span>
    <span v-else>Not Graded</span>
  </div>
</template>

<style></style>
