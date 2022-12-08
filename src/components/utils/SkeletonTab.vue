<script setup lang="ts">
import { reactive, ref, onBeforeMount } from "vue";
import type { AssignmentItemProps } from "typings/CourseViewTabs";
import AssignmentItem from "@/components/course/items/AssignmentItem.vue";

import { useAuth } from "@/stores/auth";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import {
  AddCircle24Filled,
  ClipboardBulletListLtr20Filled,
  EmojiSurprise20Filled,
} from "@vicons/fluent";
import { NCard, NButton, NDivider, NIcon, NSkeleton } from "naive-ui";
import LoadingItem from "./LoadingItem.vue";

const props = defineProps<{ editable: boolean }>();
</script>
<template>
  <NCard
    class="t-border-solid t-border-[2px]"
    content-style="padding: 16px 8px; padding-top:0"
    header-style="padding-bottom: 0;"
  >
    <!-- tab header -->
    <template #header>
      <div class="t-hidden md:t-visible md:t-flex t-items-center">
        <!-- icon -->

        <!-- the header -->
        <NSkeleton text height="30px" :repeat="1"></NSkeleton>
      </div>
      <NButton
        secondary
        strong
        class="t-w-full t-mt-0 md:t-mt-3 t-mb-5 md:t-mb-0"
        type="info"
      >
        <NSkeleton text height="30px" :repeat="1"></NSkeleton>
        <NSkeleton text height="30px" :repeat="1"></NSkeleton
      ></NButton>
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- 2 loading card placeholders -->
    <LoadingItem :editable="props.editable" />
    <LoadingItem :editable="props.editable" />
  </NCard>
</template>

<style></style>
