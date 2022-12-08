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
import {
  NCard,
  NButton,
  NDivider,
  NIcon,
  useDialog,
  useMessage,
} from "naive-ui";
import AssignmentModal from "../utils/AssignmentModal.vue";
import SubmissionModal from "../utils/SubmissionModal.vue";
import { AxiosInstance } from "@/axios";
import { id } from "date-fns/esm/locale";
interface SectionTabProps {
  sectionId: number;
  role: Role;
}

interface EditedItemProps {
  id: number;
  title: string;
  description?: string;
  deadline: number;
  maxScore: number;
  submissions?: number;
  fileUrls: string[];
  visible: boolean;
  isUnlimited: boolean;
  isSubmittable: boolean;
}

const dialog = useDialog();
const messenger = useMessage();
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
const assignmentSheet = reactive<{ records: AssignmentItemProps[] }>({
  records: [],
});

onBeforeMount(async () => {
  assignmentSheet.records = (
    await AxiosInstance.get(`assignments/${props.role}/${props.sectionId}`)
  ).data;

  assignmentSheet.records.forEach((item) => console.log(item));
});
function deleteItem(itemID: number) {
  // display the confirmation dialog
  dialog.warning({
    title: "Delete a file",
    content: "Are you sure you would like to delete the file?",
    positiveText: "Confirm",
    negativeText: "Cancel",
    maskClosable: true,
    onPositiveClick: async () => {
      try {
        await AxiosInstance.delete("/assignments/" + itemID);
        assignmentSheet.records = assignmentSheet.records.filter(
          (item) => item.id !== itemID
        );
        messenger.success("Assignment Deleted Successfully");
      } catch (e) {
        messenger.error("Assignment Deletion failed");
      }
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

function closeAssignmentModal(item?: {
  id: number;
  title: string;
  description?: string;
  deadline: number;
  visible: boolean;
  isUnlimited: boolean;
  maxScore: number;
}) {
  console.log(item);

  assignmentModalState.visible = false;
  if (item !== undefined) {
    console.log("INSIDE");
    const targetIndex = assignmentSheet.records.findIndex(
      (record) => record.id === item.id
    );

    // assignmentSheet.records = [...newRecords];
    assignmentSheet.records[targetIndex] = {
      ...assignmentSheet.records[targetIndex],
      ...item,
    };
  }
}

function showSubmissionModal(
  title: string,
  assignmnentId: number,
  description?: string
) {
  console.log(assignmnentId, title, description);

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
    @closed="closeAssignmentModal"
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
        secondary
        strong
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

    <template v-if="assignmentSheet.records.length !== 0">
      <div class="t-columns xl:t-columns-2">
        <template v-for="item in assignmentSheet.records" :key="item">
          <AssignmentItem
            :section-id="props.sectionId"
            @edit="updateItem"
            @delete="deleteItem"
            @submit="showSubmissionModal"
            :id="item.id"
            :deadline="item.deadline"
            :editable="props.role == Role.INSTRUCTOR"
            :maxScore="item.maxPoints"
            :description="item.description"
            :title="item.title"
            :updatedAt="item.updatedAt"
            :visible="Boolean(item.visible)"
            :file-urls="item.fileUrls"
            :submissions="item.submissions"
            :submissions-left="item.submissionsLeft"
            :is-submitted="item.isSubmitted"
            :is-unlimited="item.isUnlimited"
            :is-submittable="item.isSubmittable"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <div
        class="t-text-gray-500 t-mb-3 t-py-10 t-flex t-flex-col t-items-center t-justify-center t-border-solid t-border-[2px] t-rounded-md p-6"
      >
        <NIcon class="t-pb-0" size="30" :component="EmojiSurprise20Filled" />
        <NText class="t-text-gray-500 t-font-medium"
          >You haven't assigned any assignments to this section yet!</NText
        >
      </div>
    </template>
  </NCard>
</template>

<style></style>
