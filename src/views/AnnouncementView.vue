<script setup lang="ts">
import axios from "axios";
import {
  type FormValidationError,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NCheckboxGroup,
  NCheckbox,
  NSpace,
  useMessage,
  type FormInst,
  type FormRules,
} from "naive-ui";
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// UI framwork logic
const formRef = ref<FormInst | null>(null);
const messenger = useMessage();
// router
const router = useRouter();

// interfaces
interface Section {
  // database id
  sectionId: number,
  // actual section number to be displayed to the user
  sectionNumber: number,
}

interface Course {
  courseId: string,
  sections: Section[],
}

interface AnnouncementModel {
  subject: string;
  content: string;
  tag: string;
  courses: Course[];
}

// state
const model = ref<AnnouncementModel>({
  subject: "",
  content: "",
  tag: "",
  courses: [
    {
      courseId: "ICS110",
      sections:[
        {sectionId: 1,
        sectionNumber: 1},
        {sectionId: 2,
        sectionNumber: 2}
      ]
    },
    {
      courseId: "ICS210",
      sections:[
        {sectionId:3,
        sectionNumber: 1},
        {sectionId:4,
        sectionNumber: 2},
      ]
    }
  ],
});

const courseIds = computed<string[]>(() => model.value.courses.map((e) => e.courseId));

const selectedSectionIds = ref<number[]>([]);

const rules: FormRules = {
  subject: {
    required: true,
    message: "Subject must not be empty",
    trigger: ["blur"],
  },
};

// handlers
const selectSection = () => {

}

const submitForm = () => {
  console.log("HELLOOO!!");

  // formRef.value?.validate(
  //   async (errors: Array<FormValidationError> | undefined) => {
  //     if (!errors) {
  //       try {
  //         router.push("/home");
  //         console.log(
  //           await axios.post("/login", {
  //             username: model.value.username,
  //             password: model.value.password,
  //           })
  //         );
  //         messenger.success("Successful sign in!");
  //       } catch (e: any) {
  //         messenger.error("Login Failed!");
  //       }
  //     } else {
  //       console.log(errors);
  //       messenger.error("Login Failed!");
  //     }
  //   }
  // );
};
</script>

<template>
  <main
    class="t-w-[100vw] t-flex t-flex-col t-items-center t-justify-center t-h-full"
  >
    <section>
      <header class="t-flex-col t-items-center t-text-center">
        <h1 class="t-font-sans t-font-bold t-m-auto t-text-[4rem]">Create New Announcment</h1>
      </header>
      <NForm
        class="t-w-[90vw] md:t-w-72 lg:t-w-80"
        ref="formRef"
        label-placement="top"
        :label-width="80"
        :model="model"
        :rules="rules"
      >
        <NFormItem path="subject" label="Subject">
          <NInput
            type="text"
            placeholder="Enter a subject"
            v-model:value="model.subject"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem path="content" label="Content">
          <NInput
            v-model:value="model.content"
            placeholder="Enter the content of the announcment"
            type="textarea"
            @keydown.enter.prevent
            :autosize="{
              minRows: 3
            }"
          />
        </NFormItem>
        <NFormItem path="tag" label="Tag">
          <NInput
            type="text"
            v-model:value="model.tag"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem label="Courses">
          <!-- all courses checkbox group -->
          <NCheckboxGroup v-model:value="selectedSectionIds" @update:value="selectSection">
            <NSpace vertical size="medium">
              <div v-for="course in model.courses" :key="course.courseId">
                <!-- course checkbox -->
                <NCheckbox :label="course.courseId" />
                <NSpace vertical size="small">
                  <!-- course sections checkboxs -->
                  <NCheckbox
                    v-for="section in course.sections"
                    :key="section.sectionId"
                    :value="section.sectionId"
                    :label="'Section ' + section.sectionNumber"
                    class="t-ml-6"
          
                  />
                </NSpace>
              </div>
            </NSpace>
          </NCheckboxGroup>
        </NFormItem>
        <NButton
          @click="submitForm"
          class="t-w-full hover:t-bg-green-500 hover:t-text-white t-mt-10"
          >Submit</NButton
        >
      </NForm>
    </section>
  </main>
</template>

<style></style>