<script setup lang="ts">
import { reactive, ref } from "vue";
import AnnouncementItem from "@/components/course/items/AnnouncementItem.vue";

import type { AnnouncementItemProps, SectionTab } from "typings/CourseViewTabs";
import { Icon } from "@vicons/utils";
import { Speaker032Filled, AddCircle24Filled } from "@vicons/fluent";
import { NCard, useDialog, NButton, NDivider, NIcon } from "naive-ui";
import type { Role } from "@/enums/roles";

interface SectionTabProps {
  sectionId: number;
  role: Role;
}

interface EditedItemProps {
  id: number;
  title: string;
  description?: string;
  tag: string;
  visible: boolean;
}

const props = defineProps<SectionTabProps>();
// modal state
const dialog = useDialog();
const modalState = reactive<{
  visible: boolean;
  mode: "create" | "edit";
  editedItem?: EditedItemProps;
}>({
  visible: false,
  mode: "create",
});

// TODO initialize according to given params
const items = ref<AnnouncementItemProps[]>([
  {
    id: 1,
    lastUpdated: new Date().toLocaleString(),
    title: "Midterm Seating plan!",
    tag: "Seating plan",
    visible: true,
    description:
      "You can find below the full seating plan for our midterm exam. It will be on Biulding 54 'Slaughtery house, at 7:00pm'",
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
          class="t-h-[38px] t-w-[38px] t-inline-flex t-justify-center t-p-2 t-items-center t-rounded-md t-mr-3 t-bg-[#ffb13b]"
          ><NIcon :size="25">
            <Icon
              class="t-pl-[0.25rem]"
              color="#996518
            "
            >
              <Speaker032Filled></Speaker032Filled>
            </Icon> </NIcon
        ></span>
        <!-- the header -->
        <span class="t-text-lg t-font-semibold">Announcements</span>
      </div>
      <NButton
        @click="showModal"
        class="t-w-full t-mt-0 md:t-mt-3 t-mb-5 md:t-mb-0"
        type="info"
        ><span
          ><NIcon class="t-mr-3" size="20"
            ><Icon><AddCircle24Filled></AddCircle24Filled></Icon></NIcon></span
        ><span>Create Announcement</span></NButton
      >
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- main card content -->
    <div class="t-columns-1">
      <template v-for="item in items" :key="item.id">
        <AnnouncementItem
          editable
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
          :tag="item.tag"
          :id="item.id"
          :visible="item.visible"
        />
      </template>
    </div>
  </NCard>
</template>

<style lang=""></style>
