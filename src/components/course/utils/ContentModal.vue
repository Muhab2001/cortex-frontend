<template>
  <NModal
    :auto-focus="true"
    :close-on-esc="true"
    :trap-focus="true"
    :show="props.visible"
    :title="props.mode == 'edit' ? 'Edit Content' : 'Create Content'"
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
            <ContentView20Filled></ContentView20Filled>
          </Icon>
        </NIcon>
        <span class="t-font-semibold t-text-xl">{{
          props.mode == "edit" ? "Edit Content" : "Create Content"
        }}</span>
      </div>
    </template>
    <NDivider class="t-my-0 t-mb-2"></NDivider>
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
    <NDivider class="t-mt-0 t-mb-3"></NDivider>
    <div class="t-font-semibold t-text-md t-pt-0">
      {{
        props.mode == "edit"
          ? "Edit Content"
          : "Fill the required fields to create a new content item"
      }}
    </div>
    <NForm class="t-mt-5" :model="modelRef" :rules="rules" ref="formRef">
      <h2 class="t-font-semibold t-mb-0 t-text-blue-400">Content Details</h2>
      <p class="t-mb-4">Describe the content item for students</p>
      <NFormItem
        label="Title"
        path="title"
        feedback="Provide a title that is unique among other assignments for the section"
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
        Content Availability
      </h2>
      <p v-if="props.mode === 'create'" class="t-mb-2">
        Choose targeted sections, and the visibilty of created item
      </p>
      <NFormItem
        v-if="props.mode === 'create'"
        class="t-inline-flex t-mr-4"
        label-placement="left"
        :label-style="{
          fontWeight: 'bolder',
        }"
        label="Sections"
        path="sections"
      >
        <NCheckboxGroup v-model:value="modelRef.sections">
          <NCheckbox
            v-for="section in courseSections"
            :key="section.id"
            :label="section.section_number.toString()"
            :value="section.id"
          ></NCheckbox>
        </NCheckboxGroup>
      </NFormItem>
      <NFormItem
        class="t-mt-3"
        :label-style="{
          fontWeight: 'bolder',
        }"
        label="Content Visibility"
        path="visible"
      >
        <NSwitch
          class="t-py-2 t-h-10"
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
      <h2 class="t-font-semibold t-mb-0 t-mt-3 t-text-blue-400">
        Attachements
      </h2>
      <p class="t-mb-0">Supply all needed files for the course item</p>

      <NFormItem class="t-mt-0 t-pt-0" path="attachements">
        <!-- TODO: add the default file list on editing -->
        <NUpload
          class="t-mt-0 t-pt-0"
          multiple
          ref="uploadRef"
          :default-upload="false"
          action="https://www.mocky.io/v2/5e4bafc63100007100d8b70f"
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
import { AxiosInstance } from "@/axios";
import { CourseMeta } from "@/injection_keys/courseView.keys";
import {
  ContentView20Filled,
  Eye20Filled,
  EyeOff16Filled,
} from "@vicons/fluent";
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
  type FormValidationError,
  type UploadFileInfo,
  NDivider,
  NCheckboxGroup,
  NButtonGroup,
  NEllipsis,
  NInputGroupLabel,
  useMessage,
  useLoadingBar,
} from "naive-ui";
import { ref, watch, inject, type CSSProperties, onBeforeMount } from "vue";

const props = defineProps<ContentModalProps>();
const emits = defineEmits<{
  (e: "closed"): void;
}>();

interface ContentItem {
  id: number;
  title: string;
  description?: string;
  visible: boolean;
  fileUrls: string[];
}

interface ContentModalProps {
  visible: boolean;
  mode: "edit" | "create";
  targetItem?: ContentItem;
}

interface ContentModel {
  title: string;
  description?: string;
  sections: number[];
  visible: boolean;
}

// UI utils
const messenger = useMessage();
const loading = useLoadingBar();
// injection logic
const courseMeta = inject(CourseMeta);
console.log(courseMeta);
// TODO replace with an API call
const courseSections = ref<{ id: number; section_number: number }[]>([]);

// form state
const currentUploadId = ref<number>(0);
const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);
const modelRef = ref<ContentModel>({
  title: "",
  description: "",
  // replace with a fetch request to the api for all sections under the course in current term
  sections: [],
  visible: false,
});
// form validation
const rules: FormRules = {
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
};

// handling pre-filling the modal content on editing mode
watch(
  () => props.visible,
  async () => {
    if (props.visible) {
      courseSections.value = (
        await AxiosInstance.get(
          `/course/instructor/${courseMeta?.value.courseId}/${courseMeta?.value.term}`
        )
      ).data.map((section: any) => ({
        id: section.id,
        section_number: section.section_number,
      }));
      if (props.mode === "edit") {
        modelRef.value = {
          title: props.targetItem!.title,
          description: props.targetItem!.description,
          // replace with a fetch request to the api for all sections under the course in current term
          sections: [props.targetItem!.id],
          visible: Boolean(props.targetItem!.visible),
        };
      } else if (props.mode === "create") {
        modelRef.value = {
          title: "",
          description: "",
          // replace with a fetch request to the api for all sections under the course in current term
          sections: [],
          visible: false,
        };
      }
    }
  }
);
// handling file upload to each section
watch(currentUploadId, async () => {
  try {
    console.log("BEFORE", currentUploadId.value);

    if (currentUploadId.value !== 0) uploadRef.value?.submit();
    console.log("submitted");
  } catch (e) {
    // if upload fails, delete the new assignment to maintain consistency
    await AxiosInstance.delete("content/upload/" + currentUploadId.value);
  }
});

// switch styling
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
        if (props.mode === "create") {
          try {
            loading.start();
            messenger.loading("Processing Content Creation", {
              duration: 500,
            });
            console.log(modelRef.value.sections);

            for (const section of modelRef.value.sections) {
              const newId = (
                await AxiosInstance.post("content/" + section, {
                  title: modelRef.value.title,
                  description: modelRef.value.description,
                  visible: +modelRef.value.visible,
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

            await AxiosInstance.patch("content/" + props.targetItem!.id, {
              title: modelRef.value.title,
              description: modelRef.value.description,
              visible: +modelRef.value.visible,
            });

            // updating the path to submit the files
            currentUploadId.value = props.targetItem!.id;
            messenger.success("Successful Assignment Update!");

            loading.finish();

            messenger.info("Refresh the page to see the changes");
            emits("closed");
          } catch (e) {
            loading.error();
            messenger.error("Assignment Update Failed!");
          }
        }
      }
    }
  );
}

const customRequest = async ({ file }: UploadCustomRequestOptions) => {
  const formData = new FormData();
  try {
    console.log("CURRENT", currentUploadId.value);

    if (file) formData.append("files", file.file as File);

    await AxiosInstance.patch(
      `content/upload/` + currentUploadId.value,
      formData
    );
  } catch (e) {
    messenger.error("File Upload Failed");
  }
};
</script>
