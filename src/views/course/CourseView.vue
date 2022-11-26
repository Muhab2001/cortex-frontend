<template>
  <!-- include an outer framework -->
  <!-- conditional rendering for the slot according to user role -->
  <div>
    <main class="t-flex">
      <!-- left-side menu -->
      <aside class="t-columns-1 t-w-full md:t-w-[28%] t-mr-3">
        <!-- section card -->
        <SectionCard
          clickable
          :term="courseInfo.term"
          :course-id="courseInfo.courseId"
          :course-name="courseInfo.courseName"
          :section-id="3"
          cover-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
          :section-num="courseInfo.sectionNo"
          instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
        />
        <!-- options menu -->
        <section>
          <CourseMenuOption
            v-for="option in options"
            v-bind="option"
            :key="option.label"
            :is-current="tab === option.label"
          />
        </section>
        <!-- section-specific -->
        <section></section>
      </aside>
      <!-- main items -->
      <section class="t-columns-1 t-w-full md:t-w-[66%]">
        <!-- condiitonal rendering for slots (according to user role) -->
        <!-- TODO: define each slot as an async component -->
        <template v-if="auth.userProfile.role == Role.INSTRUCTOR">
          <InstructorSlot
            :section-id="props.sectionId"
            :role="Role.INSTRUCTOR"
            :tab="tab"
          />
        </template>
        <template v-if="auth.userProfile.role == Role.STUDENT">
          <div>
            <StudentSlot
              :section-id="props.sectionId"
              :role="Role.INSTRUCTOR"
              :tab="tab"
            />
          </div>
        </template>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import CourseMenuOption from "@/components/course/courseMenuOption.vue";
import SectionCard from "@/components/home/sectionCard.vue";
import { Role } from "@/enums/roles";
import { useAuth } from "@/stores/auth";
import { CourseMeta } from "@/injection_keys/courseView.keys";
import {
  Book24Filled,
  ClipboardBulletListLtr20Filled,
  Speaker016Filled,
  Star20Filled,
} from "@vicons/fluent";
import type { SectionTab } from "typings/CourseViewTabs";
import {
  defineAsyncComponent,
  ref,
  type Component,
  provide,
  readonly,
  reactive,
} from "vue";

const InstructorSlot = defineAsyncComponent(
  () => import("./slots/InstructorSlot.vue")
);
const StudentSlot = defineAsyncComponent(
  () => import("./slots/StudentSlot.vue")
);

interface CourseViewProps {
  sectionId: number;
}

interface CourseOption {
  label: string;
  iconBG: string;
  iconFill: string;
  icon: Component;
  extraOptions?: { [key: string]: string };
}

// TODO: emitting the selected tab to both slots

const props = defineProps<CourseViewProps>();
const auth = useAuth();
// local state
const tab = ref<SectionTab>("Course Content");
// TODO: replace with an API call
const courseInfo = reactive({
  courseName: "Management of Database Systems",
  courseId: "ICS321",
  sectionNo: 3,
  sectionId: props.sectionId,
  term: "221",
});
// providing course meta info to all children
provide(
  CourseMeta,
  readonly({
    courseName: courseInfo.courseName,
    courseId: courseInfo.courseId,
    sectionNo: courseInfo.sectionNo,
    term: courseInfo.term,
  })
);

console.log(props);

const options: CourseOption[] = [
  {
    label: "Course Content",
    iconBG: "t-bg-blue-200",
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
    icon: Speaker016Filled,
    extraOptions: { style: "padding-left: 0.25rem; " },
  },
];

function switchTab(newIndex: SectionTab) {
  tab.value = newIndex;
}
</script>
<style></style>
