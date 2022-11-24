<script setup lang="ts">
import SectionCard from "@/components/home/sectionCard.vue";
import ProfileCard from "@/components/utils/profileCard.vue";
import { NBreadcrumb, NBreadcrumbItem } from "naive-ui";
</script>

<template>
  <div class="t-px-3 md:t-px-8 md:t-py-5">
    <header class="t-flex t-items-center t-justify-between">
      <!-- header title -->
      <div>
        <div class="t-flex t-mb-3">
          <!-- the cortex logo -->
          <img class="t-w-10 t-mr-4" src="@/assets/logo_only_pure.svg" alt="Cortex" />
          <h2 class="t-text-slate-600">Cortex</h2>
        </div>
        <!-- TODO: replace with a breadcrump -->
      </div>
      <ProfileCard
        username="Muhab Abubaker"
        :role="0"
        photo-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
      />
    </header>
    <main>
      <!-- header, user info,  -->
      <NBreadcrumb class="t-mb-3">
        <NBreadcrumbItem href="/">
          <span class="t-font-semibold">Home</span>
        </NBreadcrumbItem>
      </NBreadcrumb>
      <!-- section cards -->
      <div class="md:t-flex">
        <section class="md:t-w-[66vw] md:t-mr-3">
          <div class="t-flex t-mb-3 t-items-center">
            <span
              class="t-bg-blue-200 t-p-2 t-inline-flex t-items-center t-rounded-md t-h-full t-mr-2"
              ><v-icon fill="rgb(37 99 235)" name="fa-chalkboard-teacher"
            /></span>
            <h3
              class="t-font-bold t-text-slate-700 t-inline t-h-full t-align-middle"
            >
              My Courses
            </h3>
          </div>
          <div class="md:t-columns-2">
            <SectionCard
              course-id="ICS321"
              course-name="Introduction to Database Systems"
              cover-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
              :section-num="5"
              instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
            />
            <SectionCard
              course-id="SWE363"
              course-name="Web Engineering & Development"
              cover-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
              :section-num="5"
              instructor-img-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
            />
          </div>
        </section>
        <!-- announcements and deadline -->

        <aside class="md:t-w-[33vw] t-w-100vw">
          <section>
            <div class="t-flex t-mb-3 t-items-center">
              <span
                class="t-bg-green-200 t-p-2 t-inline-flex t-items-center t-rounded-md t-h-full t-mr-2"
                ><v-icon fill="rgb(21 128 61)" name="hi-solid-speakerphone"
              /></span>
              <h3
                class="t-font-bold t-text-slate-700 t-inline t-h-full t-align-middle"
              >
                Announcements
              </h3>
            </div>
            <div class="md:t-columns-1"></div>
          </section>
          <section>
            <div class="t-flex t-mb-3 t-items-center">
              <span
                class="t-bg-red-200 t-p-2 t-inline-flex t-items-center t-rounded-md t-h-full t-mr-2"
                ><v-icon fill=" rgb(185 28 28)" name="md-timer"
              /></span>
              <h3
                class="t-font-bold t-text-slate-700 t-inline t-h-full t-align-middle"
              >
                Deadlines
              </h3>
            </div>
            <div class="md:t-columns-1"></div>
          </section>
        </aside>
      </div>
    </main>
  </div>
</template>
