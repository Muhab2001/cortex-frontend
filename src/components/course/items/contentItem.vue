<script setup lang="ts">
import { Delete24Filled, Edit16Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NButton, NTag } from "naive-ui";
import type { ContentItemProps, Editable } from "typings/CourseViewTabs";
import { h, type Component, ref } from "vue";

const props = defineProps<Editable<ContentItemProps>>();

const itemFiles = ref<string[]>();

const renderedIcon = (icon: Component) => h(Icon, h(icon));

// TODO: supply functions that trigger deletion or editing of content files

function deleteItem() {}

function updateFiles() {
  // TODO: open a popup to edit the files
}

function deleteFile() {}
</script>

<template>
  <div>
    <div name="text-content">
      <span name="item-meta-container">
        <span name="item-title">{{ props.title }}</span>
        <span v-if="props.description" name="item-description">{{
          props.description
        }}</span>
        <span>{{ props.lastUpdated }}</span>
      </span>
      <span v-if="props.editable" name="editing-bar">
        <NButton @click="deleteItem" strong secondary circle type="error"
          ><Icon>
            <Delete24Filled></Delete24Filled>
          </Icon>
        </NButton>
        <NButton @click="updateFiles" strong secondary circle type="info">
          <Icon>
            <Edit16Filled></Edit16Filled>
          </Icon>
        </NButton>
      </span>
    </div>
    <!-- TODO: list all the files using tag elements -->
    <div name="file-contents">
      <NTag
        :closable="props.editable"
        v-for="fileURL in itemFiles"
        :key="fileURL"
      >
        <a :href="fileURL" download>{{ fileURL.replace(/.*\//g, "") }}</a></NTag
      >
    </div>
  </div>
</template>

<style></style>
