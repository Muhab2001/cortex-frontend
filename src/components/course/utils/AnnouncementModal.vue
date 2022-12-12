<template>
  <NModal
    :auto-focus="true"
    :on-esc-click="() => $emit('closed')"
    :mask-closable="false"
    :block-scroll="true"
    :trap-focus="true"
    :show="props.visible"
    :title="props.mode == 'edit' ? 'Edit Announcement' : 'Create Announcement'"
    transform-origin="center"
    content-style="padding-bottom: 0px"
    preset="card"
    class="t-w-full md:t-w-[80%] t-max-w-7xl"
    @close="() => $emit('closed')"
    size="large"
    ><template #header>
      <div class="t-font-semibold t-text-lg t-flex t-items-center">
        <NIcon style="margin-left: 0" class="t-mr-2" color="#59C1BD" size="28">
          <Icon>
            <Speaker024Filled></Speaker024Filled>
          </Icon>
        </NIcon>
        <span class="t-font-semibold t-text-xl">{{
          props.mode == "edit" ? "Edit Assignment" : "New Assignment"
        }}</span>
      </div> </template
    ><NDivider class="t-my-0"></NDivider>
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
          ? "Edit Announcement"
          : "Fill the required fields to create a new announcement"
      }}
    </div>
    <NForm class="t-mt-5" :model="modelRef" :rules="rules" ref="formRef">
      <NFormItem label="Subject" path="subject">
        <NInput
          maxlength="30"
          type="text"
          show-count
          v-model:value="modelRef.subject"
        /> </NFormItem
      ><NFormItem class="t-mt-4" label="Content" path="content">
        <NInput
          placeholder="Enter the content of the announcement"
          type="textarea"
          maxlength="200"
          show-count
          path="description"
          v-model:value="modelRef.content"
        ></NInput> </NFormItem
      ><NFormItem
        label="Tag"
        path="tag"
        feedback="The type of the announcement (e.g. Seating plan, Informative, Alert)"
      >
        <NInput
          maxlength="30"
          type="text"
          show-count
          v-model:value="modelRef.tag"
        />
      </NFormItem>
      <section v-if="props.mode === 'create'">
        <h2 class="t-font-semibold t-mb-0 t-mt-3">Announcement Availability</h2>
        <p class="t-mb-2">Choose targeted sections</p>
        <NFormItem
          v-if="props.mode === 'create'"
          class="t-mt-4"
          :label-style="{
            fontWeight: 'bold',
          }"
          label="Sections"
          path="sectionIds"
        >
          <NCheckboxGroup v-model:value="modelRef.sectionIds">
            <NCheckbox
              v-for="section in courseSections"
              :key="section.id"
              :label="section.section_number.toString()"
              :value="section.id"
            ></NCheckbox>
          </NCheckboxGroup>
        </NFormItem>
      </section>
    </NForm>
    <NDivider class="t-mt-4" />
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
    </template></NModal
  >
</template>
<script setup lang="ts">
import { AxiosInstance } from "@/axios";
import { CourseMeta } from "@/injection_keys/courseView.keys";
import { Speaker024Filled } from "@vicons/fluent";
import {
  NIcon,
  NModal,
  NButton,
  NForm,
  NFormItem,
  NCheckbox,
  NInput,
  type FormInst,
  type FormItemRule,
  type FormRules,
  NDivider,
  NCheckboxGroup,
  NEllipsis,
  type FormValidationError,
  useMessage,
  useLoadingBar,
} from "naive-ui";
import { ref, inject, watch, type Ref, computed } from "vue";

interface AnnouncementModel {
  subject: string;
  content: string;
  tag: string;
  sectionIds: number[];
  id?: number;
}

// editing an announcement should not update target sections
interface AnnouncementItem {
  subject: string;
  content: string;
  tag: string;

  id: number;
}

interface AnnouncementModalProps {
  visible: boolean;
  mode: "edit" | "create";
  targetItem?: AnnouncementItem;
}

const modelRef = ref<AnnouncementModel>({
  subject: "",
  content: "",
  tag: "",
  sectionIds: [],
});

const props = defineProps<AnnouncementModalProps>();
const emits = defineEmits<{
  (e: "closed"): void;
}>();

const formRef = ref<FormInst | null>(null);
const courseInfo = inject(CourseMeta);
const messenger = useMessage();
const loading = useLoadingBar();

// TODO: replace with an api call
const courseSections = ref<{ id: number; section_number: number }[]>([]);

const rules: Ref<FormRules> = computed(() => ({
  subject: {
    required: true,
    type: "string",
    message: "Subject must not be empty",
    trigger: ["blur"],
  },
  content: {
    required: true,
    type: "string",
    message: "Conent must not be empty",
    trigger: ["blur"],
  },
  tag: {
    required: true,
    type: "string",
    message: "Tag must not be empty",
    trigger: ["blur"],
  },
  sectionIds: {
    required: props.mode === "create",
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
}));

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
        modelRef.value = {
          subject: props.targetItem!.subject,
          content: props.targetItem!.content,
          // replace with a fetch request to the api for all sections targeted by the announcement
          sectionIds: await AxiosInstance.get(
            "/course/sections/announcement/" + props.targetItem!.id
          ),
          tag: props.targetItem!.tag,
        };
      } else if (props.mode === "create") {
        modelRef.value = {
          subject: "",
          content: "",
          // replace with a fetch request to the api for all sections under the course in current term
          sectionIds: [],
          tag: "",
        };
      }
    }
  }
);

const submitForm = () => {
  console.log("Submitted");

  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        // if no section is selected
        if (props.mode === "create") {
          await AxiosInstance.post("announcements", {
            sectionIds: modelRef.value.sectionIds,
            subject: modelRef.value.subject,
            course: courseInfo?.value.courseId,
            content: modelRef.value.content,
            tag: modelRef.value.tag,
          });
          messenger.success("Announcement Created Successfully");
        } else if (props.mode === "edit") {
          await AxiosInstance.patch("announcements/" + props.targetItem!.id, {
            subject: modelRef.value.subject,
            content: modelRef.value.content,
            tag: modelRef.value.tag,
            courseId: courseInfo?.value.courseId,
          });
          messenger.success("Announcemend Updated successfully");
        }

        loading.finish();
        emits("closed");

        // router.push("/home");
        // console.log(
        //   await axios.post("/login", {
        //     username: model.value.username,
        //     password: model.value.password,
        //   })
        // );
      } else {
        console.log(errors);
        messenger.error("Submission Failed!");
        loading.error();
      }
    }
  );
};
</script>
<style></style>
