<template>
  <NCard
    class="t-border-solid t-border-[2px]"
    content-style="padding: 16px 8px; padding-top:0"
    header-style="padding-bottom: 0"
  >
    <!-- tab header -->
    <template #header>
      <div class="t-hidden md:t-visible md:t-flex t-items-center">
        <!-- icon -->
        <span
          class="t-h-full t-inline-flex t-justify-center t-p-2 t-items-center t-rounded-md t-mr-3 t-bg-[#ffee57]"
          ><Icon size="25" color="#da9351"> <Star20Filled></Star20Filled> </Icon
        ></span>
        <!-- the header -->
        <span class="t-text-lg t-font-semibold">Grades</span>
      </div>
      <NDivider class="t-hidden md:t-flex"></NDivider>
    </template>
    <!-- main card content -->
    <div class="t-columns-1 lg:t-columns-2">
      <template v-for="item in items" :key="item.id">
        <GradeItem
          :id="item.id"
          :title="item.title"
          :lastUpdated="item.updatedAt"
          :score="item.score"
          :maxScore="item.maxPoints"
          :comment="item.comment"
        />
      </template>
    </div>
  </NCard>
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from "vue";
import type { GradeItemProps } from "typings/CourseViewTabs";
import GradeItem from "../items/GradeItem.vue";
import { Icon } from "@vicons/utils";
import { Star20Filled } from "@vicons/fluent";
import { NCard, NDivider } from "naive-ui";
import { AxiosInstance } from "@/axios";

interface SectionTabProps {
  sectionId: number;
}

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<GradeItemProps[]>([
  // {
  //   id: 1,
  //   updatedAt: new Date().toLocaleString(),
  //   title: "Project Phase #2",
  //   score: 20,
  //   maxPoints: 20,
  //   comment: "Well done Muhab, this assignment submission was splendid!",
  // },
  // {
  //   id: 2,
  //   updatedAt: new Date().toLocaleString(),
  //   title: "Project Phase #3",
  //   score: 13,
  //   maxPoints: 20,
  // },
  // {
  //   id: 3,
  //   updatedAt: new Date().toLocaleString(),
  //   title: "Homework #2",
  //   comment:
  //     "Your code is not working. Please test your code in later assignments. Good luck :-)",
  //   score: 4,
  //   maxPoints: 10,
  // },
]);

onBeforeMount(async () => {
  items.value = (
    await AxiosInstance.get("grades/student/" + props.sectionId)
  ).data.map((grade: any) => ({
    title: grade.title,
    id: grade.id,
    updatedAt: grade.updatedAt,
    score: grade.score,
    maxPoints: grade.assignment.maxPoints,
    comment: grade.comment,
  }));
});
</script>
<style></style>
