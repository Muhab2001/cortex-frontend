import type { User } from "typings/globals";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const useAuth = defineStore("auth", () => {
  const userProfile = reactive<User>({
    username: "",
    photoUrl: "",
    role: 0,
  });
});
