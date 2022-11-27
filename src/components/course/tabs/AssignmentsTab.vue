<script setup lang="ts">
import { reactive, ref } from "vue";
import type { AssignmentItemProps } from "typings/CourseViewTabs";
import AssignmentItem from "@/components/course/items/AssignmentItem.vue";

import { useAuth } from "@/stores/auth";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import {
  AddCircle24Filled,
  ClipboardBulletListLtr20Filled,
} from "@vicons/fluent";
import { NCard, NButton, NDivider, NIcon, useDialog } from "naive-ui";
interface SectionTabProps {
  sectionId: number;
  role: Role;
}

interface EditedItemProps {
  id: number;
  title: string;
  description?: string;
  deadline: string;
  maxPoints: number;
  fileUrls: string[];
  visible: boolean;
}

const dialog = useDialog();
const modalState = reactive<{
  visible: boolean;
  mode: "create" | "edit";
  editedItem?: EditedItemProps;
}>({
  visible: false,
  mode: "create",
});

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<AssignmentItemProps[]>([]);

function deleteItem(itemID: number) {
  // display the confirmation dialog
  dialog.warning({
    title: "Delete a file",
    content: "Are you sure you would like to delete the file?",
    positiveText: "Confirm",
    negativeText: "Cancel",
    maskClosable: true,
    onPositiveClick: () => {
      items.value = items.value.filter((item) => item.id !== itemID);
    },
    onMaskClick: () => {},
    onEsc: () => {},
  });
  // on confirmation, remvoe from state list, and create a DELETE request on the api endpoint
}

function updateItem(item: EditedItemProps) {
  modalState.mode = "edit";
  modalState.editedItem = item;
  modalState.visible = true;
}

function showModal() {
  modalState.mode = "create";
  modalState.visible = true;
}
</script>
<template>
  <NCard
    content-style="padding: 16px 8px; padding-top:0"
    header-style="padding-bottom: 0"
  >
    <!-- tab header -->
    <template #header>
      <div class="t-hidden md:t-visible md:t-flex t-items-center">
        <!-- icon -->
        <span
          class="t-h-full t-inline-flex t-justify-center t-p-2 t-items-center t-rounded-md t-mr-3 t-bg-[#C0FFDD]"
          ><Icon size="25" color="#4ECB71">
            <ClipboardBulletListLtr20Filled></ClipboardBulletListLtr20Filled> </Icon
        ></span>
        <!-- the header -->
        <span class="t-text-lg t-font-semibold">Assignments</span>
      </div>
      <NButton
        @click="showModal"
        class="t-w-full t-mt-0 md:t-mt-3 t-mb-5 md:t-mb-0"
        type="info"
        ><span
          ><NIcon class="t-mr-3" size="20"
            ><Icon><AddCircle24Filled></AddCircle24Filled></Icon></NIcon></span
        ><span>Add new content</span></NButton
      >
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- main card content -->
    <div>
      <template v-for="item in items" :key="item.id">
        <AssignmentItem
          :id="item.id"
          :deadline="item.deadline"
          :editable="props.role == Role.INSTRUCTOR"
          :maxPoints="item.maxPoints"
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
        />
      </template>
    </div>
  </NCard>
</template>

<style></style>
