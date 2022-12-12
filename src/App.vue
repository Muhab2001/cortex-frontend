<script setup lang="ts">
import { RouterView, useRoute, useRouter } from "vue-router";
import {
  NConfigProvider,
  NMessageProvider,
  NDialogProvider,
  NLoadingBarProvider,
  darkTheme,
  NButton,
  NIcon,
} from "naive-ui";
import ProfileCard from "./components/utils/profileCard.vue";
import { useAuth } from "./stores/auth";
import BreadcrumbWrapper from "./components/utils/breadcrumbWrapper.vue";
import { onBeforeMount, watchEffect } from "vue";

import { WbSunnyFilled } from "@vicons/material";
import { Moon } from "@vicons/ionicons5";
import { useThemeConfig, Theme } from "./stores/theme";

const props = defineProps<{ header: boolean }>();

const auth = useAuth();
const router = useRouter();
const themeConfig = useThemeConfig();

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

document
  .querySelector("html")
  ?.classList.add(
    "t-transition",
    "t-duration-300",
    "t-ease-in-out",
    "t-scroll-smooth"
  );

watchEffect(() => {
  if (themeConfig.theme.value == Theme.DARK) {
    document.querySelector("html")?.classList.add("t-dark");
  } else {
    document.querySelector("html")?.classList.remove("t-dark");
  }
});

const route = useRoute();
</script>

<template>
  <NConfigProvider
    :theme="themeConfig.theme.value == Theme.DARK ? darkTheme : null"
    style="width: 100%; margin: 0; height: 100%; min-height: 100vh"
    abstract
  >
    <div class="t-w-full t-h-[100vh] dark:t-bg-[#121212] t-overflow-x-hidden">
      <header
        v-if="route.name !== 'login'"
        class="t-items-start t-flex t-flex-col t-w-full"
      >
        <!-- header title -->
        <div
          class="t-w-full t-flex-row t-flex t-justify-between t-items-center t-shadow-md t-pt-2 md:t-pt-4 t-px-4"
        >
          <span class="t-inline-flex t-w-fit t-ml-1">
            <!-- the cortex logo -->
            <img
              class="t-w-10 t-mr-4"
              src="@/assets/logo_only_pure.svg"
              alt=""
            />
            <h2
              class="t-text-slate-700 t-font-bold t-hidden sm:t-inline-flex dark:t-text-white"
            >
              Cortex
            </h2>
          </span>
          <span class="t-inline-flex t-items-center">
            <NButton
              @click="themeConfig.switchTheme"
              circle
              type="default"
              secondary
              strong
            >
              <template #icon
                ><NIcon
                  :color="
                    themeConfig.theme.value == Theme.DARK ? '#F49D1A' : 'grey'
                  "
                  :component="
                    themeConfig.theme.value == Theme.DARK ? WbSunnyFilled : Moon
                  "
              /></template>
            </NButton>
            <ProfileCard
              :name="auth.userProfile.fullname"
              :username="auth.userProfile.username"
              :role="auth.userProfile.role"
              :photo-url="auth.userProfile.photoUrl"
            />
          </span>
        </div>
        <!-- TODO: replace with a breadcrump -->
        <BreadcrumbWrapper class="t-px-4 t-pt-4" />
      </header>
      <div class="t-px-3 t-py-2 md:t-px-4 md:t-py-8">
        <NMessageProvider style="width: 100vw; height: 100%">
          <NLoadingBarProvider>
            <NDialogProvider>
              <RouterView />
            </NDialogProvider>
          </NLoadingBarProvider>
        </NMessageProvider>
      </div>
    </div>
  </NConfigProvider>
</template>
