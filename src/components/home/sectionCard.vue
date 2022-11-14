<script setup lang="ts">
import { NAvatar, NCard, NTooltip } from "naive-ui";

interface SectionCardProps {
  courseName: string;
  sectionNum: number | string;
  courseId: string;
  coverUrl: string;
  instructorImgUrl: string;
}

const props = defineProps<SectionCardProps>();
</script>

<template>
  <NCard
    class="t-rounded-lg t-mb-3 t-cursor-pointer"
    content-style="width: 100%; padding: 0px; height: 300px"
    hoverable
  >
    <img
      class="t-w-full t-rounded-lg t-h-[200px]"
      :src="props.coverUrl"
      :alt="courseName + ' Section cover'"
    />
    <div class="t-px-4 t-flex t-justify-between t-w-full t-items-center">
      <div class="t-w-fit t-py-2">
        <div>
          <span class="t-font-bold t-mr-2 t-text-lg">{{ props.courseId }}</span>
          <span
            ><NTooltip trigger="hover" placement="bottom">
              <template #trigger>
                <span
                  class="t-text-md t-font-semibold t-bg-blue-200 t-py-[0.175rem] t-px-2 t-rounded-md t-text-blue-600"
                  >{{ props.sectionNum }}</span
                >
              </template>
              Section # {{ props.sectionNum }}
            </NTooltip></span
          >
        </div>
        <span>{{ props.courseName }}</span>
      </div>
      <NAvatar round :src="props.instructorImgUrl" />
    </div>
  </NCard>
</template>

<style></style>
