<template>
  <!-- <ContentModal
    @closed="
      () => {
        modalState.visible = false;
      }
    "
    :mode="modalState.mode"
    :visible="modalState.visible"
  /> -->
  <ContentModal
    v-if="props.role == Role.INSTRUCTOR"
    :visible="modalState.visible"
    :mode="modalState.mode"
    :target-item="modalState.editedItem"
    @closed="
      () => {
        modalState.visible = false;
      }
    "
  />
  <NCard
    content-style="padding: 16px 8px; padding-top:0"
    header-style="padding-bottom: 0"
  >
    <!-- This is the content tab! -->
    <!-- tab header -->
    <template #header>
      <div class="t-flex t-items-center">
        <!-- icon -->
        <span
          class="t-h-full t-inline-flex t-justify-center t-p-2 t-items-center t-rounded-md t-mr-3 t-bg-blue-200"
          ><Icon size="25" color="#2998ff"> <Book24Filled></Book24Filled> </Icon
        ></span>
        <!-- the header -->
        <span class="t-text-lg t-font-semibold">Course Content</span>
      </div>
      <NButton @click="showModal" class="t-w-full t-mt-3" type="info"
        ><span
          ><NIcon class="t-mr-3" size="20"
            ><Icon><AddCircle24Filled></AddCircle24Filled></Icon></NIcon></span
        ><span>Add new content</span></NButton
      >
      <NDivider></NDivider>
    </template>
    <!-- main card content -->
    <div>
      <template v-for="item in items" :key="item.id">
        <ContentItem
          @delete="deleteItem"
          @edit="updateItem"
          :id="item.id"
          :editable="props.role == Role.INSTRUCTOR"
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
          :file-urls="item.fileUrls"
          :visible="item.visible"
        />
      </template>
    </div>
  </NCard>
</template>
<script setup lang="ts">
import { reactive, ref, watch, watchEffect } from "vue";
import type { ContentItemProps } from "typings/CourseViewTabs";
import ContentItem from "../items/ContentItem.vue";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import { AddCircle24Filled, Book24Filled } from "@vicons/fluent";
import {
  NButton,
  NCard,
  NDivider,
  NIcon,
  numberAnimationProps,
  useDialog,
} from "naive-ui";
import ContentModal from "../utils/ContentModal.vue";

interface SectionTabProps {
  sectionId: number;
  role: Role;
}

interface EditedItemProps {
  id: number;
  title: string;
  description?: string;

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

console.log(modalState);

watch(
  () => modalState.visible,
  () => {
    console.log(modalState);
  }
);
const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<ContentItemProps[]>([
  {
    id: 1,
    lastUpdated: new Date().toLocaleString(),
    title: "Syllabus",
    description: "These are the contents included in the syllabus",
    fileUrls: [
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg",
      "https://blackboard.kfupm.edu.sa/bbcswebdav/pid-1833278-dt-content-rid-22203929_1/courses/221-GS-318-merged-nawaf/182-GS-318-merged-nawaf_ImportedContent_20181225020849/Chapter%2024.pdf",
    ],
    visible: true,
  },
  {
    id: 2,
    lastUpdated: new Date().toLocaleString(),
    title: "Week 1 material",
    description: "All material covered in week 1 lectures and labs",
    fileUrls: [
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg",
      "https://blackboard.kfupm.edu.sa/bbcswebdav/pid-1833278-dt-content-rid-22203929_1/courses/221-GS-318-merged-nawaf/182-GS-318-merged-nawaf_ImportedContent_20181225020849/Chapter%2024.pdf",
    ],
    visible: false,
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
  modalState.mode = "edit";
  modalState.editedItem = item;
  modalState.visible = true;
}

function showModal() {
  console.log("Clicking");
  modalState.mode = "create";
  modalState.visible = true;
}
</script>
<style></style>
