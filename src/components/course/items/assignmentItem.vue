<script setup lang="ts">
import FileAttachement from "@/components/utils/fileAttachement.vue";
import { useIcon } from "@/composables/useIcon";
import type { FileType } from "@/enums/fileTypes";
import {
  CheckboxChecked20Filled,
  CheckboxCheckedSync16Filled,
  CheckboxCheckedSync16Regular,
  Clock16Filled,
  Delete24Filled,
  Edit16Filled,
  Folder24Filled,
} from "@vicons/fluent";
import { AssignmentSharp } from "@vicons/material";
import { Icon } from "@vicons/utils";
import {
  NButton,
  NDivider,
  useDialog,
  NCard,
  NIcon,
  NTag,
  NSpace,
} from "naive-ui";
import type { ContentItemProps } from "typings/CourseViewTabs";
import { computed, reactive, ref } from "vue";
import VisibilityDropdown from "../utils/VisibilityDropdown.vue";
import { CheckmarkCircle } from "@vicons/ionicons5";

interface AssignmentItemProps {
  id: number;
  title: string;
  description?: string;
  lastUpdated: string;
  editable: boolean;
  submissions: number | string; // an instructor view does not contain the submission count
  submissionsLeft?: number;
  deadline: string;
  fileUrls: string[];
  maxPoints: number;
  visible: boolean;
}

const props = defineProps<AssignmentItemProps>();
const emits = defineEmits<{
  (e: "delete", id: number): void;
  (e: "edit", item: Omit<ContentItemProps, "editable" | "lastUpdated">): void;
}>();
const dialog = useDialog();
const itemFiles = ref<string[]>(props.fileUrls);

const iconUtils = useIcon();

const itemState = reactive<AssignmentItemProps>({ ...props });

const headerIcon = computed(() =>
  iconUtils.renderIcon(AssignmentSharp, {
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
              class="t-font-semibold t-text-lg t-mr-2"
              >{{ itemState.title }}</NEllipsis
            >
            <!-- TODO: add an if-statement to hide for students -->
            <NTag
              v-if="
                props.submissionsLeft &&
                props.submissions > props.submissionsLeft
              "
              type="success"
              :bordered="false"
              round
            >
              Submitted
              <template #icon><NIcon :component="CheckmarkCircle" /></template>
            </NTag>
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
          class="t-text-sm t-text-slate-500"
          v-if="itemState.description"
          name="item-description"
          >{{ itemState.description }}</NEllipsis
        >
      </span>
    </div>
    <div name="file-contents" class="t-w-full t-mt-1">
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
    <NDivider title-placement="left" class="t-py-2 t-my-1">Details</NDivider>

    <NSpace
      name="assignment-specs"
      class="t-flex t-justify-start t-w-full t-px-3 t-pb-3"
    >
      <NTag round size="large" class="t-flex t-items-center t-py-3">
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="Clock16Filled"
            :color="itemState.visible ? '#FB2576' : 'grey'"
            size="25"
          />
        </template>
        <span class="t-font-semibold t-text-dm t-mr-3">Deadline</span
        ><span>{{ itemState.deadline }}</span>
      </NTag>
      <NTag round size="large" class="t-flex t-items-center t-py-3">
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="CheckboxCheckedSync16Filled"
            :color="itemState.visible ? '#009EFF' : 'grey'"
            size="25"
          />
        </template>
        <span class="t-font-semibold t-text-dm t-mr-3">Submissions</span
        ><span>{{ itemState.submissions }}</span>
      </NTag>
      <NTag
        v-if="props.submissionsLeft"
        round
        size="large"
        class="t-flex t-items-center t-py-3"
      >
        <template #icon>
          <NIcon
            class="t-mx-1"
            :component="CheckboxChecked20Filled"
            :color="itemState.visible ? '#82CD47' : 'grey'"
            size="25"
          />
        </template>
        <span class="t-font-semibold t-text-dm t-mr-3">Submissions Left</span
        ><span>{{ itemState.submissionsLeft }}</span>
      </NTag>
    </NSpace>

    <NDivider class="t-py-0 t-my-1"></NDivider>
    <template #footer
      ><div class="t-flex t-flex-wrap">
        <span class="t-font-thin t-mr-2">Last Updated </span>
        <span
          :class="`t-font-medium ${
            itemState.visible ? 't-text-blue-400' : 't-text-gray-500'
          }`"
          >{{ itemState.lastUpdated }}</span
        >
      </div>
    </template>
  </NCard>
</template>

<style></style>
