<script setup lang="ts">
import { NCard, NDivider, NSkeleton } from "naive-ui";

const props = defineProps<{ editable: boolean }>();
</script>

<template>
  <NCard
    hoverable
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid t-cursor-pointer t-border-solid t-border-[2px]"
    content-style="display:flex; align-items: center; padding: 16px; flex-direction: column; padding-bottom: 1px"
    footer-style="padding-bottom: 6px"
  >
    <div name="text-content" class="t-w-full">
      <span
        class="t-inline-flex t-flex-col t-w-full"
        name="item-meta-container"
      >
        <NSkeleton class="t-mb-2" text height="20px" width="40%"></NSkeleton>
        <NSkeleton class="t-mb-2" text height="20px"></NSkeleton
        ><NSkeleton
          class="t-mb-2"
          text
          height="20px"
          :repeat="1"
          width="50%"
        ></NSkeleton>
      </span>
    </div>
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <NDivider class="t-py-0 t-my-1"></NDivider>
        <NSkeleton text height="20px" class="t-my-3" :repeat="1"></NSkeleton>
      </div>
    </template>
  </NCard>
</template>

<style></style>
