<script setup lang="ts">
import { RouterView } from "vue-router";
import { NConfigProvider, NMessageProvider } from "naive-ui";



</script>

<template>
  <NConfigProvider
    style="width: 100%; height: 100vh; margin: 0"
   
  >
    <NMessageProvider style="width: 100vw; height: 100vh">
      <RouterView />
    </NMessageProvider>
  </NConfigProvider>
</template>
