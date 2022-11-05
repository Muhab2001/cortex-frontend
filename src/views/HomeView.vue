<script setup lang="ts">
import ProfileCard from "@/components/utils/profileCard.vue";
</script>

<template>
  <div class="t-p-3 md:t-p-10">
    <header class="t-flex t-items-center t-justify-between">
      <!-- header title -->
      <div>
        <div>
          <!-- the cortex logo -->
          <h1 class="t-font-black">Cortex</h1>
        </div>
        <!-- TODO: replace with a breadcrump -->
        <h4 class="t-font-black">Home</h4>
      </div>
      <ProfileCard
        username="muhab"
        :role="0"
        photo-url="https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg"
      />
    </header>
    <main>
      <!-- header, user info,  -->

      <!-- section cards -->
      <section></section>
      <!-- announcements and deadline -->
      <aside>
        <section></section>
        <section></section>
      </aside>
    </main>
  </div>
</template>
