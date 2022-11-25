<script setup lang="ts">
import { ref } from "vue";
import type { ContentItemProps } from "typings/CourseViewTabs";
import ContentItem from "../items/ContentItem.vue";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import { AddCircle24Filled, Book24Filled } from "@vicons/fluent";
import { NButton, NCard, NDivider, NIcon, useDialog } from "naive-ui";

interface SectionTabProps {
  sectionId: number;
  role: Role;
}

const dialog = useDialog();
const modalVisible = ref<boolean>(false);
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
</script>
<template>
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
      <NButton class="t-w-full t-mt-3" type="info"
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
          :id="item.id"
          :editable="props.role == Role.INSTRUCTOR"
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
          :file-urls="item.fileUrls"
        />
      </template>
    </div>
  </NCard>
</template>

<style></style>
<style lang=""></style>
