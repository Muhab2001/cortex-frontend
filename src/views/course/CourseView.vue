<template lang="">
  <!-- include an outer framework -->
  <!-- conditional rendering for the slot according to user role -->
  <div>
    <main>
      <!-- left-side menu -->
      <aside class="t-columns-1 t-w-full md:t-w-[30%]">
        <!-- section card -->
        <SectionCard></SectionCard>
        <!-- options menu -->
        <section></section>
        <!-- section-specific -->
        <section></section>
      </aside>
      <!-- main items -->
      <section class="t-columns-1 t-w-full md:t-w-[70%]">
        <!-- condiitonal rendering for slots (according to user role) -->
        <template name="instructor-pane">
          <InsrtuctorSlot />
        </template>
        <template name="student-pane">
          <div>
            <StudentSlot />
          </div>
        </template>
      </section>
    </main>
  </div>
</template>
<script setup lang="ts">
import SectionCard from "@/components/home/sectionCard.vue";
interface CoruseProps {
  courseName: string;
  courseID: string;
  sectionNum: string | number;
  sectionId: number;
}

const props = defineProps<CoruseProps>();
</script>
<style lang=""></style>
