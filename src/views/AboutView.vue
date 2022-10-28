<script setup lang="ts">
import { NButton } from "naive-ui";
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
    <NButton type="error">primary</NButton>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
