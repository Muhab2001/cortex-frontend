<script setup lang="ts">
import { RouterView } from "vue-router";
import { NMessageProvider } from "naive-ui";
</script>

<template>
  <NMessageProvider style="width: 100vw; height: 100vh">
    <RouterView />
  </NMessageProvider>
</template>
