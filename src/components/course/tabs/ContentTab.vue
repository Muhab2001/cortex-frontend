<script setup lang="ts">
import { ref } from "vue";
import type {
  ContentItemProps,
  SectionTabProps,
} from "typings/CourseViewTabs";
import ContentItem from "../items/ContentItem.vue";

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<ContentItemProps[]>([]);
</script>
<template>
  <NCard>
    <!-- tab header -->
    <template #header>
      <div>
        <!-- icon -->
        <span></span>
        <!-- the header -->
        <span>Course Content</span>
      </div>
    </template>
    <!-- main card content -->
    <div>
      <template v-for="item in items" :key="item.id">
        <ContentItem
          :id="item.id"
          editable
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
