<template>
  <ContentModal
    v-if="props.role == Role.INSTRUCTOR"
    :visible="modalState.visible"
    :mode="modalState.mode"
    :target-item="modalState.editedItem"
    @closed="
      async () => {
        modalState.visible = false;
      }
    "
  />
  <NCard
    class="t-border-solid t-border-[2px]"
    content-style="padding: 16px 8px; padding-top:0"
    header-style="padding-bottom: 0;"
  >
    <!-- This is the content tab! -->
    <!-- tab header -->
    <template #header>
      <div class="t-hidden md:t-visible md:t-flex t-items-center">
        <!-- icon -->
        <span
          class="t-h-full t-inline-flex t-justify-center t-p-2 t-items-center t-rounded-md t-mr-3 t-bg-blue-200"
          ><Icon size="25" color="#2998ff"> <Book24Filled></Book24Filled> </Icon
        ></span>
        <!-- the header -->
        <span class="t-text-lg t-font-semibold">Course Content</span>
      </div>
      <NButton
        secondary
        strong
        @click="showModal"
        class="t-w-full t-mt-0 md:t-mt-3 t-mb-5 md:t-mb-0"
        type="info"
        ><span
          ><NIcon class="t-mr-3" size="20"
            ><Icon><AddCircle24Filled></AddCircle24Filled></Icon></NIcon></span
        ><span>New content</span></NButton
      >
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- main card content -->
    <template v-if="items.length !== 0">
      <div class="t-columns-1 lg:t-columns-2">
        <template v-for="item in items" :key="item.id">
          <ContentItem
            @delete="deleteItem"
            @edit="updateItem"
            :id="item.id"
            :editable="props.role == Role.INSTRUCTOR"
            :description="item.description"
            :title="item.title"
            :lastUpdated="item.updatedAt"
            :file-urls="item.fileUrls"
            :visible="item.visible"
          />
        </template>
      </div>
    </template>
    <template v-else>
      <div
        class="t-text-gray-500 t-mb-3 t-py-10 t-flex t-flex-col t-columns-1 t-items-center t-justify-center t-border-solid t-border-[2px] t-rounded-md p-6"
      >
        <NIcon class="t-pb-0" size="30" :component="EmojiSurprise20Filled" />
        <NText class="t-text-gray-500 t-font-medium"
          >You haven't created any content to this section yet!</NText
        >
      </div>
    </template>
  </NCard>
</template>
<script setup lang="ts">
import { onBeforeMount, reactive, ref, watch } from "vue";
import type { ContentItemProps } from "typings/CourseViewTabs";
import ContentItem from "../items/ContentItem.vue";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import {
  AddCircle24Filled,
  Book24Filled,
  EmojiSurprise20Filled,
} from "@vicons/fluent";
import { NButton, NCard, NDivider, NIcon, useDialog } from "naive-ui";
import ContentModal from "../utils/ContentModal.vue";
import { AxiosInstance } from "@/axios";

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
const items = ref<ContentItemProps[]>([]);

async function fetchItems() {
  items.value = (await AxiosInstance.get("content/" + props.sectionId)).data;
}

onBeforeMount(async () => {
  await fetchItems();
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
      await AxiosInstance.delete("content/" + itemID);
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
<style></style>
