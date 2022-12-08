<script setup lang="ts">
import { NCard, NDivider, NEllipsis, NTag } from "naive-ui";
interface AnnouncmentProps {
  title: string;
  content: string;
  lastUpdate: string;
  courseId: string;
  courseName: string;
  sectionNo: number | string;

  tag: string;
}

const props = defineProps<AnnouncmentProps>();
</script>
<template>
  <NCard
    class="t-rounded-lg t-mb-3 t-cursor-pointer t-border-solid t-border-[2px] t-min-w-[80vw] md:t-min-w-full t-snap-center t-ml-2"
    content-style="width: 100%; padding: 0px; height: 300px"
    header-style="padding-bottom: 0;"
    hoverable
    size="small"
  >
    <template #header
      ><div class="t-d-flex t-w-full t-justify-between">
        <div
          class="t-flex t-items-center t-justify-between t-w-full"
          id="course-info"
        >
          <span id="course-meta-info" class="t-flex t-items-center t-h-fit">
            <span class="t-font-bold t-mr-2 t-text-lg t-text-blue-500">{{
              props.courseId
            }}</span
            ><span
              class="t-h-full t-text-xs t-font-medium t-bg-blue-200 t-py-[0.1rem] t-px-2 t-rounded-md t-text-blue-600"
              >{{ props.sectionNo }}</span
            >
          </span>
          <NTag secondary strong type="info" class="t-py-1 t-px-2 t-rounded-md">
            {{ props.tag }}
          </NTag>
        </div>
        <NEllipsis :line-clamp="1" class="t-text-sm t-pt-2">{{
          props.courseName
        }}</NEllipsis>
      </div>
    </template>
    <div class="t-p-5 t-pt-2">
      <NDivider class="t-my-0 t-mb-2" />
      <h1 class="t-font-bold t-mb-1 t-text-lg">{{ props.title }}</h1>
      <NEllipsis
        expand-trigger="click"
        :tooltip="false"
        line-clamp="2"
        class="t-text-slate-500 t-leading-4 dark:t-text-gray-400"
      >
        {{ props.content }}
      </NEllipsis>
    </div>
  </NCard>
</template>
<style></style>
