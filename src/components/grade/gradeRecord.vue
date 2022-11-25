<template>
  <div>
    <span>{{ props.studentName }}</span> <span>{{ props.studentId }}</span>
    <NInput type="text"></NInput>
  </div>
</template>
<script setup lang="ts">
import { NInput } from "naive-ui";

interface GradeRecordProps {
  studentName: string;
  studentId: string;
  score?: number;
  maxScore: number;
}

const props = defineProps<GradeRecordProps>();
</script>
<style lang=""></style>
