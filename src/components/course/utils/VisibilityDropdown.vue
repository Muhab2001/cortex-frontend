<template>
  <NDropdown trigger="click" :options="visibilityOptions" @select="handleSelect"
    ><NButton
      strong
      secondary
      circle
      :type="props.visible ? 'primary' : 'tertiary'"
    >
      <NTooltip trigger="hover">
        <template #trigger>
          <NIcon v-if="props.visible" size="18">
            <Icon>
              <Eye20Filled></Eye20Filled>
            </Icon>
          </NIcon>

          <NIcon v-else size="18"
            ><Icon><EyeOff16Filled></EyeOff16Filled></Icon
          ></NIcon>
        </template>
        {{
          props.visible
            ? "Item is visible for this section"
            : "Item is hidden for this section"
        }}</NTooltip
      ></NButton
    ></NDropdown
  >
</template>
<script setup lang="ts">
import { useIcon } from "@/composables/useIcon";
import {
  Eye20Filled,
  EyeOff16Filled,
  PeopleCommunity24Filled,
  Person12Filled,
} from "@vicons/fluent";
import { Icon } from "@vicons/utils";
import { NDropdown, NButton, NIcon, NTooltip } from "naive-ui";
import { computed } from "vue";

interface VisibilityDropdownProps {
  visible: boolean;
}

type DropdownKeys = "singleToggle" | "singleToggle";

const props = defineProps<VisibilityDropdownProps>();
// each button delegates the action to the parent item
const emits = defineEmits<{
  (e: "singleToggle"): void;
  (e: "groupToggle"): void;
}>();

const iconUtils = useIcon();

const visibilityOptions = computed(() => [
  {
    label: `${props.visible ? "Hide" : "Unhide"} for this section`,
    key: "singleToggle",
    icon: iconUtils.renderIcon(Person12Filled),
  },
  {
    label: `${props.visible ? "Hide" : "Unhide"} for all sections`,
    key: "groupToggle",
    icon: iconUtils.renderIcon(PeopleCommunity24Filled),
  },
]);

const handleSelect = (key: DropdownKeys) => {
  emits(key);
};
</script>
<style></style>
