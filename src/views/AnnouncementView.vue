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
import { ref, computed, reactive } from "vue";
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
  selected: boolean,
}

interface Course {
  // e.g. ICS104
  courseId: string,
  sections: Section[],
  selected: boolean
}

interface AnnouncementModel {
  subject: string;
  content: string;
  tag: string;
}

// state
const model = ref<AnnouncementModel>({
  subject: "",
  content: "",
  tag: "",
});

// The variable containing the info that should be gotten from the database
const courses = reactive<Course[]>([
    {
      courseId: "ICS110",
      sections:[
        {sectionId: 1,
        sectionNumber: 1,
        selected: false},
        {sectionId: 2,
        sectionNumber: 2,
        selected: false}
      ],
      selected: false,
    },
    {
      courseId: "ICS210",
      sections:[
        {sectionId:3,
        sectionNumber: 1,
        selected: false},
        {sectionId:4,
        sectionNumber: 2,
        selected: false},
      ],
      selected: false,
    }
  ],)

const selectedSectionIds = computed<(string | number)[]>(()=> {
  let result: number[] = [];
  courses.forEach((course) => {
    result = result.concat(course.sections.filter((section) => section.selected).map((section) => section.sectionId));
  });
  return result;
})


const rules: FormRules = {
  subject: {
    required: true,
    message: "Subject must not be empty",
    trigger: ["blur"],
  },
};

// handlers
const selectSectionsByArray = (newSectionIds: (string | number)[]): void => {
  courses.forEach((course) => {
    // checking and unchecking of section checkboxs of this iteration's course
    course.sections.forEach((section) => {
        section.selected = newSectionIds.includes(section.sectionId);
    });

    // unchecking of the course checkbox if needed
    if (!course.sections.every((section) => section.selected)) {
      course.selected = false;
    }
  });
} 

const selectSectionsByCourse = (checkedCourse: Course): void => {
  courses.forEach((course) => {
    if (checkedCourse.courseId == course.courseId) {
      course.selected = !course.selected;
      course.sections.map((e)=> e.selected = course.selected);
      return;
    }
  })
}

const submitForm = () => {
  console.log("Submitted");

  formRef.value?.validate(
    async (errors: Array<FormValidationError> | undefined) => {
      if (!errors) {
        // if no section is selected
        if (selectedSectionIds.value.length == 0) {
        messenger.error("Must select at least one section")
        return;
        }
        messenger.success("Submission Successful");
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
      }
    }
  );
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
            placeholder="Enter the tag"
            v-model:value="model.tag"
            @keydown.enter.prevent
          />
        </NFormItem>
        <NFormItem label="Courses">
          <NSpace vertical size="medium">
            <div v-for="course in courses" :key="course.courseId">
              <!-- course checkbox -->
              <NCheckbox :label="course.courseId" :checked="course.selected" @update:checked="selectSectionsByCourse(course)"/>
              <!-- course sections checkboxs -->
              <NCheckboxGroup :value="selectedSectionIds" @update:value="selectSectionsByArray">
                <NSpace vertical size="small">
                  <NCheckbox
                    v-for="section in course.sections"
                    :key="section.sectionId"
                    :value="section.sectionId"
                    :label="'Section ' + section.sectionNumber"
                    class="t-ml-6"
                  />
                </NSpace>
              </NCheckboxGroup>
            </div>
          </NSpace>
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