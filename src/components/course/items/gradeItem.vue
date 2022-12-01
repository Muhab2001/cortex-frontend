<script setup lang="ts">
import { useIcon } from "@/composables/useIcon";
import { CommentMultiple24Filled, Star20Filled } from "@vicons/fluent";
import { NCard, NEllipsis, NDivider, NTag, NIcon } from "naive-ui";
import { computed } from "vue";
import { useRouter } from "vue-router";

interface GradeItemProps {
  title: string;
  lastUpdated?: string;
  score?: number;
  maxScore: number;
  comment?: string;
}

const props = defineProps<GradeItemProps>();
const router = useRouter();
const iconUtils = useIcon();
// TODO: a function to open the grade page, for instructors only
const headerIcon = computed(() =>
  iconUtils.renderIcon(Star20Filled, {
    color: "#F49D1A",
    size: "24",
  })
);

const gradeType = (): "success" | "warning" | "error" | "default" => {
  if (!props.score) {
    return "default";
  }
  const percentage = props.score! / props.maxScore;
  if (percentage >= 0.8) {
    return "success";
  } else if (percentage >= 0.5) {
    return "warning";
  } else {
    return "error";
  }
};
</script>

<template>
  <NCard
    hoverable
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid t-cursor-pointer t-border-solid t-border-[2px] t-border-gray-200"
    content-style="display:flex; align-items: center; padding: 12px; flex-direction: column; padding-bottom: 1px"
    footer-style="padding-bottom: 6px"
  >
    <div name="text-content" class="t-w-full">
      <div class="t-flex t-justify-between t-w-full" name="item-meta-container">
        <span name="item-text-title" class="t-inline-flex t-items-center">
          <span class="t-mr-2 t-h-full t-flex t-items-center"
            ><headerIcon></headerIcon></span
          ><NEllipsis
            expand-trigger="click"
            :line-clamp="1"
            class="t-font-semibold t-text-lg"
            >{{ props.title }}</NEllipsis
          >
        </span>
        <span v-if="props.score" name="score">
          <NTag
            size="large"
            :bordered="false"
            :type="gradeType()"
            class="t-p-2 t-rounded-md t-text-md"
            ><span class="t-font-semibold t-mr-1">{{ props.score }}</span
            >/<span class="t-ml-1">{{ props.maxScore }}</span></NTag
          >
        </span>
        <span v-else></span>
      </div>
    </div>
    <template v-if="props.comment">
      <NDivider title-placement="left" class="t-py-0 t-my-1 t-mt-3"
        ><NIcon
          size="22"
          color="#2080f0"
          :component="CommentMultiple24Filled"
          class="t-mr-2"
        />
        <span class="t-text-gray-600 t-font-medium">Comment</span></NDivider
      >
      <p
        icon-placement="left"
        type="warning"
        class="t-w-full t-my-2 t-px-4 t-flex t-items-center t-text-md t-italic"
      >
        {{ props.comment }}
      </p>
    </template>
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <NDivider class="t-py-0 t-my-2"></NDivider>
        <span class="t-font-thin t-mr-2">Last Updated </span>
        <span class="t-font-medium t-text-blue-400">{{
          props.lastUpdated
        }}</span>
      </div>
    </template>
  </NCard>
</template>

<style></style>
