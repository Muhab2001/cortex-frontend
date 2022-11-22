<script setup lang="ts">
import { ref } from "vue";
import AnnouncementItem from "@/components/course/items/AnnouncementItem.vue";

import type {
  AnnouncementItemProps,
  SectionTabProps,
} from "typings/CourseViewTabs";

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<AnnouncementItemProps[]>([]);
</script>
<template>
  <NCard>
    <!-- tab header -->
    <template #header>
      <div>
        <!-- icon -->
        <span></span>
        <!-- the header -->
        <span>Announcements</span>
      </div>
    </template>
    <!-- main card content -->
    <div>
      <template v-for="item in items" :key="item.id">
        <AnnouncementItem
          editable
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
          :tag="item.tag"
          :id="item.id"
        />
      </template>
    </div>
  </NCard>
</template>

<style lang=""></style>
