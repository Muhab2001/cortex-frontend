<script setup lang="ts">
import { reactive, ref, onBeforeMount } from "vue";
import AnnouncementItem from "@/components/course/items/AnnouncementItem.vue";

import type { AnnouncementItemProps, SectionTab } from "typings/CourseViewTabs";
import { Icon } from "@vicons/utils";
import {
  Speaker032Filled,
  AddCircle24Filled,
  EmojiSurprise20Filled,
} from "@vicons/fluent";
import {
  NCard,
  useDialog,
  NButton,
  NDivider,
  NIcon,
  useMessage,
} from "naive-ui";
import type { Role } from "@/enums/roles";
import AnnouncementModal from "../utils/AnnouncementModal.vue";
import { AxiosInstance } from "@/axios";

interface SectionTabProps {
  sectionId: number;
  role: Role;
}

interface EditedItemProps {
  id: number;
  subject: string;
  content: string;
  tag: string;
}

const props = defineProps<SectionTabProps>();
// modal state
const dialog = useDialog();
const messenger = useMessage();
const modalState = reactive<{
  visible: boolean;
  mode: "create" | "edit";
  editedItem?: EditedItemProps;
}>({
  visible: false,
  mode: "create",
});

const items = ref<AnnouncementItemProps[]>([]);

async function fetchItems() {
  items.value = (
    await AxiosInstance.get("/announcements/section/" + props.sectionId)
  ).data;
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
      await AxiosInstance.delete("announcements/" + itemID);
      items.value = items.value.filter((item) => item.id !== itemID);
      messenger.success("Announcement Deleted successfully");
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
  <AnnouncementModal
    @closed="
      async () => {
        modalState.visible = false;
        await fetchItems();
      }
    "
    :visible="modalState.visible"
    :mode="modalState.mode"
    :target-item="modalState.editedItem"
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
        secondary
        strong
        @click="showModal"
        class="t-w-full t-mt-0 md:t-mt-3 t-mb-5 md:t-mb-0"
        type="info"
        ><span
          ><NIcon class="t-mr-3" size="20"
            ><Icon><AddCircle24Filled></AddCircle24Filled></Icon></NIcon></span
        ><span>New Announcement</span></NButton
      >
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- main card content -->
    <div class="t-columns-1">
      <template v-if="items.length !== 0">
        <template v-for="item in items" :key="item.id">
          <AnnouncementItem
            @delete="deleteItem"
            @edit="updateItem"
            editable
            :content="item.description"
            :subject="item.title"
            :updatedAt="item.updatedAt"
            :tag="item.tag"
            :id="item.id"
          />
        </template>
      </template>
      <template v-else>
        <div
          class="t-text-gray-500 t-mb-3 t-py-10 t-flex t-flex-col t-items-center t-justify-center t-border-solid t-border-[2px] t-border-gray-300 t-rounded-md p-6"
        >
          <NIcon class="t-pb-0" size="30" :component="EmojiSurprise20Filled" />
          <NText class="t-text-gray-500 t-font-medium"
            >You haven't issued any announcements to this section yet!</NText
          >
        </div>
      </template>
    </div>
  </NCard>
</template>

<style lang=""></style>
