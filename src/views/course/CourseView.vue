<template>
  <!-- include an outer framework -->
  <!-- conditional rendering for the slot according to user role -->
  <div>
    <main class="md:t-flex t-columns-1 md:t-columns-2">
      <!-- left-side menu -->
      <aside class="t-columns-1 t-w-full md:t-w-[40%] lg:t-w-[28%] t-mr-3">
        <!-- section card -->
        <SectionCard
          clickable
          shortened
          :term="courseInfo.term"
          :course-id="courseInfo.courseId"
          :course-name="courseInfo.courseName"
          :section-id="3"
          :section-num="courseInfo.sectionNo"
          instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
        /><NButton
          secondary
          strong
          v-if="auth.userProfile.role == Role.INSTRUCTOR"
          @click="attendanceModal.visible = true"
          class="t-w-full t-mb-3"
          type="primary"
          ><template #icon><NIcon :component="CoPresentRound" /></template> Take
          Attendance</NButton
        >
        <!-- options menu -->
        <section class="t-hidden md:t-flex">
          <NButtonGroup vertical class="t-w-full">
            <CourseMenuOption
              @switch-tab="switchTab"
              v-for="option in options"
              v-bind="option"
              :key="option.label"
              :is-current="tab === option.label"
            />
          </NButtonGroup>
        </section>
        <section
          class="md:t-hidden t-border-t-2 t-border-t-solid t-shadow-2xl t-bg-white dark:t-bg-black t-fixed t-bottom-0 t-left-0 t-z-50 t-h-fit t-w-full"
        >
          <NButtonGroup
            class="t-mx-auto t-px-2 t-bg-white dark:t-bg-black t-w-full"
          >
            <CourseMenuOption
              @switch-tab="switchTab"
              v-for="option in options"
              v-bind="{ ...option, contracted: true }"
              :key="option.label"
              :is-current="tab === option.label"
            />
          </NButtonGroup>
        </section>
      </aside>
      <!-- main items -->
      <section class="t-columns-1 t-w-full md:t-w-[60%] lg:t-w-[70%]">
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
      <AttendanceModal
        @closed="attendanceModal.visible = false"
        :visible="attendanceModal.visible"
        :section-id="attendanceModal.sectionId"
      />
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
  watchEffect,
  provide,
  readonly,
  onBeforeMount,
  reactive,
} from "vue";
import { useBreadCrumb } from "@/stores/breadcrump";
import { NButtonGroup, NButton, NIcon } from "naive-ui";
import { CoPresentRound } from "@vicons/material";
import { AxiosInstance } from "@/axios";

const InstructorSlot = defineAsyncComponent(
  () => import("./slots/InstructorSlot.vue")
);
const StudentSlot = defineAsyncComponent(
  () => import("./slots/StudentSlot.vue")
);
const AttendanceModal = defineAsyncComponent(
  () => import("@/components/course/utils/AttendanceModal.vue")
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
const tab = ref<SectionTab>(
  (sessionStorage.getItem("courseTab") as SectionTab) ?? "Assignments"
);

const attendanceModal = ref<{ visible: boolean; sectionId: number }>({
  visible: false,
  sectionId: props.sectionId,
});

// TODO: replace with an API call
const courseInfo = ref<{
  term: string;
  courseId: string;
  courseName: string;
  sectionNo: number | string;
}>({
  courseName: "",
  courseId: "",
  sectionNo: props.sectionId,
  term: "",
});

onBeforeMount(async () => {
  const response = (
    await AxiosInstance.get("course/section/" + props.sectionId)
  ).data;

  courseInfo.value.courseName = response.course.courseName;
  courseInfo.value.courseId = response.course.id;
  courseInfo.value.sectionNo = response.section_number;
  courseInfo.value.term = response.term;

  // providing course meta info to all children
  breadcrumbs.updateOptions([
    {
      label: "Home",
      path: "/home",
    },
    {
      label: `${courseInfo.value.courseId}-${courseInfo.value.sectionNo}`,
      path: `/course/${props.sectionId}`,
    },
  ]);
});

provide(CourseMeta, readonly(courseInfo));

watchEffect(() => {
  sessionStorage.setItem("courseTab", tab.value);
});

// breadcrumbs state
const breadcrumbs = useBreadCrumb();

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
    label: "Announcements",
    iconBG: "t-bg-[#ffb13b]",
    iconFill: "#996518",
    icon: Speaker016Filled,
    extraOptions: { style: "padding-left: 0.25rem; " },
  },
];

// instructor can access the grades through the assignment page
// TODO: revert to students' only view
if (auth.userProfile.role == Role.STUDENT) {
  options.push({
    label: "Grades",
    iconBG: "t-bg-[#ffee57]",
    iconFill: "#da9351",
    icon: Star20Filled,
  });
}

function switchTab(label: string): void {
  console.log("FINALLY!", tab.value);
  tab.value = label as SectionTab;
}
</script>
<style></style>
