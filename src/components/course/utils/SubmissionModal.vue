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
    class="t-w-[80%]"
    @close="$emit('closed')"
    size="large"
  >
    <template #header>
      <div class="t-font-semibold t-text-lg t-flex t-items-center">
        <NIcon style="margin-left: 0" class="t-mr-2" color="#59C1BD" size="28">
          <Icon>
            <AssignmentRound></AssignmentRound>
          </Icon>
        </NIcon>
        <span class="t-font-semibold t-text-xl">New Submission</span>
      </div>
    </template>
    <NDivider class="t-my-0"></NDivider>
    <div class="t-px-4 t-py-2 t-flex t-justify-between t-w-full t-items-center">
      <div class="t-w-fit t-py-0 title-container">
        <div class="t-flex t-items-center">
          <span class="t-font-bold t-mr-2 t-text-xl t-text-blue-500">{{
            courseMeta?.courseId
          }}</span>
          <span
            class="t-text-sm t-font-medium t-bg-blue-200 t-py-[0.1rem] t-px-2 t-rounded-md t-text-blue-600"
            >Term {{ courseMeta?.term }}</span
          >
        </div>
        <NEllipsis class="t-text-lg" :line-clamp="1">{{
          courseMeta?.courseName
        }}</NEllipsis>
      </div>
    </div>
    <NDivider class="t-mt-0 t-mb-1"></NDivider>
    <div class="t-font-semibold t-text-md t-pt-0">
      Fill the needed fields to submit the assignment
    </div>
    <NForm class="t-mt-5" :model="modelRef" :rules="rules" ref="formRef">
      <NFormItem class="t-mt-4" label="Comment" path="comment">
        <NInput
          placeholder="Enter a brief description"
          type="textarea"
          maxlength="200"
          show-count
          path="description"
          v-model:value="modelRef.comment"
        ></NInput>
      </NFormItem>

      <h2 class="t-font-semibold t-mb-0 t-mt-3">Attachements</h2>
      <p class="t-mb-0">Supply all needed files to solve the assignment</p>

      <NFormItem class="t-my-0 t-py-0" path="attachements">
        <!-- TODO: add the default file list on editing -->
        <NUpload
          class="t-mt-0 t-py-0"
          multiple
          ref="uploadRef"
          :default-upload="false"
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
          :custom-request="requestHandler"
          ><NButton>Upload files</NButton></NUpload
        >
      </NFormItem>
    </NForm>
    <NDivider class="t-mt-0" />
    <template #footer>
      <NButton @click="submitForm" class="t-mr-2" type="success"
        >Submit</NButton
      >
      <NButton @click="$emit('closed')" type="default">Cancel</NButton>
    </template>
  </NModal>
</template>
<script setup lang="ts">
import { AssignmentRound } from "@vicons/material";
import { CourseMeta } from "@/injection_keys/courseView.keys";
import { Eye20Filled, EyeOff16Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import {
  NIcon,
  NModal,
  NButton,
  NForm,
  NFormItem,
  NSwitch,
  NCheckbox,
  NInput,
  NUpload,
  type FormInst,
  type FormItemRule,
  type FormRules,
  type UploadCustomRequestOptions,
  type UploadInst,
  NDivider,
  NCheckboxGroup,
  NEllipsis,
  NDatePicker,
  NRadioGroup,
  NSpace,
  NInputNumber,
  type FormValidationError,
  useMessage,
} from "naive-ui";
import {
  inject,
  ref,
  type CSSProperties,
  watch,
  computed,
  type Ref,
} from "vue";
import { DiceThree, Infinity } from "@vicons/fa";

interface SubmissionModalProps {
  visible: boolean;
  assignmentId: number;
  title: string;
  description?: string;
}

interface SubmissionModel {
  comment?: string;
}

const props = defineProps<SubmissionModalProps>();
const emits = defineEmits<{
  (e: "closed"): void;
}>();

const messenger = useMessage();
const courseMeta = inject(CourseMeta);

// form state
const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);
const modelRef = ref<SubmissionModel>({
  comment: "",
});

const rules: Ref<FormRules> = computed(() => ({
  comment: {
    required: false,
    type: "string",
    message: "Description must be a valid string",
    trigger: "blur",
  },
}));

// form submission handling
// TODO: API communications
function submitForm() {
  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        try {
          messenger.success("Successful Assignment Creation!");
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

function requestHandler({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) {
  return null;
}
</script>
<style></style>
