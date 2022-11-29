<template>
  <NModal></NModal>
</template>
<script setup lang="ts">
import { NModal } from "naive-ui";

interface Submission {
  submissionDate: string;
  comment?: string;
  fileUrls?: string[];
}

interface GradeModalProps {
  visible: boolean;
  score?: number;
  submissions: Submission[];
}
</script>
<style></style>
