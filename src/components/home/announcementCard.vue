<template>
  <NCard hoverable size="small">
    <template #header>{{ props.courseId }}</template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard } from "naive-ui";
import { computed, onMounted, onUnmounted, ref } from "vue";

interface announcementProps {
  title: string;
  deadline: string;
  originalDate: string;
  courseId: string;
  sectionNo: number;
}

const props = defineProps<announcementProps>();

let counterId: number | undefined;
const millisecondsDiff = ref<number>(
  new Date(props.deadline).getTime() - Date.now()
);
const daysDiff = computed(() => millisecondsDiff.value / 1000 / 60 / 60 / 24);
const hoursDiff = computed(() => {
  const diff = millisecondsDiff.value - daysDiff.value * 1000 * 60 * 60 * 24;

  return diff / 1000 / 60 / 60;
});

const minutesDiff = computed(() => {
  const diff =
    millisecondsDiff.value -
    daysDiff.value * 1000 * 60 * 60 * 24 -
    hoursDiff.value * 1000 * 60 * 60;

  return diff / 1000 / 60;
});

const secondsDiff = computed(() => {
  const diff =
    millisecondsDiff.value -
    daysDiff.value * 1000 * 60 * 60 * 24 -
    hoursDiff.value * 1000 * 60 * 60 -
    hoursDiff.value * 1000 * 60;

  return diff / 1000;
});

function updateCountdown() {
  millisecondsDiff.value = new Date(props.deadline).getTime() - Date.now();
}

onMounted(() => {
  counterId = setInterval(updateCountdown, 1000);
});

onUnmounted(() => {
  () => {
    clearInterval(counterId);
  };
});
// inject in a setIterval function
</script>

<style></style>
