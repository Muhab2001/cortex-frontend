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
  NText,
  useMessage,
} from "naive-ui";
import { reactive, h, onBeforeMount } from "vue";
import { useRouter } from "vue-router";
import { useIcon } from "@/composables/useIcon";
import {
  Delete28Filled,
  ErrorCircle24Filled,
  Star20Filled,
} from "@vicons/fluent";
import { CheckmarkCircle, Save } from "@vicons/ionicons5";
import { useBreadCrumb } from "@/stores/breadcrump";
import GradeModal from "@/components/course/utils/GradeModal.vue";
import { AxiosInstance } from "@/axios";
import VisibilityDropdown from "@/components/course/utils/VisibilityDropdown.vue";
import GradesTab from "@/components/course/tabs/GradesTab.vue";
interface GradePageProps {
  assignmentId: number;
  sectionId: number;
  courseFlag: string;
}

interface GradeRecord {
  id: number;
  score?: number;
  studentName: string;
  studentId: number;
  studentUsername: string; //! This is the KFUPM id for students
  isSubmitted: boolean;
  visible: number;
}

interface GradeInput {
  title: string;
  description?: string;
  courseFlag: string;
  visible: boolean;
  fullScore: number;
  records: GradeRecord[];
}

const props = defineProps<GradePageProps>();
const router = useRouter();
const iconUtils = useIcon();

// TODO: fetch all the grades for the assignment id requested

const grade = reactive<GradeInput>({
  title: "dfdfdf",
  description: "sdffsd",
  courseFlag: props.courseFlag,
  visible: false,
  fullScore: 20,
  records: [],
});

const switchVisibility = async () => {
  console.log("BEFORE", grade.visible);

  await AxiosInstance.patch("grades/" + props.assignmentId, {
    visible: !+grade.visible,
  });
  grade.visible = !grade.visible;
};

onBeforeMount(async () => {
  const { records, title, description, fullScore } = (
    await AxiosInstance.get(`grades/section/${props.assignmentId}`)
  ).data;
  grade.records = records;
  grade.title = title;
  grade.description = description;
  grade.fullScore = fullScore;
  grade.visible = !grade.records.find(
    (record: GradeRecord) => record.visible === 0
  );
});

const breadcrumbs = useBreadCrumb();
const messenger = useMessage();

breadcrumbs.updateOptions([
  {
    label: "Home",
    path: "/home",
  },
  {
    label: props.courseFlag,
    path: `/course/${props.sectionId}`,
  },
  {
    label: `Grading`,
    path: `/grade/${props.sectionId}/${props.assignmentId}`,
  },
]);

// grading modal state
const gradeModalState = reactive<{
  visible: boolean;
  record: GradeRecord;
  gradeId: number;
  studentId: number;
  maxScore: number;
  studentName: string;
}>({
  visible: false,
  record: grade.records[0],
  maxScore: grade.fullScore,
  studentName: "",
  studentId: 0,
  gradeId: 0,
});

function openGradeModal(row: GradeRecord) {
  gradeModalState.visible = true;
  gradeModalState.record = row;
  gradeModalState.studentName = row.studentName;
  gradeModalState.studentId = row.studentId;
  gradeModalState.gradeId = row.id;
  gradeModalState.maxScore = grade.fullScore;
}

function closeGradeModal(newScore?: number, gradeId?: number) {
  gradeModalState.visible = false;
  if (newScore !== undefined && gradeId !== undefined) {
    const newRecords = grade.records.map((record) => {
      if (record.id === gradeId) {
        return { ...record, score: newScore };
      } else {
        return record;
      }
    });
    grade.records = newRecords;
  }
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
      width: 80,
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
              record.score === undefined || record.score === null
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
            type: "warning",
            secondary: true,
            strong: true,
            class: "t-py-2",
            onClick: () => openGradeModal(record),
          },
          {
            default: () => [
              h(
                NSpace,
                { align: "center" },
                {
                  default: () => [
                    h(
                      iconUtils.renderIcon(Star20Filled, {
                        size: "22",
                        class: "t-inline-flex t-items-center t-h-20 t-mr-0",
                      })
                    ),
                    "Grade",
                  ],
                }
              ),
            ],
          }
        );
      },
    },
  ];
}

// TODO emitting messages from children components to parent
</script>

<template>
  <main class="t-pb-40 md:t-pb-0">
    <GradeModal
      :grade-id="gradeModalState.gradeId"
      :assignment-id="props.assignmentId"
      :student-id="gradeModalState.studentId"
      :title="grade.title"
      :visible="gradeModalState.visible"
      @closed="closeGradeModal"
      :max-score="gradeModalState.maxScore"
      :name="gradeModalState.studentName"
    />
    <header class="t-mb-4 t-flex t-items-center">
      <VisibilityDropdown
        :visible="grade.visible"
        @single-toggle="switchVisibility"
      />
      <span class="t-ml-4">
        <NText id="assignment-title" class="t-font-semibold">{{
          grade.title
        }}</NText>
        <p class="t-text-gray-400 t-font-medium" v-if="grade.description">
          {{ grade.description }}
        </p>
      </span>
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
