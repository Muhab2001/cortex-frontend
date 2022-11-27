<template>
  <NButton
    @click="switchTab"
    :class="`t-my-2 t-py-6 t-px-3  t-cursor-pointer t-border-1 ${
      props.contracted ? '' : 't-w-full'
    } ${
      props.isCurrent && props.contracted ? 't-flex-1' : 't-flex-0'
    } t-flex t-justify-start`"
  >
    <span
      :class="` t-w-510 t-h-full t-inline-flex t-justify-center t-p-1 t-items-center  t-rounded-md ${
        props.contracted && !props.isCurrent ? '' : 't-mr-3'
      }  ${props.iconBG}`"
    >
      <icon></icon>
    </span>

    <span
      v-if="!props.contracted || props.isCurrent"
      class="t-h-full t-w-full t-font-semibold"
      >{{ props.label }}</span
    >
  </NButton>
</template>
<script setup lang="ts">
import { useIcon } from "@/composables/useIcon";

import { NButton } from "naive-ui";
import type { Component } from "vue";

interface CourseOption {
  label: string;
  iconBG: string;
  iconFill: string;
  isCurrent: boolean;
  icon: Component;
  extraOptions?: { [key: string]: string };
  contracted?: boolean;
}

const props = defineProps<CourseOption>();
const emits = defineEmits<{
  (e: "switchTab", label: string): void;
}>();

// utilities
const iconUtils = useIcon();
const icon = iconUtils.renderIcon(props.icon, {
  color: props.iconFill,
  class: "t-h-full t-inline-flex t-items-center",
  size: "20",
  ...props.extraOptions,
});

function switchTab() {
  console.log("Before emission");
  emits("switchTab", props.label);
}
</script>
<style></style>
J
