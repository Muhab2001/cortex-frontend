<script setup lang="ts">
import { Delete24Filled, Edit16Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NButton, NTag } from "naive-ui";
import type { AnnouncementItem, Editable } from "typings/sectionViewTabs";
import { h, type Component, ref } from "vue";

const props = defineProps<Editable<AnnouncementItem>>();

// TODO: supply functions that trigger deletion or editing of content files

function deleteItem() {}

function updateItem() {
  // TODO: open a popup to edit the files
}
</script>

<template>
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
      <NButton @click="updateItem" strong secondary circle type="info">
        <Icon>
          <Edit16Filled></Edit16Filled>
        </Icon>
      </NButton>
    </span>
  </div>
</template>

<style></style>
