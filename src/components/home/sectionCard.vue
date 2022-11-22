<script setup lang="ts">
import { useAuth } from "@/stores/auth";
import { NAvatar, NCard, NEllipsis, NTooltip } from "naive-ui";
import { useRouter } from "vue-router";

interface SectionCardProps {
  courseName: string;
  sectionNum: number | string;
  sectionId: number;
  courseId: string;
  coverUrl: string;
  instructorImgUrl: string;
  clickable: boolean;
}

const props = defineProps<SectionCardProps>();
const auth = useAuth();
const router = useRouter();
</script>

<template>
  <NCard
    class="t-rounded-lg t-mb-3 t-cursor-pointer t-border-solid t-border-[2px]"
    content-style="width: 100%; padding: 0px; height: 300px"
    @click="
      router.push({
        path: '/course',
        params: {
          courseName: props.courseName,
          courseId: props.courseId,
          sectionNum: props.sectionNum,
          sectionId: props.sectionId,
        },
      })
    "
    hoverable
  >
    <img
      class="t-hidden md:t-flex t-w-full t-rounded-lg t-h-[200px]"
      :src="props.coverUrl"
      :alt="courseName + ' Section cover'"
    />
    <div class="t-px-4 t-flex t-justify-between t-w-full t-items-center">
      <div class="t-w-fit t-py-2 title-container">
        <div>
          <span class="t-font-bold t-mr-2 t-text-lg">{{ props.courseId }}</span>
          <span
            ><NTooltip trigger="hover" placement="bottom">
              <template #trigger>
                <span
                  class="t-text-sm t-font-medium t-bg-blue-200 t-py-[0.1rem] t-px-2 t-rounded-md t-text-blue-600"
                  >{{ props.sectionNum }}</span
                >
              </template>
              Section # {{ props.sectionNum }}
            </NTooltip></span
          >
        </div>
        <NEllipsis :line-clamp="1">{{ props.courseName }}</NEllipsis>
      </div>
      <NAvatar round :src="props.instructorImgUrl" />
    </div>
  </NCard>
</template>

<style>
.title-container::before {
  content: "";
  margin: auto;
  border-radius: 1.5px;
  height: 60% !important;
  width: 3px !important;
  background-color: rgb(116, 215, 255);
  position: absolute;
  left: -9px;
  top: 14px;
}
</style>
