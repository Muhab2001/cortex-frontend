<template>
  <NModal
    :auto-focus="true"
    :on-esc-click="() => $emit('closed')"
    :mask-closable="false"
    :block-scroll="true"
    :trap-focus="true"
    :show="props.visible"
    :title="props.mode == 'edit' ? 'Edit Content' : 'Create Content'"
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
            <AssignmentRound></AssignmentRound>
          </Icon>
        </NIcon>
        <span class="t-font-semibold t-text-xl">{{
          props.mode == "edit" ? "Edit Assignment" : "New Assignment"
        }}</span>
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
      {{
        props.mode == "edit"
          ? "Edit Content"
          : "Fill the required fields to create a new content item"
      }}
    </div>
    <NForm class="t-mt-5" :model="modelRef" :rules="rules" ref="formRef">
      <h2 class="t-font-semibold t-mb-0">Assignment Details</h2>
      <p class="t-mb-4">Describe the assignment specifics for students</p>
      <NFormItem label="Title" path="title">
        <NInput
          maxlength="30"
          type="text"
          show-count
          v-model:value="modelRef.title"
        /> </NFormItem
      ><NFormItem class="t-mt-4" label="Description" path="description">
        <NInput
          placeholder="Enter a brief description"
          type="textarea"
          maxlength="200"
          show-count
          path="description"
          v-model:value="modelRef.description"
        ></NInput>
      </NFormItem>
      <!-- TODO: create a sectionGroup id for grouped editing -->

      <h2 class="t-font-semibold t-mb-0">Assignment Availability</h2>
      <p class="t-mb-2">
        Choose targeted sections, and the visibilty of created item, and the
        deadline
      </p>
      <NFormItem
        class="t-mt-4"
        :label-style="{
          fontWeight: 'bold',
        }"
        label="Sections"
        path="sections"
      >
        <NCheckboxGroup v-model:value="modelRef.sections">
          <NCheckbox
            v-for="section in allSections"
            :key="section"
            :label="section.toString()"
            :value="section"
          ></NCheckbox>
        </NCheckboxGroup>
      </NFormItem>
      <NFormItem
        class="t-mt-4"
        :label-style="{
          fontWeight: 'bolder',
        }"
        label="Assignment Visibility"
        path="visible"
        feedback="Toggle the visibility of this assignment to the students"
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
      </NFormItem>
      <NFormItem class="t-mt-6" label="Deadline" path="deadline">
        <NDatePicker
          clearable
          v-model:value="modelRef.deadline"
          type="datetime"
          :is-date-disabled="disablePrevDates"
        />
      </NFormItem>
      <h2 class="t-font-semibold t-mb-0 t-mt-3">Submission policy</h2>
      <p class="t-mb-0">Restrictions on student submissions</p>
      <NFormItem
        class="t-mt-5"
        label="Submisstion Constraint"
        path="isUnlimited"
        feedback="Specify whether to limit student submissions or not"
      >
        <NSwitch
          class="t-py-2 t-h-10"
          :round="false"
          v-model:value="modelRef.isUnlimited"
          :rail-style="railStyle"
        >
          <template #checked
            ><div>
              <NIcon class="t-mr-1">
                <Icon>
                  <Infinity></Infinity>
                </Icon> </NIcon
              ><span>Unlimited</span>
            </div></template
          >
          <template #unchecked
            ><div>
              <NIcon class="t-mr-1"
                ><Icon><DiceThree></DiceThree></Icon></NIcon
              ><span>Limited</span>
            </div></template
          >
        </NSwitch>
      </NFormItem>
      <NCollapseTransition :show="!modelRef.isUnlimited">
        <NFormItem
          class="t-pt-3"
          label-placement="left"
          feedback="Specify the submission limit (1 or more)"
        >
          <NInputNumber
            :default-value="1"
            :precision="0"
            min="1"
            v-model:value="modelRef.submissions"
            placeholder="Enter the number of
          allowed submissions"
        /></NFormItem>
      </NCollapseTransition>
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
  NCollapseTransition,
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

interface AssignmentItem {
  id: number;
  title: string;
  description?: string;
  submissions?: number;
  deadline: number;
  visible: boolean;
  fileUrls: string[];
  isUnlimited: boolean;
}

interface AssignmentModalProps {
  visible: boolean;
  mode: "edit" | "create";
  targetItem?: AssignmentItem;
}

interface AssignmentModel {
  title?: string;
  description?: string;
  sections?: number[];
  deadline?: number;
  submissions?: number;
  isUnlimited?: boolean;
  visible?: boolean;
}

const props = defineProps<AssignmentModalProps>();
const emits = defineEmits<{
  (e: "closed"): void;
}>();

const messenger = useMessage();
const courseMeta = inject(CourseMeta);
// TODO: replace with an api call
const allSections = [1, 2, 3];
// form state
const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);
const modelRef = ref<AssignmentModel>({
  title: "",
  sections: [],
  visible: false,
  isUnlimited: true,
  submissions: 0,
});
console.log(modelRef.value.deadline);

const rules: Ref<FormRules> = computed(() => ({
  title: {
    required: true,
    type: "string",
    message: "Title must be entered to create content",
    trigger: "blur",
  },
  description: {
    required: false,
    type: "string",
    message: "Description must be a valid string",
    trigger: "blur",
  },
  sections: {
    required: true,
    type: "array",
    validator(itemRule: FormItemRule, value: number[]) {
      console.log(value);

      if (value.length < 1) {
        return new Error("At least one section should be selected");
      } else {
        return true;
      }
    },
    trigger: "blur",
  },
  visible: {
    required: true,
    type: "boolean",
    trigger: "blur",
  },
  isUnlimited: {
    required: true,
    type: "boolean",
  },
  submissions: {
    required: modelRef.value.isUnlimited,
    min: 1,
    type: "number",
    trigger: "blur",
    message:
      "Limited submission policy requires specifying the number of allowed submissions",
  },
  deadline: {
    required: true,
    type: "string",
    trigger: "blur",
  },
}));

// pre-fill on edit mode

// handling pre-filling the modal content on editing mode
watch(
  () => props.visible,
  () => {
    if (props.visible) {
      if (props.mode === "edit") {
        modelRef.value = {
          title: props.targetItem?.title,
          description: props.targetItem?.description,
          // replace with a fetch request to the api for all sections under the course in current term
          sections: [1, 2],
          visible: props.targetItem!.visible,
          deadline: props.targetItem!.deadline,
          isUnlimited: props.targetItem!.isUnlimited,
          submissions: props.targetItem!.submissions,
        };
      } else if (props.mode === "create") {
        modelRef.value = {
          title: "",
          description: "",
          // replace with a fetch request to the api for all sections under the course in current term
          sections: [1, 2],
          visible: false,
          isUnlimited: false,
          submissions: 0,
        };
      }
    }
  }
);

// datePicker setup

const disablePrevDates = (ts: number) => ts <= Date.now();

// styling section
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
