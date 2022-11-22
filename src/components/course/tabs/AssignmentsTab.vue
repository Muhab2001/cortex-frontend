<script setup lang="ts">
import { ref } from "vue";
import type {
  AssignmentItemProps,
  SectionTabProps,
} from "typings/CourseViewTabs";
import AssignmentItem from "@/components/course/items/AssignmentItem.vue";

import { useAuth } from "@/stores/auth";
const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<AssignmentItemProps[]>([]);
const auth = useAuth();
</script>
<template>
  <NCard>
    <!-- tab header -->
    <template #header>
      <div>
        <!-- icon -->
        <span></span>
        <!-- the header -->
        <span>Assignments</span>
      </div>
    </template>
    <!-- main card content -->
    <div>
      <template v-for="item in items" :key="item.id">
        <AssignmentItem
          :id="item.id"
          :deadline="item.deadline"
          editable
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
