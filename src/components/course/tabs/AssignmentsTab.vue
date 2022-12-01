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
import AssignmentModal from "../utils/AssignmentModal.vue";
import SubmissionModal from "../utils/SubmissionModal.vue";
interface SectionTabProps {
  sectionId: number;
  role: Role;
}

interface EditedItemProps {
  id: number;
  title: string;
  description?: string;
  deadline: number;
  maxPoints: number;
  submissions?: number;
  fileUrls: string[];
  visible: boolean;
  isUnlimited: boolean;
}

const dialog = useDialog();
const assignmentModalState = reactive<{
  visible: boolean;
  mode: "create" | "edit";
  editedItem?: EditedItemProps;
}>({
  visible: false,
  mode: "create",
});
const submissionModalState = reactive<{
  visible: boolean;
  assignmentId: number;
  title: string;
  description?: string;
}>({
  visible: false,
  assignmentId: -1,
  title: "",
});

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<AssignmentItemProps[]>([
  {
    id: 1,
    deadline: Date.now(),
    maxPoints: 20,
    title: "Project Phase 3",
    lastUpdated: new Date().toLocaleString(),
    fileUrls: [
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg",
      "https://blackboard.kfupm.edu.sa/bbcswebdav/pid-1833278-dt-content-rid-22203929_1/courses/221-GS-318-merged-nawaf/182-GS-318-merged-nawaf_ImportedContent_20181225020849/Chapter%2024.pdf",
    ],
    visible: true,
    description: "This is the assignment for the third project phase",
    submissions: 3,
    submissionsLeft: 2,
    isSubmitted: true,
    isUnlimited: false,
  },
  {
    id: 2,
    deadline: Date.now(),
    maxPoints: 20,
    title: "Assignment #3",
    lastUpdated: new Date().toLocaleString(),
    fileUrls: [
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg",
      "https://blackboard.kfupm.edu.sa/bbcswebdav/pid-1833278-dt-content-rid-22203929_1/courses/221-GS-318-merged-nawaf/182-GS-318-merged-nawaf_ImportedContent_20181225020849/Chapter%2024.pdf",
    ],
    visible: true,
    description: "This is the assignment for the third project phase",
    isUnlimited: true,
    isSubmitted: false,
  },
]);

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
  assignmentModalState.mode = "edit";
  assignmentModalState.editedItem = item;
  assignmentModalState.visible = true;
}

function showAssignmentModal() {
  assignmentModalState.mode = "create";
  assignmentModalState.visible = true;
}

function showSubmissionModal(
  title: string,
  assignmnentId: number,
  description?: string
) {
  submissionModalState.title = title;
  submissionModalState.description = description;
  submissionModalState.assignmentId = assignmnentId;
  submissionModalState.visible = true;
}
</script>
<template>
  <AssignmentModal
    :v-if="props.role == Role.INSTRUCTOR"
    :mode="assignmentModalState.mode"
    :visible="assignmentModalState.visible"
    :target-item="assignmentModalState.editedItem"
    @closed="
      () => {
        assignmentModalState.visible = false;
      }
    "
  />
  <SubmissionModal
    :v-if="props.role == Role.STUDENT"
    v-bind="submissionModalState"
    @closed="submissionModalState.visible = false"
  />
  <NCard
    class="t-border-solid t-border-[2px]"
    content-style="padding: 16px 8px; padding-top:0"
    header-style="padding-bottom: 0;"
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
        :v-if="props.role == Role.INSTRUCTOR"
        @click="showAssignmentModal"
        class="t-w-full t-mt-0 md:t-mt-3 t-mb-5 md:t-mb-0"
        type="info"
        ><span
          ><NIcon class="t-mr-3" size="20"
            ><Icon><AddCircle24Filled></AddCircle24Filled></Icon></NIcon></span
        ><span>New Assignment</span></NButton
      >
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- main card content -->

    <div class="t-columns-1 lg:t-columns-2">
      <template v-for="item in items" :key="item.id">
        <AssignmentItem
          :section-id="props.sectionId"
          @edit="updateItem"
          @delete="deleteItem"
          @submit="showSubmissionModal"
          :id="item.id"
          :deadline="item.deadline"
          :editable="props.role == Role.INSTRUCTOR"
          :maxPoints="item.maxPoints"
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
          :visible="item.visible"
          :file-urls="item.fileUrls"
          :submissions="item.submissions"
          :submissions-left="item.submissionsLeft"
          :is-submitted="item.isSubmitted"
          :is-unlimited="item.isUnlimited"
        />
      </template>
    </div>
  </NCard>
</template>

<style></style>
