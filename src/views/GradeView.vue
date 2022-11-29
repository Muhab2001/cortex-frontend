<!-- ! This is an async component -->
<!-- ! requires parametrized router push -->
<script setup lang="ts">
import {
  NButton,
  NTag,
  type DataTableColumns,
  type NButtonGroup,
  NSpace,
  NDataTable,
  NIcon,
  useMessage,
} from "naive-ui";
import { reactive, h } from "vue";
import { useRouter } from "vue-router";
import { useIcon } from "@/composables/useIcon";
import { Delete28Filled, ErrorCircle24Filled } from "@vicons/fluent";
import { CheckmarkCircle, Save } from "@vicons/ionicons5";
import { useBreadCrumb } from "@/stores/breadcrump";
interface GradePageProps {
  assignmentId: number;
  sectionId: number;
}

interface GradeRecord {
  score?: number;
  studentName: string;
  studentId: string; //! This is not the student id stored in the db
  isSubmitted: boolean;
}

interface GradeInput {
  title: string;
  description?: string;
  courseName: string;
  courseId: string;
  sectionNo: number;
  fullScore: number;
  records: GradeRecord[];
}

const props = defineProps<GradePageProps>();
const router = useRouter();
const iconUtils = useIcon();

// TODO: fetch all the grades for the assignment id requested

const grade = reactive<GradeInput>({
  title: "Project Phase #3",
  description: " The last phase of the package delivery system",
  courseId: "ICS321",
  courseName: "Management of Database Systems",
  sectionNo: 5,
  fullScore: 20,
  records: [
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195671",
      studentName: "Mohammed abubaker",
      isSubmitted: true,
      score: 20,
    },
    {
      studentId: "20145570",
      studentName: "Muhab abubaker",
      score: 13,
      isSubmitted: true,
    },
    {
      studentId: "20195371",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195540",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195573",
      studentName: "Mohammed abubaker",
      isSubmitted: true,
      score: 15,
    },
    {
      studentId: "20195574",
      studentName: "Muhab abubaker",
      score: 5,
      isSubmitted: true,
    },
    {
      studentId: "20195572",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },

    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 10,
      isSubmitted: true,
    },
    {
      studentId: "20195571",
      studentName: "Mohammed abubaker",
      isSubmitted: false,
    },
  ],
});

const breadcrumbs = useBreadCrumb();
const messenger = useMessage();

breadcrumbs.updateOptions([
  {
    label: "Home",
    path: "/home",
  },
  {
    label: `${grade.courseId}-${grade.sectionNo}`,
    path: `/course/${props.sectionId}`,
  },
  {
    label: `Grading`,
    path: `/grade/${props.sectionId}/${props.assignmentId}`,
  },
]);

function openGradeModal(row: GradeRecord) {
  gradeModalState.visible = true;
  gradeModalState.record = row;
}

const gradeType = (
  score: number
): "success" | "warning" | "error" | "default" => {
  if (!score) {
    return "default";
  }
  const percentage = score / grade.fullScore;
  if (percentage >= 0.8) {
    return "success";
  } else if (percentage >= 0.5) {
    return "warning";
  } else {
    return "error";
  }
};

function createColumns(): DataTableColumns<GradeRecord> {
  return [
    {
      title: "ID",
      key: "studentId",
      resizable: false,
      width: 40,
    },
    {
      title: "Name",
      key: "studentName",
      resizable: true,
      width: 100,
    },
    {
      title: "Status",
      key: "submissionStatus",
      width: "150",
      render(record: GradeRecord) {
        return h(
          NTag,
          {
            type: record.isSubmitted ? "success" : "error",
            bordered: false,
            round: true,
          },
          {
            default: () => [
              h(
                NSpace,
                { align: "center" },
                {
                  default: () => [
                    h(
                      iconUtils.renderIcon(
                        record.isSubmitted
                          ? CheckmarkCircle
                          : ErrorCircle24Filled,
                        {
                          size: "22",
                          class: "t-inline-flex t-items-center t-h-20 t-mr-0",
                        }
                      )
                    ),
                    record.isSubmitted ? "Submitted" : "Empty",
                  ],
                }
              ),
            ],
          }
        );
      },
    },
    {
      title: "Score",
      key: "score",
      width: "100",
      render(record: GradeRecord) {
        return h(
          NSpace,
          {
            class: "t-text-md",
          },
          {
            default: () =>
              !record.score
                ? "-"
                : h(
                    NTag,
                    {
                      align: "center",
                      type: gradeType(record.score),
                      bordered: false,
                    },
                    {
                      default: () => [
                        h(
                          "span",
                          { class: "t-font-semibold t-mr-1" },
                          { default: () => record.score }
                        ),
                        "/",
                        h(
                          "span",
                          { class: "t-ml-1" },
                          { default: () => grade.fullScore }
                        ),
                      ],
                    }
                  ),
          }
        );
      },
    },
    {
      title: "Actions",
      key: "actions",
      width: "100",
      render(record: GradeRecord) {
        return h(
          NButton,
          {
            size: "small",
            type: "info",
            onClick: () => openGradeModal(record),
          },
          {
            default: () => "Grade",
          }
        );
      },
    },
  ];
}

// grading modal state
const gradeModalState = reactive<{
  visible: boolean;
  record: GradeRecord;
}>({
  visible: false,
  record: grade.records[0],
});

function saveGrades() {
  // TODO submission logic from the API
  // ! parametrize the routing
  router.push("/course/" + grade.courseName);
}

// TODO emitting messages from children components to parent
</script>

<template>
  <main class="t-pb-40 md:t-pb-0">
    <header class="t-mb-4">
      <h2 id="assignment-title" class="t-font-semibold">{{ grade.title }}</h2>
      <p class="t-text-gray-400 t-font-medium" v-if="grade.description">
        {{ grade.description }}
      </p>
    </header>
    <!-- <section
      class="t-fixed md:t-pb-0 m-4 t-z-10 t-bottom-0 t-left-0 t-w-full md:t-w-fit md:t-relative md:t-justify-end md:t-px-3"
      id="button row"
    >
      <NButtonGroup
        class="t-flex-col t-p-3 t-flex md:t-flex-row t-items-center md:t-justify-start t-bottom-0 t-w-full t-bg-white"
      >
        <NButton
          class="md:t-mr-2 t-mb-2 md:t-mb-0 t-flex-1 t-w-[90%] md:t-w-fit"
          strong
          secondary
          type="success"
          @click="saveGrades"
        >
          <template #icon>
            <NIcon :component="Save" />
          </template>
          Save Changes</NButton
        -->

    <!-- ! parametrize the routing -->
    <!-- <NButton
          class="t-flex-1 t-w-[90%] md:t-w-fit"
          strong
          secondary
          type="error"
          @click="router.push('/course')"
        >
          <template #icon> <NIcon :component="Delete28Filled" /> </template>
          Cancel Changes
        </NButton>
      </NButtonGroup> 
    </section> -->
    <section>
      <NDataTable
        :scroll-x="1000"
        :data="grade.records"
        :columns="createColumns()"
        striped
        bordered
        :pagination="{ pageSize: 10 }"
        :row-props="(row: GradeRecord) => ({  style: 'cursor: pointer;',onClick: () => {openGradeModal(row)
       messenger.info(row.studentName + ' Selected')} })"
      />
    </section>
  </main>
</template>

<style></style>
