<template>
  <NModal
    :auto-focus="true"
    :close-on-esc="true"
    :trap-focus="true"
    :show="props.visible"
    title="New Submission"
    transform-origin="center"
    content-style="padding-bottom: 0px"
    preset="card"
    class="t-w-full md:t-w-[80%] t-max-w-7xl"
    @close="$emit('closed')"
    size="large"
  >
    <template #header>
      <div class="t-font-semibold t-text-lg t-flex t-items-center">
        <NIcon style="margin-left: 0" class="t-mr-2" color="#FFBF00" size="28">
          <Icon>
            <Star20Filled></Star20Filled>
          </Icon>
        </NIcon>
        <span class="t-font-semibold t-text-xl"
          >Grade Submission for
          <span class="t-text-blue-500">{{ props.title }}</span></span
        >
      </div>
    </template>
    <NDivider class="t-my-0"></NDivider>
    <h2 class="t-py-4 t-pb-0 t-font-medium">{{ props.name }}'s Submissions</h2>
    <p class="t-text-gray-500 dark:t-text-gray-400 t-mb-5">
      Submissions submitted by the student
    </p>
    <!-- submission info section -->
    <section v-if="submissions.length != 0" class="t-mb-3">
      <SubmissionItem
        v-for="submission in submissions"
        v-bind="submission"
        :key="submission.count"
      />
    </section>
    <section
      v-else
      class="t-mb-3 t-text-gray-500 t-flex t-flex-col t-items-center"
    >
      <NIcon
        size="30"
        class="t-mb-2"
        color="rgb(251 146 60)"
        :component="EmojiSad16Filled"
      />
      <NText class="t-text-orange-400 t-font-semibold t-text-md"
        >No Submissions recieved</NText
      >
    </section>
    <!-- form section -->
    <NForm :rules="rules" ref="formRef" :model="modelRef">
      <NFormItem
        class="t-mt-4"
        label="Comment"
        path="comment"
        feedback="Steer the students on the right track with a helpful feedback"
      >
        <NInput
          placeholder="provide feedback for the student"
          type="textarea"
          maxlength="200"
          show-count
          path="comment"
          v-model:value="modelRef.comment"
        ></NInput>
      </NFormItem>
      <NFormItem
        class="t-mt-4"
        :label="`Score (out of ${props.maxScore})`"
        path="score"
      >
        <NInputNumber
          placeholder="Enter a brief description"
          path="score"
          :default-value="0"
          :precision="2"
          :min="0"
          :max="props.maxScore"
          v-model:value="modelRef.score"
        ></NInputNumber>
      </NFormItem>
      <NFormItem
        class="t-my-4"
        :label-style="{
          fontWeight: 'bolder',
        }"
        label="Grade Visibility"
        path="visible"
        feedback="Toggle the visibility of this grade to the student"
      >
        <NSwitch
          class="t-pt-0 t-h-10"
          :round="false"
          v-model:value="modelRef.visible"
          :rail-style="railStyle"
        >
          <template #checked
            ><div>
              <NIcon class="t-mr-1">
                <Icon>
                  <Eye20Filled></Eye20Filled>
                </Icon> </NIcon
              ><span>Visible</span>
            </div></template
          >
          <template #unchecked
            ><div>
              <NIcon class="t-mr-1"
                ><Icon><EyeOff16Filled></EyeOff16Filled></Icon></NIcon
              ><span>Hidden</span>
            </div></template
          >
        </NSwitch>
      </NFormItem></NForm
    >
    <NDivider class="t-mt-0" />
    <template #footer>
      <NButton
        secondary
        strong
        @click="submitForm"
        class="t-mr-2"
        type="success"
        >Submit</NButton
      >
      <NButton @click="$emit('closed')" type="default">Cancel</NButton>
    </template>
  </NModal>
</template>
<script setup lang="ts">
import { AxiosInstance } from "@/axios";
import {
  EmojiSad16Filled,
  Eye20Filled,
  EyeOff16Filled,
  Star20Filled,
} from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import {
  NButton,
  NDivider,
  NForm,
  NIcon,
  NInputNumber,
  NFormItem,
  NInput,
  NModal,
  NSwitch,
  NText,
  useMessage,
  useLoadingBar,
  type FormInst,
  type FormRules,
  type FormValidationError,
} from "naive-ui";
import { ref, type Ref, watch, type CSSProperties } from "vue";
import SubmissionItem from "../items/SubmissionItem.vue";

interface Submission {
  submissionDate: string;
  comment?: string;
  fileUrls?: string[];
  count: number;
}

interface GradeModel {
  score: number;
  comment?: string;
  visible: boolean;
}

interface GradeModalProps {
  title: string;
  gradeId: number;
  assignmentId: number;
  studentId: number;
  visible: boolean;
  maxScore: number;
  name: string;
}

const props = defineProps<GradeModalProps>();
const emits = defineEmits<{
  (e: "closed", newScore?: number, gradeId?: number): void;
}>();
const messenger = useMessage();
const loading = useLoadingBar();

// form state
const formRef = ref<FormInst | null>(null);
const modelRef = ref<GradeModel>({
  score: 0,
  comment: "",
  visible: false,
});

const submissions: Ref<Submission[]> = ref<Submission[]>([]);

const rules: FormRules = {
  comment: {
    required: false,
    type: "string",
    message: "Description must be a valid string",
    trigger: "blur",
  },
  score: {
    required: true,
    type: "number",
    message: "You need to provide a score for the submission!",
    trigger: "blur",
    min: 0,
  },
  visible: {
    required: true,
    type: "boolean",
    trigger: "blur",
  },
};

const railStyle = ({
  focused,
  checked,
}: {
  focused: boolean;
  checked: boolean;
}) => {
  const style: CSSProperties = {};
  if (!checked) style.background = "gray";

  return style;
};

watch(
  () => props.visible,
  async () => {
    if (props.visible) {
      const grade = (await AxiosInstance.get("grades/" + props.gradeId)).data;
      modelRef.value.comment = "";
      modelRef.value.score = grade.score ?? null;
      submissions.value = (
        await AxiosInstance.get(`assignments/submissions/${props.assignmentId}`)
      ).data;
      modelRef.value.visible = Boolean(grade.visible);
    }
  }
);

function submitForm() {
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          loading.start();
          await AxiosInstance.post("grades/" + props.gradeId, {
            score: modelRef.value.score,
            comment: modelRef.value.comment,
            visible: +modelRef.value.visible,
          });
          messenger.success("Submission Graded Succesfully!");
          loading.finish();
          emits("closed", modelRef.value.score, props.gradeId);
        } catch (e: any) {
          loading.error();
          messenger.error("Grading failed");
        }
      } else {
        console.log(errors);
        messenger.error("Grading failed");
      }
    }
  );
}
</script>
<style></style>
