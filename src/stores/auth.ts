import type { User } from "typings/globals";
import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

export const useAuth = defineStore("auth", () => {
  const userProfile = reactive<User>({
    username: "",
    photoUrl: "",
    role: 0,
  });

  function signIn(username: string, password: string): void {
    // fetch the login endpoint
    // store the token in localStorage
    // populate the state
  }

  function logout(): void {
    userProfile.username = "";
    userProfile.photoUrl = "";
    userProfile.role = 0;
  }

  return readonly({ userProfile, signIn, logout });
});
