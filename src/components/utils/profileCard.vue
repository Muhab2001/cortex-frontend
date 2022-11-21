<template>
  <NDropdown :options="profileOptions" @select="handleSelect">
    <span class="t-inline-flex t-flex-row t-p-4 t-items-center t-w-fit">
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
    </span>
  </NDropdown>
</template>
<script setup lang="ts">
import { NAvatar, NDropdown } from "naive-ui";
import { h } from "vue";
import type { Component } from "vue";
import { NIcon } from "naive-ui";
import {
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import router from "@/router";

const renderIcon = (icon: Component, options?: { [key: string]: string }) => {
  return () => {
    return h(NIcon, options, {
      default: () => h(icon),
    });
  };
};

const handleSelect = (key: string) => {
  if (key === "SignOut") {
    router.push("/");
  }
};

const profileOptions = [
  {
    label: "Update Picture",

    key: "editPic",
    icon: renderIcon(UserIcon),
  },
  {
    label: "Sign out",
    key: "SignOut",
    props: {
      style: "color: red",
    },
    icon: renderIcon(LogoutIcon, { color: "red", size: "15px" }),
  },
];

const props = defineProps<{
  username: string;
  role: number;
  photoUrl: string;
}>();
</script>
<style></style>
