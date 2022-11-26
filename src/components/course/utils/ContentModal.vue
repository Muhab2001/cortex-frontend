<template>
  <NModal
    :auto-focus="true"
    :close-on-esc="true"
    :trap-focus="true"
    :show="props.visible"
    :title="props.mode == 'edit' ? 'Edit Content' : 'Create Content'"
    transform-origin="center"
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
    <NDivider class="t-my-0"></NDivider>
    <div class="t-px-4 t-py-2 t-flex t-justify-between t-w-full t-items-center">
      <div class="t-w-fit t-py-0 title-container">
        <div class="t-flex t-items-center">
          <span class="t-font-bold t-mr-2 t-text-xl t-text-blue-700">{{
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
      <NFormItem label="Title" path="title">
        <NInput type="text" v-model:value="modelRef.title" /> </NFormItem
      ><NFormItem label="Description" path="description">
        <NInput
          placeholder="Enter a brief description"
          type="textarea"
          path="description"
          v-model:value="modelRef.description"
        ></NInput>
      </NFormItem>
      <!-- TODO: create a sectionGroup id for grouped editing -->
      <NFormItem label="Sections" path="sections">
        <NCheckboxGroup v-model:value="modelRef.sections">
          <NCheckbox
            v-for="section in allSections"
            :key="section"
            :label="section.toString()"
            :value="section"
          ></NCheckbox>
        </NCheckboxGroup>
      </NFormItem>
      <NFormItem label="Content Visibility" path="visible">
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
      <NFormItem label="Attachements" path="attachements">
        <!-- TODO: add the default file list on editing -->
        <NUpload
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
      <NButton class="t-mr-2" type="success">Submit</NButton>
      <NButton type="default">Cancel</NButton>
    </template>
  </NModal>
</template>

<script setup lang="ts">
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
  NDivider,
  NCheckboxGroup,
  NButtonGroup,
  NEllipsis,
} from "naive-ui";
import { ref, watch, inject, type CSSProperties } from "vue";

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
  title?: string;
  description?: string;
  sections?: number[];
  visible?: boolean;
}

// injection logic
const courseMeta = inject(CourseMeta);
console.log(courseMeta);
// TODO replace with an API call
const allSections = [1, 2, 3];
// form state
const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);
const modelRef = ref<ContentModel>({
  title: "",
  description: "",
  // replace with a fetch request to the api for all sections under the course in current term
  sections: [1, 2],
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
  () => {
    if (props.visible) {
      if (props.mode === "edit") {
        modelRef.value = {
          title: props.targetItem?.title,
          description: props.targetItem?.description,
          // replace with a fetch request to the api for all sections under the course in current term
          sections: [1, 2],
          visible: props.targetItem?.visible,
        };
      } else if (props.mode === "create") {
        modelRef.value = {
          title: "",
          description: "",
          // replace with a fetch request to the api for all sections under the course in current term
          sections: [1, 2],
          visible: false,
        };
      }
    }
  }
);

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
function submitForm() {}

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
