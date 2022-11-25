<template>
  <NModal @close="$emit('closed')" :show="props.visible">
    <template #header>
      <div>
        <span
          ><NIcon
            ><Icon
              ><ContentView20Filled></ContentView20Filled></Icon></NIcon></span
        ><span>Create Content Items</span>
      </div>
    </template>
    <NForm :model="modelRef" :rules="rules" ref="formRef">
      <NFormItem label="Title" path="title"> <NInput type="text" /> </NFormItem
      ><NFormItem label="Description" path="description">
        <NInput type="textarea" path="description"></NInput>
      </NFormItem>
      <NFormItem label="Attachements" path="attachements">
        <NUpload
          multiple
          :default-upload="false"
          :custom-request="requestHandler"
        ></NUpload>
      </NFormItem>
      <NButton @click="submitForm"></NButton>
    </NForm>
  </NModal>
</template>
<script setup lang="ts">
import { ContentView20Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import {
  NButton,
  NForm,
  NFormItem,
  NIcon,
  NInput,
  NUpload,
  type FormInst,
  type FormItemRule,
  type FormRules,
  type NModal,
  type UploadCustomRequestOptions,
  type UploadInst,
} from "naive-ui";
import { ref } from "vue";

interface ContentModalProps {
  courseID: string;
  term: string;
  visible: boolean;
}

interface ContentModel {
  title?: string;
  description?: string;
  sections?: number[];
}

const props = defineProps<ContentModalProps>();
const emits = defineEmits<{
  (e: "closed"): void;
}>();

// form state
const formRef = ref<FormInst | null>(null);
const uploadRef = ref<UploadInst | null>(null);
const modelRef = ref<ContentModel>({
  title: "",
  description: "",
  // replace with a fetch request to the api for all sections under the course in current term
  sections: [1, 2],
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
<style></style>
