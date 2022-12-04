<template>
  <NModal
    :auto-focus="true"
    :on-esc-click="() => $emit('closed')"
    :mask-closable="false"
    :block-scroll="true"
    :trap-focus="true"
    :show="props.visible"
    :title="props.mode == 'edit' ? 'Edit Assignment' : 'Create Assignment'"
    transform-origin="center"
    content-style="padding-bottom: 0px"
    preset="card"
    class="t-w-full md:t-w-[80%] t-max-w-7xl"
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
            courseInfo?.courseId
          }}</span>
          <span
            class="t-text-sm t-font-medium t-bg-blue-200 t-py-[0.1rem] t-px-2 t-rounded-md t-text-blue-600"
            >Term {{ courseInfo?.term }}</span
          >
        </div>
        <NEllipsis class="t-text-lg" :line-clamp="1">{{
          courseInfo?.courseName
        }}</NEllipsis>
      </div>
    </div>
    <NDivider class="t-mt-0 t-mb-1"></NDivider>
    <div class="t-font-semibold t-text-md t-pt-0">
      {{
        props.mode == "edit"
          ? "Edit Assignment"
          : "Fill the required fields to create a new assignment"
      }}
    </div>
    <NForm class="t-mt-5" :model="modelRef" :rules="rules" ref="formRef">
      <h2 class="t-font-semibold t-mb-0 t-text-blue-400">Assignment Details</h2>
      <p class="t-mb-4">Describe the assignment specifics for students</p>
      <NFormItem
        feedback="Provide a title that is unique among other assignments for the section"
        label="Title"
        path="title"
      >
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

      <h2 class="t-font-semibold t-mb-0 t-text-blue-400">
        Assignment Availability
      </h2>
      <p class="t-mb-2">
        Choose targeted sections, and the visibilty of created item, and the
        deadline
      </p>
      <NFormItem
        v-if="props.mode === 'create'"
        class="t-mt-4"
        :label-style="{
          fontWeight: 'bold',
        }"
        label="Sections"
        path="sections"
        feedback="Select all sections targeted by the assignment (must select 1 at least)"
      >
        <NCheckboxGroup v-model:value="modelRef.sections">
          <NCheckbox
            v-for="section in courseSections"
            :key="section"
            :label="section.toString()"
            :value="section"
          ></NCheckbox>
        </NCheckboxGroup>
      </NFormItem>
      <NFormItem
        v-if="props.mode === 'create'"
        class="t-mt-5"
        label="Submisstion Block"
        path="isSubmittable"
        feedback="Disable for physical assginments and assessments and submit grades directly"
      >
        <NSwitch
          class="t-py-2 t-h-10"
          :round="false"
          v-model:value="modelRef.isSubmittable"
          :rail-style="railStyle"
        >
          <template #checked
            ><div>
              <span>Submittable</span>
            </div></template
          >
          <template #unchecked
            ><div>
              <span>Blocked</span>
            </div></template
          >
        </NSwitch>
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
      <NFormItem
        feedback="The last date for assignment submission"
        class="t-mt-6"
        label="Deadline"
        path="deadline"
      >
        <NDatePicker
          clearable
          v-model:value="modelRef.deadline"
          type="datetime"
          :is-date-disabled="disablePrevDates"
        />
      </NFormItem>
      <h2 class="t-font-semibold t-mb-0 t-mt-3 t-text-blue-400">
        Submission policy
      </h2>
      <p class="t-mb-0">Restrictions on student submissions</p>

      <NFormItem
        class="t-mt-5"
        label="Submisstion Count Limit"
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
          feedback="Specify the submission limit (1 or more)"
          label="Submission Limit"
          path="submissions"
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
      <NFormItem
        class="t-pt-5"
        path="maxScore"
        label="Max Score"
        feedback="Maximum possible score for the assignment"
      >
        <NInputNumber
          :default-value="1"
          :precision="2"
          min="1"
          v-model:value="modelRef.maxScore"
          placeholder="Enter the maximum possible score of the assignment"
      /></NFormItem>
      <h2 class="t-font-semibold t-mb-0 t-mt-3 t-text-blue-400">
        Attachements
      </h2>
      <p class="t-mb-0">Supply all needed files to solve the assignment</p>

      <NFormItem class="t-my-0 t-py-0" path="attachements">
        <!-- TODO: add the default file list on editing -->
        <NUpload
          show-download-button
          name="files"
          class="t-mt-0 t-py-0"
          multiple
          ref="uploadRef"
          :default-upload="false"
          :default-file-list="props.targetItem?.fileUrls.map((url: string) => ({id: url, name: url.replace(/.*\//g, ''), url: AxiosInstance.defaults.baseURL + url} as UploadFileInfo ))"
          :custom-request="customRequest"
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
  useLoadingBar,
  NInputNumber,
  type FormValidationError,
  useMessage,
  NCollapseTransition,
  type UploadFileInfo,
} from "naive-ui";
import {
  inject,
  ref,
  type CSSProperties,
  watch,
  computed,
  reactive,
  type ComputedRef,
  type Ref,
} from "vue";
import { DiceThree, Infinity } from "@vicons/fa";
import { AxiosInstance } from "@/axios";

interface AssignmentItem {
  id: number;
  title: string;
  description?: string;
  submissions?: number;
  deadline: number;
  visible: boolean;
  fileUrls: string[];
  isUnlimited: boolean;
  isSubmittable: boolean;
  maxScore: number;
}

interface AssignmentModalProps {
  visible: boolean;
  mode: "edit" | "create";
  targetItem?: AssignmentItem;
}

interface AssignmentModel {
  title: string;
  description?: string;
  sections: number[];
  deadline: number;
  submissions?: number;
  isUnlimited: boolean;
  visible: boolean;
  maxScore: number;
  isSubmittable: boolean;
}

const props = defineProps<AssignmentModalProps>();
const emits = defineEmits<{
  (
    e: "closed",
    itemProps?: {
      id: number;
      title: string;
      description?: string;
      deadline: number;
      visible: boolean;
      isUnlimited: boolean;
      maxScore: number;
    }
  ): void;
}>();

const messenger = useMessage();
const loading = useLoadingBar();
const courseInfo = inject(CourseMeta);
// TODO: replace with an api call
const courseSections = ref<number[]>([]);
// form state
const currentUploadId = ref<number>(0);
const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);
const modelRef = reactive<AssignmentModel>({
  title: "",
  sections: [],
  description: "",
  visible: false,
  isUnlimited: true,
  deadline: Date.now() + 60 * 60 * 60 * 24,
  maxScore: 1,
  isSubmittable: true,
  submissions: 1,
});
console.log(modelRef.deadline);

const rules: ComputedRef<FormRules> = computed(() => ({
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
    required: props.mode !== "edit",
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
  isSubmittable: {
    required: true,
    type: "boolean",
    trigger: "blur",
  },
  isUnlimited: {
    required: true,
    type: "boolean",
  },
  submissions: {
    required: modelRef.isUnlimited,
    min: 1,
    type: "number",
    trigger: "blur",
    message:
      "Limited submission policy requires specifying the number of allowed submissions",
  },
  deadline: {
    required: true,
    type: "number",
    trigger: "blur",
  },
  maxScore: {
    required: true,
    min: 1,
    type: "number",
    trigger: "blur",
    message:
      "You need to specify a nonzero positive maxscore for the assignment",
  },
}));

// pre-fill on edit mode

// handling pre-filling the modal content on editing mode
watch(
  () => props.visible,
  async () => {
    if (props.visible) {
      courseSections.value = (
        await AxiosInstance.get(
          `/course/instructor/${courseInfo?.value.courseId}/${courseInfo?.value.term}`
        )
      ).data;
      if (props.mode === "edit") {
        modelRef.title = props.targetItem!.title;
        modelRef.description = props.targetItem!.description;
        // replace with a fetch request to the api for all sections under the course in current term

        modelRef.visible = props.targetItem!.visible;
        modelRef.deadline = props.targetItem!.deadline;
        modelRef.isUnlimited = props.targetItem!.isUnlimited;
        modelRef.maxScore = props.targetItem!.maxScore;
        modelRef.isSubmittable = props.targetItem!.isSubmittable;
        modelRef.submissions = props.targetItem!.submissions;
      } else if (props.mode === "create") {
        modelRef.title = "";
        modelRef.description = "";
        // replace with a fetch request to the api for all sections under the course in current term
        modelRef.sections = [];
        modelRef.visible = false;
        modelRef.isUnlimited = false;
        modelRef.isSubmittable = true;
        modelRef.submissions = 1;
      }
    }
  }
);

const handleDownload = async (file: UploadFileInfo) => {
  await AxiosInstance.get(file.url!, { responseType: "blob" });
};

const removeItem = async (file: UploadFileInfo) => {
  if (props.targetItem && props.targetItem.fileUrls.includes(file.url!))
    await AxiosInstance.delete("assignments/files/" + props.targetItem.id, {});
};

// datePicker setup

const disablePrevDates = (ts: number) =>
  ts <= Math.min(Date.now(), props.targetItem?.deadline ?? Date.now());

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

watch(currentUploadId, async () => {
  try {
    if (currentUploadId.value !== 0) uploadRef.value?.submit();
  } catch (e) {
    // if upload fails, delete the new assignment to maintain consistency
    await AxiosInstance.delete("/assignments/" + currentUploadId.value);
  }
});
// form submission handling
// TODO: API communications
function submitForm() {
  console.log(modelRef);

  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        if (props.mode === "create") {
          try {
            loading.start();
            messenger.loading("Processing Assignment Creation", {
              duration: 500,
            });
            for (const section of modelRef.sections) {
              const newId = (
                await AxiosInstance.post("assignments/", {
                  sectionId: section,
                  title: modelRef.title,
                  description: modelRef.description,
                  isSubmittable: +modelRef.isSubmittable,
                  visible: +modelRef.visible,
                  deadline: new Date(modelRef.deadline).toISOString(),
                  maxPoints: modelRef.maxScore,
                  maxSubmissionCount: modelRef.submissions,
                })
              ).data;
              // updating the path to submit the files
              currentUploadId.value = newId;
            }
            messenger.success("Successful Assignment Creation!");

            loading.finish();

            emits("closed");
          } catch (e: any) {
            loading.error();
            messenger.error("Assignment creation Failed!");
          }
        } else if (props.mode === "edit") {
          try {
            loading.start();
            messenger.loading("Processing Assignment Update", {
              duration: 500,
            });
            const newId = (
              await AxiosInstance.put("assignments/" + props.targetItem!.id, {
                title: modelRef.title,
                description: modelRef.description,
                isSubmittable: +modelRef.isSubmittable,
                visible: +modelRef.visible,
                deadline: new Date(modelRef.deadline).toISOString(),
                maxPoints: modelRef.maxScore,
                maxSubmissionCount: modelRef.submissions,
              })
            ).data;
            // updating the path to submit the files
            currentUploadId.value = newId;
            messenger.success("Successful Assignment Update!");

            loading.finish();
            console.log("ID", props.targetItem!.id);

            emits("closed", {
              title: modelRef.title,
              description: modelRef.description,
              deadline: modelRef.deadline,
              visible: modelRef.visible,
              isUnlimited: modelRef.isUnlimited,
              maxScore: modelRef.maxScore,
              id: props.targetItem!.id,
            });
          } catch (e) {
            loading.error();
            messenger.error("Assignment Update Failed!");
          }
        }
      }
    }
  );
}

const customRequest = async ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress,
}: UploadCustomRequestOptions) => {
  const formData = new FormData();
  try {
    if (file) formData.append("files", file.file as File);
    await AxiosInstance.patch(
      `assignments/upload/` + currentUploadId.value,
      formData
    );
  } catch (e) {
    messenger.error("File Upload Failed");
  }
};
</script>
<style></style>
