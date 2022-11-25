<!-- ! This is an async component -->
<!-- ! requires parametrized router push -->
<script setup lang="ts">
import GradeRecord from "@/components/grade/gradeRecord.vue";
import { NButton, type NButtonGroup } from "naive-ui";
import { reactive } from "vue";
import { useRouter } from "vue-router";

interface GradePageProps {
  assignmentId: number;
}

interface GradeRecordProps {
  score?: number;
  studentName: string;
  studentId: string; //! This is not the student id stored in the db
}

interface GradeInput {
  title: string;
  description?: string;
  courseName: string;
  sectionNo: number;
  fullScore: number;
  records: GradeRecordProps[];
}

const props = defineProps<GradePageProps>();
const router = useRouter();

// TODO: fetch all the grades for the assignment id requested

const grade = reactive<GradeInput>({
  title: "mock title",
  description: " Mock description",
  courseName: "ICS321",
  sectionNo: 5,
  fullScore: 20,
  records: [
    {
      studentId: "20195570",
      studentName: "Muhab abubaker",
      score: 20,
    },
  ],
});

function saveGrades() {
  // TODO submission logic from the API
  // ! parametrize the routing
  router.push("/course");
}

// TODO emitting messages from children components to parent
</script>

<template>
  <main>
    <header>
      <div id="assignment-title">{{ grade.title }}</div>
      <div v-if="grade.description">{{ grade.description }}</div>
      <div id="section-meta">
        <span>{{ grade.courseName }}</span
        ><span>{{ grade.sectionNo }}</span>
      </div>
    </header>
    <section>
      <GradeRecord
        v-for="record in grade.records"
        :key="record.studentId"
        :max-score="grade.fullScore"
        :score="record.score"
        :student-id="record.studentId"
        :student-name="record.studentName"
      >
      </GradeRecord>
    </section>
    <section id="button row">
      <NButtonGroup>
        <NButton @click="saveGrades">Save Changes</NButton>
        <!-- ! parametrize the routing -->
        <NButton @click="router.push('/course')">Cancel Changes</NButton>
      </NButtonGroup>
    </section>
  </main>
</template>

<style></style>
