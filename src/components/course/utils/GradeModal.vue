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
    class="t-w-full md:t-w-[80%]"
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
    <p class="t-text-gray-500 t-mb-5">Submissions submitted by the student</p>
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
      <NIcon size="30" class="t-mb-2" :component="EmojiSad16Filled" />
      <NText>No Submissions recieved</NText>
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
      <NFormItem class="t-mt-4" label="Score" path="score">
        <NInputNumber
          placeholder="Enter a brief description"
          path="score"
          :default-value="0"
          :precision="2"
          :min="0"
          :max="props.maxScore"
          v-model:value="modelRef.score"
        ></NInputNumber> </NFormItem
    ></NForm>
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
import { EmojiSad16Filled, Star20Filled } from "@vicons/fluent";
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
  NText,
  useMessage,
  type FormInst,
  type FormRules,
  type FormValidationError,
} from "naive-ui";
import { ref, type Ref } from "vue";
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
}

interface GradeModalProps {
  title: string;
  visible: boolean;
  score?: number;
  assignmentId: number;
  studentId: string;
  maxScore: number;
  name: string;
}

const props = defineProps<GradeModalProps>();
const emits = defineEmits<{
  (e: "closed"): void;
}>();
const messenger = useMessage();

// form state
const formRef = ref<FormInst | null>(null);
const modelRef = ref<GradeModel>({
  score: 0,
  comment: "",
});

// TODO: replace with an api call for submission details from student ID in assignment ID
const submissions: Ref<Submission[]> = ref<Submission[]>([
  {
    count: 1,
    submissionDate: new Date().toLocaleString(),
    comment: "The UML class diagram is supplied in a different PDF file",
    fileUrls: [
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg",
      "https://blackboard.kfupm.edu.sa/bbcswebdav/pid-1833278-dt-content-rid-22203929_1/courses/221-GS-318-merged-nawaf/182-GS-318-merged-nawaf_ImportedContent_20181225020849/Chapter%2024.pdf",
    ],
  },
  {
    count: 2,
    submissionDate: new Date().toLocaleString(),
  },
  {
    count: 3,
    submissionDate: new Date().toLocaleString(),
    fileUrls: [
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg",
    ],
  },
]);

const rules: FormRules = {
  comment: {
    required: false,
    type: "string",
    message: "Description must be a valid string",
    trigger: "blur",
  },
  score: {
    required: true,
    type: "float",
    message: "You need to provide a score for the submission!",
    trigger: "blur",
    min: 0,
  },
};

function submitForm() {
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          messenger.success("Submission Graded Succesfully!");
        } catch (e: any) {
          messenger.error("Assignment creation Failed!");
        }
      } else {
        console.log(errors);
        messenger.error("Login Failed!");
      }
    }
  );
}
</script>
<style></style>
