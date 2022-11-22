<template lang="">
  <div>
    <header>
      <!-- TODO insert the tab icon -->
      <span><Icon></Icon></span><span>Course Content</span>
    </header>
    <section>
      <!-- the list of all items fetched from the api -->
    </section>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import type { ContentItem, SectionTabProps } from "typings/sectionViewTabs";

const props = defineProps<SectionTabProps>();
// TODO initialize according to given params
const items = ref<ContentItem[]>([]);
</script>
<style lang=""></style>
