<template>
  <!-- include an outer framework -->
  <!-- conditional rendering for the slot according to user role -->
  <div>
    <main>
      <!-- left-side menu -->
      <aside class="t-columns-1 t-w-full md:t-w-[30%]">
        <!-- section card -->
        <SectionCard
          clickable
          course-id="ICS321"
          course-name="Introduction to Database Systems"
          :section-id="3"
          cover-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
          :section-num="5"
          instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
        />
        <!-- options menu -->
        <section>
          <CourseMenuOption
            v-for="option in options"
            v-bind="option"
            :key="option.label"
          />
        </section>
        <!-- section-specific -->
        <section></section>
      </aside>
      <!-- main items -->
      <section class="t-columns-1 t-w-full md:t-w-[70%]">
        <!-- condiitonal rendering for slots (according to user role) -->
        <template v-if="auth.userProfile.role == 2">
          <InsrtuctorSlot />
        </template>
        <template v-if="auth.userProfile.role == 1">
          <div>
            <StudentSlot />
          </div>
        </template>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import CourseMenuOption from "@/components/course/courseMenuOption.vue";
import SectionCard from "@/components/home/sectionCard.vue";
import { useAuth } from "@/stores/auth";
import {
  Book24Filled,
  ClipboardBulletListLtr20Filled,
  Speaker032Filled,
  Star20Filled,
} from "@vicons/fluent";
import type { SectionTab } from "typings/CourseViewTabs";
import { ref, type Component } from "vue";
interface CoruseProps {
  courseName: string;
  courseID: string;
  sectionNum: string | number;
  sectionId: number;
}

interface CourseOption {
  label: string;
  iconBG: string;
  iconFill: string;
  icon: Component;
}

// TODO: emitting the selected tab to both slots

const props = defineProps<CoruseProps>();
const auth = useAuth();
const tab = ref<SectionTab>("Course Content");

const options: CourseOption[] = [
  {
    label: "Course Content",
    iconBG: "t-bg-[#bdd4ff]",
    iconFill: "#2998ff",
    icon: Book24Filled,
  },
  {
    label: "Assignments",
    iconBG: "t-bg-[#C0FFDD]",
    iconFill: "#4ECB71",
    icon: ClipboardBulletListLtr20Filled,
  },
  {
    label: "Grades",
    iconBG: "t-bg-[#ffee57]",
    iconFill: "#da9351",
    icon: Star20Filled,
  },
  {
    label: "Announcements",
    iconBG: "t-bg-[#ffb13b]",
    iconFill: "#996518",
    icon: Speaker032Filled,
  },
];

function switchTab(newIndex: SectionTab) {
  tab.value = newIndex;
}
</script>
<style></style>
