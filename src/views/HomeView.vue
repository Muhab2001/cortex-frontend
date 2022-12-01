<script setup lang="ts">
import AnnouncementCard from "@/components/home/announcementCard.vue";
import DeadlineCard from "@/components/home/deadlineCard.vue";
import SectionCard from "@/components/home/sectionCard.vue";
import ProfileCard from "@/components/utils/profileCard.vue";
import { Role } from "@/enums/roles";
import { AxiosInstance } from "@/axios";
import { useAuth } from "@/stores/auth";
import { useBreadCrumb } from "@/stores/breadcrump";
import { AngleDown } from "@vicons/fa";
import { Speaker024Filled, Timer24Filled, Book24Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import {
  NDropdown,
  type DropdownOption,
  NButton,
  NIcon,
  NSpace,
  NText,
} from "naive-ui";
import { onMounted, ref, type Ref, onBeforeMount } from "vue";

interface SectionCardProps {
  course: { id: string; courseName: string };
  section_number: number | string;
  id: number;
  term: string;
}

interface DeadlineProps {
  deadline: string;
  title: string;
  courseId: string;
  courseName: string;
  createdAt: string;
  sectionNo: number;
}

interface AnnouncementProps {
  title: string;
  description: string;
  createdAt: string;
  tag: string;
  courseName: string;
  courseId: string;
  sectionNo: number;
}

const breadCrumb = useBreadCrumb();

// TODO: api calls to fetch the sections for current term
const auth = useAuth();

let fetchedTermOptions: Ref<DropdownOption[]> = ref([]);
const term = ref<string>("");

const sections = ref<SectionCardProps[]>([]);
const deadlines = ref<DeadlineProps[]>([]);
const announcements = ref<AnnouncementProps[]>([]);

onBeforeMount(async () => {
  try {
    const target: "student" | "instructor" =
      auth.userProfile.role === Role.INSTRUCTOR ? "instructor" : "student";

    // fetching for terms
    fetchedTermOptions.value = (
      await AxiosInstance.get(`course/${target}/terms/${auth.userProfile.id}`)
    ).data.map((term: string) => ({
      label: term,
      key: term,
    }));
    // setting the term value from API
    term.value = fetchedTermOptions.value[0].label as string;
    // fetching sections
    sections.value = (
      await AxiosInstance.get(
        `/course/${target}/${auth.userProfile.id}/${fetchedTermOptions.value[0].label}`
      )
    ).data;

    // fetching the deadlines
    deadlines.value = (
      await AxiosInstance.get(
        `/assignments/deadlines/${target}/${auth.userProfile.id}/${fetchedTermOptions.value[0].label}`
      )
    ).data;

    // fetching the announcements
    announcements.value = (
      await AxiosInstance.get(
        `/announcements/${target}/${auth.userProfile.id}/${fetchedTermOptions.value[0].label}`
      )
    ).data;
    console.log(announcements.value);
  } catch (e) {
    console.log(e);
  }
});

onMounted(() => {
  breadCrumb.updateOptions([
    {
      label: "Home",
      path: "/home",
    },
  ]);
});

function selectTerm(key: number | string) {}
</script>

<template>
  <main>
    <!-- header, user info,  -->

    <!-- section cards -->
    <div class="md:t-flex">
      <section class="md:t-w-[66vw] md:t-mr-3">
        <div class="t-flex t-mb-3 t-items-center t-justify-between">
          <span>
            <span
              class="t-bg-blue-200 t-p-2 t-inline-flex t-items-center t-rounded-md t-h-full t-mr-2"
              ><Icon size="20px" color="#0D4C92"><Book24Filled /> </Icon
            ></span>
            <h3
              class="t-font-bold t-text-slate-700 t-inline t-h-full t-align-middle"
            >
              My Courses
            </h3>
          </span>
          <span
            ><span class="t-mr-2 t-font-medium">Term </span
            ><NDropdown
              trigger="click"
              :options="fetchedTermOptions"
              @select="selectTerm"
              v-model:value="term"
              ><NButton icon-placement="right" type="default">
                <template #icon>
                  <NIcon :component="AngleDown" />
                </template>
                {{ term }}</NButton
              ></NDropdown
            ></span
          >
        </div>
        <div class="md:t-columns-2">
          <SectionCard
            v-for="section in sections"
            :key="section.id"
            :section-id="section.id"
            :term="term"
            :course-id="section.course.id"
            :course-name="section.course.courseName"
            :section-num="section.section_number"
          />
        </div>
      </section>
      <!-- announcements and deadline -->

      <aside class="md:t-w-[33vw] t-w-100vw">
        <section>
          <div class="t-flex t-mb-3 t-items-center">
            <span
              class="t-bg-green-200 t-p-2 t-inline-flex t-justify-center t-items-center t-rounded-md t-h-full t-mr-2"
              ><Icon size="20px" color="#285430"><Speaker024Filled /> </Icon
            ></span>
            <h3
              class="t-font-bold t-text-slate-700 t-inline t-h-full t-align-middle"
            >
              Announcements
            </h3>
          </div>
          <div class="md:t-columns-1">
            <template v-if="announcements.length !== 0">
              <AnnouncementCard
                v-for="announcement in announcements"
                :key="announcement.createdAt"
                :title="announcement.title"
                :course-id="announcement.courseId"
                :course-name="announcement.courseName"
                :last-update="announcement.createdAt"
                :section-no="announcement.sectionNo"
                :tag="announcement.tag"
                :content="announcement.description"
              />
            </template>
            <template v-else>
              <div
                class="t-text-gray-500 t-mb-3 t-py-4 t-flex t-flex-col t-items-center t-justify-center t-border-solid t-border-[2px] t-border-gray-300 t-rounded-md p-6"
                vertical
                align="center"
              >
                <NIcon
                  class="t-rotate-[-45deg] t-pb-0"
                  size="22"
                  :component="Speaker024Filled"
                />
                <NText class="t-text-gray-500 t-font-medium"
                  >No Announcements Yet!</NText
                >
              </div>
            </template>
          </div>
        </section>
        <section>
          <div class="t-flex t-mb-3 t-items-center">
            <span
              class="t-bg-red-200 t-p-2 t-inline-flex t-items-center t-rounded-md t-h-full t-mr-2"
              ><Icon size="20px" color="#850E35"><Timer24Filled /> </Icon
            ></span>
            <h3
              class="t-font-bold t-text-slate-700 t-inline t-h-full t-align-middle"
            >
              Deadlines
            </h3>
          </div>
          <div class="md:t-columns-1">
            <template v-if="deadlines.length !== 0">
              <DeadlineCard
                v-for="deadline in deadlines"
                :key="
                  deadline.title +
                  ' ' +
                  deadline.sectionNo +
                  ' ' +
                  deadline.courseId
                "
                :course-id="deadline.courseId"
                :course-name="deadline.courseName"
                :deadline="new Date(deadline.deadline)"
                :original-date="new Date(deadline.createdAt)"
                :title="deadline.title"
                :section-no="deadline.sectionNo"
              />
            </template>
            <template v-else>
              <div
                class="t-text-gray-500 t-mb-3 t-py-4 t-flex t-flex-col t-items-center t-justify-center t-border-solid t-border-[2px] t-border-gray-300 t-rounded-md p-6"
              >
                <NIcon
                  class="t-rotate-[-45deg] t-pb-0"
                  size="22"
                  :component="Timer24Filled"
                />
                <NText class="t-text-gray-500 t-font-medium"
                  >No Deadlines Ahead!</NText
                >
              </div>
            </template>
          </div>
        </section>
      </aside>
    </div>
  </main>
</template>
