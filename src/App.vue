<script setup lang="ts">
import { RouterView } from "vue-router";
import { NConfigProvider, NMessageProvider } from "naive-ui";
import { useTheme } from "./stores/theme";

const theme = useTheme();
</script>

<template>
  <NConfigProvider
    style="width: 100%; height: 100vh; margin: 0"
    :theme="theme.getTheme()"
  >
    <NMessageProvider style="width: 100vw; height: 100vh">
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
