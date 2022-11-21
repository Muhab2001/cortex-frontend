<template>
  <div>
    <span :class="`t-rounded-md t-bg-[${props.colorRGB}]`">
      {{ renderedIcon }}
    </span>
    <span>{{ props.title }}</span>
  </div>
</template>
<script setup lang="ts">
import { Icon } from "@vicons/utils";
import { h, type Component } from "vue";

interface optionProps {
  title: string;
  colorRGB: string;
  icon: Component;
}

const props = defineProps<optionProps>();
const renderedIcon = h(Icon, props.icon);
</script>
<style></style>
