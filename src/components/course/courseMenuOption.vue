<template>
  <NCard
    hoverable
    class="t-my-2 t-cursor-pointer t-rounded-md t-border-1"
    content-style="padding: 8px; display: flex; align-items: center"
  >
    <span
      :class="`t-h-full t-inline-flex t-justify-center t-p-1 t-items-center  t-rounded-md t-mr-3 ${props.iconBG}`"
    >
      <icon></icon>
    </span>

    <span class="t-h-full t-font-medium">{{ props.label }}</span>
  </NCard>
</template>
<script setup lang="ts">
import { Icon } from "@vicons/utils";
import { NIcon, NCard } from "naive-ui";
import type { SectionTab } from "typings/CourseViewTabs";
import { h, type Component } from "vue";

interface CourseOption {
  label: string;
  iconBG: string;
  iconFill: string;
  isCurrent: boolean;
  icon: Component;
}

const renderIcon = (icon: Component, options?: { [key: string]: string }) => {
  return () => {
    return h(NIcon, options, {
      default: () => h(icon),
    });
  };
};

const props = defineProps<CourseOption>();
// utilities

const icon = renderIcon(props.icon, {
  color: props.iconFill,
  class: "t-h-full t-inline-flex t-items-center",
  size: "20",
});
</script>
<style></style>
