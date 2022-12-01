<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import { NConfigProvider, NMessageProvider, NDialogProvider } from "naive-ui";
import ProfileCard from "./components/utils/profileCard.vue";
import { useAuth } from "./stores/auth";
import BreadcrumbWrapper from "./components/utils/breadcrumbWrapper.vue";
import { onBeforeMount } from "vue";
const props = defineProps<{ header: boolean }>();

const auth = useAuth();
const router = useRouter();

onBeforeMount(() => {
  router.beforeEach(async (to, from, next) => {
    if (to.name !== "login" && auth.userProfile.username === "") {
      if (sessionStorage.getItem("accessToken")) {
        try {
          await auth.refresh(sessionStorage.getItem("accessToken")!);
          next();
        } catch (e) {
          next({ name: "login" });
        }
      } else {
        next();
      }
    } else {
      next();
    }
  });
});

const route = useRoute();
</script>

<template>
  <div class="t-px-3 t-py-2 md:t-px-4 md:t-py-8 t-min-h-[100vh]">
    <NConfigProvider
      style="width: 100%; margin: 0; height: 100%; min-height: 100vh"
    >
      <NMessageProvider style="width: 100vw; height: 100%">
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
                :name="auth.userProfile.fullname"
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
