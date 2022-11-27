<script setup lang="ts">
import type { FileType } from "@/enums/fileTypes";
import { Delete24Filled, Edit16Filled, Folder24Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NButton, NCard, NEllipsis, NIcon, useDialog } from "naive-ui";
import { h, type Component, ref, reactive, watch, computed } from "vue";
import FileAttachement from "@/components/utils/fileAttachement.vue";
import VisibilityDropdown from "../utils/VisibilityDropdown.vue";
import { useIcon } from "@/composables/useIcon";

interface ContentItemProps {
  id: number;
  title: string;
  description?: string;
  lastUpdated: string;
  editable: boolean;
  fileUrls: string[];
  visible: boolean;
}

const props = defineProps<ContentItemProps>();
const emits = defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", item: Omit<ContentItemProps, "editable" | "lastUpdated">): void;
}>();
const dialog = useDialog();
const itemFiles = ref<string[]>(props.fileUrls);

const iconUtils = useIcon();

const itemState = reactive<ContentItemProps>({ ...props });

const headerIcon = computed(() =>
  iconUtils.renderIcon(Folder24Filled, {
    color: itemState.visible ? "#F49D1A" : "grey",
    size: "24",
  })
);

// TODO: supply functions that trigger deletion or editing of content files

function updateFiles() {
  // TODO: open a popup to edit the files
}

function editItem() {
  emits("edit", {
    title: itemState.title,
    description: itemState.description,
    id: props.id,
    fileUrls: itemState.fileUrls,
    visible: itemState.visible,
  });
}

function toggleContentForSection() {
  itemState.visible = !itemState.visible;
}

function toggleContentForAll() {
  itemState.visible = !itemState.visible;
  // TODO: api call to toggle all other items in the same group
}

function deleteFile(fileURL: string) {
  // fire a confirmation modal, and delete on confirmation
  dialog.warning({
    title: "Delete a file",
    content: "Are you sure you would like to delete the file?",
    positiveText: "Confirm",
    negativeText: "Cancel",
    maskClosable: true,
    onPositiveClick: () => {
      itemFiles.value = itemFiles.value.filter((url) => url !== fileURL);
    },
    onMaskClick: () => {},
    onEsc: () => {},
  });
  // on confirmation, remove the delete object from the state, and call the DELETE method on the endpoint
}
</script>

<template>
  <NCard
    hoverable
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid t-cursor-pointer"
    content-style="display:flex; align-items: center; padding: 12px; flex-direction: column"
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
            <span class="t-mr-2 t-h-full t-flex t-items-center"
              ><headerIcon></headerIcon></span
            ><NEllipsis
              expand-trigger="click"
              :line-clamp="1"
              class="t-font-semibold t-text-lg"
              >{{ itemState.title }}</NEllipsis
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
            <VisibilityDropdown
              :visible="itemState.visible"
              @group-toggle="toggleContentForAll"
              @single-toggle="toggleContentForSection"
            ></VisibilityDropdown>
          </span>
        </span>
        <NEllipsis
          line-clamp="3"
          class="t-text-md t-text-slate-500"
          v-if="itemState.description"
          name="item-description"
          >{{ itemState.description }}</NEllipsis
        >
        <span
          :class="`t-font-medium ${
            itemState.visible ? 't-text-blue-400' : 't-text-gray-500'
          }`"
          >{{ itemState.lastUpdated }}</span
        >
      </span>
    </div>
    <!-- TODO: list all the files using tag elements -->
    <div name="file-contents" class="t-w-full t-mt-3">
      <FileAttachement
        @delete="deleteFile"
        v-for="fileURL in itemFiles"
        :editable="props.editable"
        :key="fileURL"
        :file-url="fileURL"
        :filetype="fileURL.split('.').slice(-1)[0] as FileType"
        :active="itemState.visible"
      />
    </div>
  </NCard>
</template>

<style></style>
