<template>
  <NDropdown :options="profileOptions" @select="handleSelect">
    <span
      class="t-inline-flex t-flex-row t-p-4 t-items-center t-w-fit dark:t-text-white"
    >
      <span>
        <NAvatar
          class="t-flex t-items-center"
          round
          size="small"
          :src="props.photoUrl"
        />
      </span>
      <div>
        <span class="t-mx-3 t-hidden md:t-flex t-font-bold t-text-sm">{{
          props.name
        }}</span>
        <span class="t-mx-3 t-hidden md:t-flex t-font-medium t-text-xs">{{
          props.username
        }}</span>
      </div>
    </span>
  </NDropdown>
</template>
<script setup lang="ts">
import { NAvatar, NDropdown } from "naive-ui";

import {
  PersonCircleOutline as UserIcon,
  LogOutOutline as LogoutIcon,
} from "@vicons/ionicons5";
import router from "@/router";
import { useIcon } from "@/composables/useIcon";
import { useAuth } from "@/stores/auth";
import type { Role } from "@/enums/roles";
const iconUtils = useIcon();
const auth = useAuth();

const handleSelect = (key: string) => {
  if (key === "SignOut") {
    console.log();

    auth.logout();
    router.push("/");
  }
};

const profileOptions = [
  {
    label: "Update Picture",

    key: "editPic",
    icon: iconUtils.renderIcon(UserIcon),
  },
  {
    label: "Sign out",
    key: "SignOut",
    props: {
      style: "color: red",
    },
    icon: iconUtils.renderIcon(LogoutIcon, { color: "red", size: "15px" }),
  },
];

const props = defineProps<{
  name: string;
  username: string;
  role: Role;
  photoUrl: string;
}>();

console.log("PROFILE", props);
</script>
<style></style>
