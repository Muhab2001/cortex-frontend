<script setup lang="ts">
import type { FileType } from "@/enums/fileTypes";
import { Delete24Filled, Edit16Filled, Folder24Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NButton, NCard, NEllipsis, NIcon, useDialog } from "naive-ui";
import { h, type Component, ref } from "vue";
import FileAttachement from "@/components/utils/fileAttachement.vue";

interface ContentItemProps {
  id: number;
  title: string;
  description?: string;
  lastUpdated: string;
  editable: boolean;
  fileUrls: string[];
}

const props = defineProps<ContentItemProps>();
const emits = defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", item: Omit<ContentItemProps, "editable" | "lastUpdated">): void;
}>();
const dialog = useDialog();
const itemFiles = ref<string[]>(props.fileUrls);

const renderIcon = (icon: Component, options?: { [key: string]: string }) => {
  return () => {
    return h(NIcon, options, {
      default: () => h(icon),
    });
  };
};

const headerIcon = renderIcon(Folder24Filled, { color: "#F49D1A", size: "24" });

// TODO: supply functions that trigger deletion or editing of content files

function deleteItem() {}

function updateFiles() {
  // TODO: open a popup to edit the files
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
    class="t-rounded-md t-w-full"
    content-style="display:flex; align-items: center; padding: 12px; flex-direction: column"
  >
    <div name="text-content" class="t-w-full">
      <span class="t-h-full t-w-full t-flex t-items-center">
        <span
          class="t-inline-flex t-flex-col t-w-full"
          name="item-meta-container"
        >
          <span
            name="item-title"
            class="t-h-full t-inline-flex t-items-center t-justify-between t-w-full"
          >
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
            <span v-if="props.editable" name="editing-bar">
              <NButton
                class="t-mr-2"
                @click="deleteItem"
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
              <NButton @click="updateFiles" strong secondary circle type="info">
                <NIcon size="18">
                  <Icon>
                    <Edit16Filled></Edit16Filled>
                  </Icon>
                </NIcon>
              </NButton>
            </span>
          </span>
          <span
            class="t-text-md t-text-slate-500"
            v-if="props.description"
            name="item-description"
            >{{ props.description }}</span
          >
          <span
            ><span class="t-font-medium t-text-blue-400">{{
              props.lastUpdated
            }}</span></span
          >
        </span>
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
      />
    </div>
  </NCard>
</template>

<style></style>
