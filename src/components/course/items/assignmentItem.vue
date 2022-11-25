<script setup lang="ts">
import { Delete24Filled, Edit16Filled } from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NButton, NTag } from "naive-ui";
import { ref } from "vue";

interface AssignmentItemProps {
  id: number;
  title: string;
  description?: string;
  lastUpdated: string;
  editable: boolean;
  deadline: string;
  maxPoints: number;
}

const props = defineProps<AssignmentItemProps>();

// TODO: supply functions that trigger deletion or editing of content files

function deleteItem() {
  // TODO: confirmation modal, then delete on confrimation
}

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
    <span v-else>
      {{ props.maxPoints }}
    </span>
  </div>
</template>

<style></style>
