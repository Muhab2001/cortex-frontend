<template>
  <NModal
    :auto-focus="true"
    :on-esc-click="() => $emit('closed')"
    :mask-closable="false"
    :block-scroll="true"
    :trap-focus="true"
    :show="props.visible"
    title="Take Attendance"
    transform-origin="center"
    content-style="padding-bottom: 0px"
    preset="card"
    class="t-w-[80%]"
    @close="() => $emit('closed')"
    size="large"
  >
    <template #header>
      <div class="t-font-semibold t-text-lg t-flex t-items-center">
        <NIcon style="margin-left: 0" class="t-mr-2" color="#59C1BD" size="28">
          <Icon>
            <People24Filled></People24Filled>
          </Icon>
        </NIcon>
        <span class="t-font-semibold t-text-xl"> Take Attendance </span>
      </div>
    </template>
    <div class="t-px-4 t-py-2 t-flex t-justify-between t-w-full t-items-center">
      <div class="t-w-full t-py-0 t-flex t-flex-col t-items-center">
        <div class="t-flex t-items-center">
          <span class="t-font-bold t-mr-2 t-text-xl t-text-blue-500"
            >{{ courseMeta?.courseId }}-{{ courseMeta?.sectionNo }}</span
          >
          <span
            class="t-text-sm t-font-medium t-bg-blue-200 t-py-[0.1rem] t-px-2 t-rounded-md t-text-blue-600"
            >Term {{ courseMeta?.term }}</span
          >
        </div>
        <NEllipsis class="t-text-lg" :line-clamp="1">{{
          courseMeta?.courseName
        }}</NEllipsis>
        <div
          class="t-text-lg t-font-medium t-text-blue-500"
          name="attendance Date"
        >
          {{ new Date().toLocaleDateString() }}
        </div>
      </div>
    </div>
    <NDivider class="t-mt-0" />
    <section v-if="attendanceState.records.length !== 0">
      <div
        name="dots-holder"
        class="t-w-full t-flex t-justify-center t-flex-wrap"
      >
        <span
          v-for="(record, index) in attendanceState.records"
          :key="index"
          :class="recordsStyle[index]"
          @click="
            () => {
              navigate(undefined, index);
            }
          "
        ></span>
      </div>

      <div class="t-my-3 t-flex t-w-full t-flex-col t-items-center">
        <!-- current student name -->
        <div class="t-font-semibold t-my-0 t-h-fit t-text-[2rem]">
          {{ attendanceState.records[currentIndex].name }}
        </div>
        <!-- current student usernam (KFUPMID) -->
        <div class="t-text-blue-400 t-text-lg">
          {{ attendanceState.records[currentIndex].id }}
        </div>
        <NSpace class="t-my-10" align="center" justify="center"
          ><NButton
            class="t-flex t-flex-col t-py-4 t-items-center t-h-fit"
            secondary
            strong
            type="error"
            @click="
              () => {
                navigate(AttendanceIndex.ABSENT);
              }
            "
          >
            <template #icon
              ><NIcon size="30" :component="PersonDelete24Filled"
            /></template>
            Absent</NButton
          >
          <NButton
            class="t-flex t-flex-col t-py-4 t-items-center t-h-fit t-w-[78px]"
            secondary
            strong
            type="warning"
            @click="
              () => {
                navigate(AttendanceIndex.LATE);
              }
            "
            ><template #icon
              ><NIcon size="30" :component="PersonClock24Filled" /></template
            >Late</NButton
          >
          <NButton
            class="t-flex t-flex-col t-py-4 t-items-center t-h-fit t-w-[78px]"
            secondary
            strong
            type="success"
            @click="
              () => {
                navigate(AttendanceIndex.PRESENT);
              }
            "
            ><template #icon
              ><NIcon
                size="30"
                :component="PersonAvailable24Filled" /></template
            >Present</NButton
          >
        </NSpace>
      </div>
    </section>
    <section v-else>
      <div
        class="t-p-6 t-py-10 t-text-gray-400 t-flex t-flex-col t-items-center t-w-[78px]"
      >
        <NIcon size="30" :component="EmojiSad16Filled"></NIcon>
        <div>No Enrolled Students Yet! Hang in there</div>
      </div>
    </section>

    <NDivider class="t-mt-0" />
    <template #footer>
      <NButton @click="submitAttendance" class="t-mr-2" type="success"
        >Submit</NButton
      >
      <NButton @click="$emit('closed')" type="default">Cancel</NButton>
    </template>
  </NModal>
</template>
<script setup lang="ts">
import { CourseMeta } from "@/injection_keys/courseView.keys";
import {
  EmojiSad16Filled,
  People24Filled,
  PersonAvailable24Filled,
  PersonClock16Filled,
  PersonClock24Filled,
  PersonDelete24Filled,
} from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NModal, NIcon, NSpace, NButton, NDivider } from "naive-ui";
import { inject, reactive, onBeforeMount, ref, computed } from "vue";

interface AttendanceModalProps {
  sectionId: number;
  visible: boolean;
}

interface StudentRecord {
  name: string;
  id: string;
  status: AttendanceIndex;
}

enum AttendanceIndex {
  UNSET = -1,
  ABSENT = 0,
  LATE = 1,
  PRESENT = 2,
}

const props = defineProps<AttendanceModalProps>();
const emits = defineEmits<{ (e: "closed"): void }>();

const navigate = (newStatus?: AttendanceIndex, newIndex?: number) => {
  console.log(
    "value",
    currentIndex.value,
    "new status",
    newStatus,
    "new index",
    newIndex
  );

  if (newStatus !== undefined)
    attendanceState.records[currentIndex.value].status = newStatus;
  if (newIndex !== undefined) currentIndex.value = newIndex;
  else {
    if (currentIndex.value !== attendanceState.records.length - 1) {
      currentIndex.value = currentIndex.value + 1;
    }
  }
};

const courseMeta = inject(CourseMeta);

// use an API to populate the students of the section
const currentIndex = ref<number>(0);
const attendanceState = reactive<{
  records: StudentRecord[];
}>({
  records: [
    {
      id: "201945570",
      name: "first student",
      status: AttendanceIndex.UNSET,
    },
    {
      id: "201945571",
      name: "second student",
      status: AttendanceIndex.UNSET,
    },
    {
      id: "201945573",
      name: "last student",
      status: AttendanceIndex.UNSET,
    },
  ],
});

onBeforeMount(() => {});

const recordsStyle = computed(() => {
  if (attendanceState.records.length !== 0) {
    return attendanceState.records.map((record) => ({
      base_label: true,
      present: record.status === AttendanceIndex.PRESENT,
      absent: record.status === AttendanceIndex.ABSENT,
      late: record.status === AttendanceIndex.LATE,
      unset: record.status === AttendanceIndex.UNSET,
    }));
  } else {
    return [];
  }
});

const submitAttendance = () => {
  // API call tu submit the attendance record
  console.log(attendanceState.records);
};
</script>
<style scoped lang="postcss">
.base_label {
  @apply t-w-4 t-h-4 t-rounded-full t-mx-[2px] t-cursor-pointer t-mb-1;
}

.base_label:hover {
  transform: scale(1.15);
  transition: ease;
}
.present {
  @apply t-bg-green-400;
}

.late {
  @apply t-bg-orange-300;
}

.absent {
  @apply t-bg-red-500;
}

.unset {
  @apply t-bg-gray-500;
}
</style>
