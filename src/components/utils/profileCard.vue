<template>
  <div class="t-flex t-flex-row t-p-4 t-items-center">
    <span>
      <NAvatar
        class="t-flex t-items-center"
        round
        size="small"
        :src="props.photoUrl"
      />
    </span>
    <span class="t-mx-3 t-hidden md:t-flex t-font-bold">{{
      props.username
    }}</span>
  </div>
</template>
<script setup lang="ts">
import { NAvatar } from "naive-ui";

const props = defineProps<{
  username: string;
  role: number;
  photoUrl: string;
}>();
</script>
<style></style>
