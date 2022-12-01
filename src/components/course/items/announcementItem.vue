<script setup lang="ts">
import { useIcon } from "@/composables/useIcon";
import { Envelope } from "@vicons/fa";
import { Delete24Filled, Edit16Filled, Folder24Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import {
  NButton,
  NCard,
  NDivider,
  useDialog,
  NEllipsis,
  NIcon,
} from "naive-ui";
import { computed, reactive } from "vue";

interface AnnouncementItemProps {
  id: number;
  subject: string;
  content: string;
  lastUpdated: string;
  editable: boolean;
  tag: string;
}

const props = defineProps<AnnouncementItemProps>();
const emits = defineEmits<{
  (e: "delete", id: number): void;
  (
    e: "edit",
    item: Omit<AnnouncementItemProps, "editable" | "lastUpdated">
  ): void;
}>();
const iconUtils = useIcon();
const itemState = reactive<AnnouncementItemProps>({ ...props });
const headerIcon = computed(() =>
  iconUtils.renderIcon(Envelope, {
    color: "#F49D1A",
    size: "24",
  })
);
// TODO: supply functions that trigger deletion or editing of content files
const dialog = useDialog();

function deleteItem() {}

function updateItem() {
  // TODO: open a popup to edit the files
}

function editItem() {
  emits("edit", {
    subject: itemState.subject,
    content: itemState.content,
    id: props.id,
    tag: itemState.tag,
  });
}
</script>

<template>
  <NCard
    hoverable
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid t-cursor-pointer t-border-solid t-border-[2px] t-border-gray-200"
    content-style="display:flex; align-items: center; padding: 16px; flex-direction: column; padding-bottom: 1px"
    footer-style="padding-bottom: 6px"
  >
    <div name="text-content" class="t-w-full">
      <span
        class="t-inline-flex t-flex-col t-w-full"
        name="item-meta-container"
      >
        <span
          name="item-title"
          class="t-h-full t-inline-flex t-items-center t-justify-between t-w-full t-mb-2"
        >
          <span name="item-text-title" class="t-inline-flex t-items-center">
            <span class="t-mr-3 t-h-full t-flex t-items-center"
              ><headerIcon></headerIcon></span
            ><NEllipsis
              expand-trigger="click"
              :line-clamp="1"
              class="t-font-semibold t-text-md"
              >{{ itemState.subject }}</NEllipsis
            >
          </span>

          <span v-if="props.editable" name="editing-bar">
            <NButton
              class="t-mr-2"
              @click="$emit('delete', props.id)"
              strong
              secondary
              circle
              type="error"
              ><NIcon size="18">
                <Icon>
                  <Delete24Filled></Delete24Filled>
                </Icon>
              </NIcon>
            </NButton>
            <NButton
              class="t-mr-2"
              @click="editItem"
              strong
              secondary
              circle
              type="info"
            >
              <NIcon size="18">
                <Icon>
                  <Edit16Filled></Edit16Filled>
                </Icon>
              </NIcon>
            </NButton>
          </span>
        </span>
        <div class="t-flex t-flex-wrap">
          <span
            class="t-py-[0.2rem] t-px-1 t-rounded-sm t-text-xs t-mb-3 t-bg-pink-500 t-text-white t-mr-2"
            >{{ itemState.tag }}</span
          >
        </div>
        <NEllipsis
          line-clamp="3"
          class="t-text-md t-text-slate-500"
          v-if="itemState.content"
          expand-trigger="click"
          name="item-description"
          >{{ itemState.content }}</NEllipsis
        >
      </span>
    </div>
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <NDivider class="t-py-0 t-my-1"></NDivider>
        <span class="t-font-thin t-mr-2">Last Updated </span>
        <span class="t-font-medium t-text-blue-400">{{
          itemState.lastUpdated
        }}</span>
      </div>
    </template>
  </NCard>
</template>

<style></style>
