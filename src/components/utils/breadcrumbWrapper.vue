<template>
  <NBreadcrumb class="t-mb-5 dark:t-text-white">
    <NBreadcrumbItem
      v-for="option in breadCrumb.state.options"
      :key="option.path"
      :href="option.path"
    >
      <span class="t-font-semibold t-text-lg">{{ option.label }}</span>
    </NBreadcrumbItem>
  </NBreadcrumb>
</template>
<script setup lang="ts">
import { useBreadCrumb } from "@/stores/breadcrump";
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
import { watch } from "vue";

const breadCrumb = useBreadCrumb();
</script>
<style lang=""></style>
