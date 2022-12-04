<script setup lang="ts">
import type { FileType } from "@/enums/fileTypes";
import { Delete24Filled, Edit16Filled, Folder24Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import {
  NButton,
  NCard,
  NDivider,
  NEllipsis,
  NIcon,
  useDialog,
  useMessage,
  useLoadingBar,
} from "naive-ui";
import { h, type Component, ref, reactive, watch, computed } from "vue";
import FileAttachement from "@/components/utils/fileAttachement.vue";
import VisibilityDropdown from "../utils/VisibilityDropdown.vue";
import { useIcon } from "@/composables/useIcon";
import { AxiosInstance } from "@/axios";

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
const loading = useLoadingBar();
const messenger = useMessage();

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

function editItem() {
  emits("edit", {
    title: itemState.title,
    description: itemState.description,
    id: props.id,
    fileUrls: itemState.fileUrls,
    visible: itemState.visible,
  });
}

async function toggleContentForSection() {
  try {
    loading.start();
    await AxiosInstance.patch("content/" + props.id, {
      visible: +!itemState.visible,
    });
    messenger.success(
      `Content ${itemState.visible ? "hidden" : "revealed"} successfully`
    );
    loading.finish();
    itemState.visible = !itemState.visible;
  } catch (e) {
    loading.error();
    messenger.error("Content visibility update failed");
  }
}

function deleteFile(fileURL: string) {
  // fire a confirmation modal, and delete on confirmation
  dialog.warning({
    title: "Delete a file",
    content: "Are you sure you would like to delete the file?",
    positiveText: "Confirm",
    negativeText: "Cancel",
    maskClosable: true,
    onPositiveClick: async () => {
      await AxiosInstance.put("content/file/" + props.id, {
        target: fileURL.replace(/.*\//g, ""),
      });
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
    class="t-rounded-md t-w-full t-mb-2 t-break-inside-avoid t-cursor-pointer t-border-solid t-border-[2px]"
    content-style="display:flex; align-items: center; padding: 12px; flex-direction: column; padding-bottom: 1px"
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
            <span class="t-mr-2 t-h-full t-flex t-items-center"
              ><headerIcon></headerIcon></span
            ><NEllipsis
              expand-trigger="click"
              :line-clamp="1"
              class="t-font-semibold t-text-lg"
              >{{ itemState.title }}</NEllipsis
            >
          </span>
          <span
            class="t-min-w-[120px]"
            v-if="props.editable"
            name="editing-bar"
          >
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
              @single-toggle="toggleContentForSection"
            ></VisibilityDropdown>
          </span>
        </span>
        <NEllipsis
          line-clamp="3"
          class="t-text-sm t-text-slate-500"
          v-if="itemState.description"
          name="item-description"
          >{{ itemState.description }}</NEllipsis
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
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <NDivider class="t-py-0 t-my-1"></NDivider>
        <span class="t-font-thin t-mr-2">Last Updated </span>
        <span
          :class="`t-font-medium ${
            itemState.visible ? 't-text-blue-400' : 't-text-gray-500'
          }`"
          >{{ new Date(itemState.lastUpdated).toLocaleString() }}</span
        >
      </div>
    </template>
  </NCard>
</template>

<style></style>
