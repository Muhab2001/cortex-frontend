<template>
  <NCard
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid"
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
            :line-clamp="2"
            class="t-font-semibold t-text-lg"
            >Submission #{{ props.count }}</NEllipsis
          >
        </span>
      </div>
    </div>
    <section v-if="props.comment" class="t-w-full">
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
    </section>
    <section class="t-w-full">
      <NDivider title-placement="left" class="t-py-0 t-my-3 t-mt-3"
        ><NIcon
          size="22"
          color="#da9351"
          :component="FileCopyRound"
          class="t-mr-2"
        />
        <span class="t-text-gray-600 t-font-medium"
          >Attachements</span
        ></NDivider
      >
      <div
        v-if="props.fileUrls"
        name="file-contents"
        class="t-w-full t-mt-1 t-px-2"
      >
        <FileAttachement
          v-for="fileURL in props.fileUrls"
          :editable="false"
          :key="fileURL"
          :file-url="fileURL"
          :active="true"
          :filetype="fileURL.split('.').slice(-1)[0] as FileType"
        />
      </div>
      <NText class="t-px-2" v-else>No Files Attached</NText>
    </section>
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <NDivider class="t-py-0 t-my-2"></NDivider>
        <span class="t-font-thin t-mr-2">Submitted at </span>
        <span class="t-font-medium t-text-blue-400">{{
          props.submissionDate
        }}</span>
      </div>
    </template>
  </NCard>
</template>
<script setup lang="ts">
import FileAttachement from "@/components/utils/fileAttachement.vue";
import type { FileType } from "@/enums/fileTypes";
import { CommentMultiple24Filled } from "@vicons/fluent";
import { FileCopyRound } from "@vicons/material";
import { NCard, NText, NEllipsis, NDivider, NIcon } from "naive-ui";

interface Submission {
  submissionDate: string;
  comment?: string;
  fileUrls?: string[];
  count: number;
}

const props = defineProps<Submission>();
</script>
<style></style>
