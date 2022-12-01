<script setup lang="ts">
import { NCard, NDivider, NEllipsis } from "naive-ui";
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
    class="t-rounded-lg t-mb-3 t-cursor-pointer t-border-solid t-border-[2px]"
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
          <span
            class="t-bg-[#FFBDED] t-text-[#FF04B9] t-font-medium t-rounded-md t-py-1 t-px-2 t-text-xs"
          >
            {{ props.tag }}
          </span>
        </div>
        <span class="t-text-sm">{{ props.courseName }}</span>
      </div>
    </template>

    <div class="t-p-5 t-pt-2">
      <NDivider class="t-my-0 t-mb-2" />
      <h3 class="t-font-bold t-mb-2">{{ props.title }}</h3>
      <NEllipsis
        expand-trigger="click"
        :tooltip="false"
        line-clamp="2"
        class="t-text-slate-500 t-leading-4"
      >
        {{ props.content }}
      </NEllipsis>
    </div>
  </NCard>
</template>
<style></style>
