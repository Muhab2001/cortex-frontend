<template>
  <NCard
    class="t-rounded-md t-border-solid t-border-[2px] t-cursor-pointer"
    header-style="padding-bottom: 0;"
    hoverable
    size="small"
  >
    <!--  card header -->
    <template #header
      ><div class="t-flex t-w-full t-justify-between t-flex-wrap">
        <div id="course-info" class="t-w-full">
          <div
            id="course-meta-info"
            class="t-flex t-justify-between t-items-center t-h-fit"
          >
            <span>
              <span class="t-font-bold t-mr-2 t-text-lg t-text-blue-500">{{
                props.courseId
              }}</span
              ><span
                class="t-text-xs t-font-medium t-bg-blue-200 t-py-[0.175rem] t-px-2 t-rounded-md t-text-blue-600"
                >{{ props.sectionNo }}</span
              >
            </span>
            <span class="t-text-slate-500 t-font-medium t-text-sm">{{
              props.deadline.toLocaleString()
            }}</span>
          </div>
          <NEllipsis line-clamp="1" expand-trigger="click" class="t-text-sm"
            >{{ props.courseName }}
          </NEllipsis>
        </div>
      </div></template
    >

    <!-- card body -->
    <template #action>
      <NDivider class="t-my-0 t-mb-2" />
      <div>
        <h3 class="t-font-bold t-mb-2">{{ props.title }}</h3>
        <div class="t-mb-1">
          <NProgress
            :percentage="percentage"
            :status="percentageStatus"
            :show-indicator="false"
            type="line"
          />
        </div>
        <div :class="styledProgress">{{ outputString }}</div>
      </div>
    </template>
  </NCard>
</template>

<script setup lang="ts">
import { NCard, NDivider, NProgress, NEllipsis } from "naive-ui";
import { computed, onUnmounted, ref } from "vue";

//  prop interface
interface deadlineProps {
  title: string;
  courseName: string;
  deadline: Date;
  originalDate: Date;
  courseId: string;
  sectionNo: number | string;
}

const props = defineProps<deadlineProps>();
//  ------

// counter setup
let counterId = ref(setInterval(updateCountdown, 1000));
//  state calculation
const milliDiff = ref<number>(new Date(props.deadline).getTime() - Date.now());
const daysDiff = computed(() =>
  Math.floor(milliDiff.value / 1000 / 60 / 60 / 24)
);
const hoursDiff = computed(() => {
  const diff = milliDiff.value - daysDiff.value * 1000 * 60 * 60 * 24;

  return Math.floor(diff / 1000 / 60 / 60);
});

const minutesDiff = computed(() => {
  const diff =
    milliDiff.value -
    daysDiff.value * 1000 * 60 * 60 * 24 -
    hoursDiff.value * 1000 * 60 * 60;

  return Math.floor(diff / 1000 / 60);
});

const secondsDiff = computed(() => {
  const diff =
    milliDiff.value -
    daysDiff.value * 1000 * 60 * 60 * 24 -
    hoursDiff.value * 1000 * 60 * 60 -
    minutesDiff.value * 1000 * 60;

  return Math.floor(diff / 1000);
});

const percentage = computed(() => {
  const result =
    (milliDiff.value /
      (props.deadline.getTime() - props.originalDate.getTime())) *
    100;
  if (result > 0) return result;
  return 0.5;
});

const percentageStatus = computed(() => {
  if (percentage.value < 20) {
    return "error";
  } else if (percentage.value < 50) {
    return "warning";
  } else {
    return "info";
  }
});

const outputString = computed(() => {
  if (milliDiff.value < 0) {
    clearInterval(counterId.value);
    return "Deadline Expired!";
  }
  let result = "";
  if (daysDiff.value !== 0) {
    result += `${daysDiff.value}d`;
  }
  if (hoursDiff.value !== 0) {
    result += ` ${hoursDiff.value}h `;
  }
  if (minutesDiff.value !== 0 && daysDiff.value === 0) {
    result += `${minutesDiff.value}m `;
  }
  if (
    secondsDiff.value !== 0 &&
    hoursDiff.value === 0 &&
    daysDiff.value === 0
  ) {
    result += `${secondsDiff.value}s`;
  }
  result += " Left";
  return result;
});

const styledProgress = computed(() => ({
  "red-text": percentage.value < 20,
  "orange-text": percentage.value < 50,
  "blue-text": percentage.value >= 50,
}));

function updateCountdown(): void {
  console.log(
    daysDiff.value,
    hoursDiff.value,
    minutesDiff.value,
    secondsDiff.value,
    milliDiff.value
  );

  if (milliDiff.value !== 0) milliDiff.value -= 1000;
  else {
    clearInterval(counterId.value);
  }
}

onUnmounted(() => {
  () => {
    clearInterval(counterId.value);
  };
});
</script>

<style>
.red-text {
  @apply t-text-red-300 t-font-semibold;
}

.blue-text {
  @apply t-text-blue-600 t-font-normal;
}

.orange-text {
  @apply t-text-orange-500 t-font-medium;
}
</style>
