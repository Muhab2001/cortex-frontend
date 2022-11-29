<script setup lang="ts">
import AnnouncementCard from "@/components/home/announcementCard.vue";
import DeadlineCard from "@/components/home/deadlineCard.vue";
import SectionCard from "@/components/home/sectionCard.vue";
import ProfileCard from "@/components/utils/profileCard.vue";
import { useAuth } from "@/stores/auth";
import { useBreadCrumb } from "@/stores/breadcrump";
import { AngleDown } from "@vicons/fa";
import { Speaker024Filled, Timer24Filled, Book24Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NDropdown, type DropdownOption, NButton, NIcon } from "naive-ui";
import { onMounted, ref } from "vue";

interface SectionCardProps {
  courseName: string;
  sectionNum: number | string;
  sectionId: number;
  term: string;
  courseId: string;
  coverUrl: string;
  instructorImgUrl: string;
  clickable: boolean;
  shortened: boolean;
}

const breadCrumb = useBreadCrumb();

// TODO: api calls to fetch the sections for current term
const auth = useAuth();
const term = ref<string>("221");
const sections = ref<SectionCardProps[]>([]);
// TODO: api call to fetch all terms
const termOptions: DropdownOption[] = [
  { label: "221", key: "221", extra: "1st term of 2022" },
  { type: "divider" },
  {
    label: "222",
    key: "222",
    extra: "2nd term of 2022",
  },
  { type: "divider" },
  {
    label: "223",
    key: "223",
    extra: "summer term of 2022",
  },
];

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
              :options="termOptions"
              @select="selectTerm"
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
            clickable
            :section-id="3"
            :shortened="false"
            term="221"
            course-id="ICS321"
            course-name="Introduction to Database Systems"
            cover-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
            :section-num="5"
            instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
          />
          <SectionCard
            clickable
            :shortened="false"
            term="221"
            :section-id="4"
            course-id="SWE363"
            course-name="Web Engineering & Development"
            cover-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
            :section-num="26"
            instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
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
            <AnnouncementCard
              title="Midterm Exam Seating Plan"
              course-id="SWE363"
              course-name="Introduction to Web Engineering"
              instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
              instructor-name="Muhab"
              :last-update="Date.now().toLocaleString()"
              section-no="23"
              tag="Seating Plan"
              content="We will have our Exam for the SWE363 Term 221 course of Web Engineering at exactly 8:30 PM in Building #54. Better be ready!"
            />
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
            <DeadlineCard
              course-id="SWE363"
              course-name="Web Engineeering"
              :deadline="new Date('2022-11-27T23:15:00')"
              :original-date="new Date('2022-11-08T10:00:00')"
              title="Project Phase 3"
              section-no="Common"
            />
          </div>
        </section>
      </aside>
    </div>
  </main>
</template>
