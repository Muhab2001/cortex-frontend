<script setup lang="ts">
import { ref } from "vue";
import type { AssignmentItemProps } from "typings/CourseViewTabs";
import AssignmentItem from "@/components/course/items/AssignmentItem.vue";

import { useAuth } from "@/stores/auth";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import { Book24Filled } from "@vicons/fluent";
interface SectionTabProps {
  sectionId: number;
  role: Role;
}

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
        <span class="t-bg-[#bdd4ff]"
          ><Icon color="#2998ff"> <Book24Filled></Book24Filled> </Icon
        ></span>
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
          :editable="props.role == Role.INSTRUCTOR"
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
