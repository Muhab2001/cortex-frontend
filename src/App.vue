<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import { NConfigProvider, NMessageProvider, NDialogProvider } from "naive-ui";
import ProfileCard from "./components/utils/profileCard.vue";
import { useAuth } from "./stores/auth";
import BreadcrumbWrapper from "./components/utils/breadcrumbWrapper.vue";

const props = defineProps<{ header: boolean }>();

const auth = useAuth();
console.log(auth.userProfile);

const route = useRoute();
</script>

<template>
  <div class="t-px-3 t-py-4 md:t-px-4 md:t-py-8">
    <NConfigProvider style="width: 100%; height: 100vh; margin: 0">
      <NMessageProvider style="width: 100vw; height: 100vh">
        <NDialogProvider>
          <header
            v-if="route.name !== 'login'"
            class="t-items-start t-flex t-flex-col"
          >
            <!-- header title -->
            <div
              class="t-w-full t-flex-row t-flex t-justify-between t-items-center"
            >
              <span class="t-inline-flex t-mb-3 t-w-fit t-ml-1">
                <!-- the cortex logo -->
                <img
                  class="t-w-10 t-mr-4"
                  src="@/assets/logo_only_pure.svg"
                  alt=""
                />
                <h2 class="t-text-slate-700 t-font-bold">Cortex</h2>
              </span>

              <ProfileCard
                :username="auth.userProfile.username"
                :role="auth.userProfile.role"
                :photo-url="auth.userProfile.photoUrl"
              />
            </div>
            <!-- TODO: replace with a breadcrump -->
            <BreadcrumbWrapper />
          </header>
          <RouterView />
        </NDialogProvider>
      </NMessageProvider>
    </NConfigProvider>
  </div>
</template>
