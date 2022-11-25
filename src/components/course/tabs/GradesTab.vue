<script setup lang="ts">
import { ref } from "vue";
import type { GradeItemProps } from "typings/CourseViewTabs";
import GradeItem from "../items/GradeItem.vue";
import { Role } from "@/enums/roles";
import { Icon } from "@vicons/utils";
import { Star20Filled } from "@vicons/fluent";

interface SectionTabProps {
  sectionId: number;
  role: Role;
}

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<GradeItemProps[]>([]);
</script>
<template>
  <NCard>
    <!-- tab header -->
    <template #header>
      <div>
        <!-- icon -->
        <span class="t-bg-[#ffee57]"
          ><Icon color="#da9351"> <Star20Filled></Star20Filled> </Icon
        ></span>
        <!-- the header -->
        <span>Grades</span>
      </div>
    </template>
    <!-- main card content -->
    <div>
      <template v-for="item in items" :key="item.id">
        <GradeItem
          :id="item.id"
          :editable="props.role == Role.INSTRUCTOR"
          :description="item.description"
          :title="item.title"
          :lastUpdated="item.lastUpdated"
          :score="item.score"
          :assignmentId="item.assignmentId"
        />
      </template>
    </div>
  </NCard>
</template>
<style></style>
