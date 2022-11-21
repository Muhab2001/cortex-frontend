import type { User } from "typings/globals";
import { defineStore } from "pinia";
import { reactive, readonly } from "vue";

export const useAuth = defineStore("auth", () => {
  const userProfile = reactive<User>({
    username: "",
    photoUrl: "",
    role: 1,
  });

  // TODO proper fetching for the token
  // ! called automatically if the access token is present
  function signIn(username: string, password: string): void {
    // fetch the login endpoint
    // store the token in localStorage
    // populate the state
    userProfile.username = username;
    userProfile.photoUrl =
      "https://cdn.pixabay.com/photo/2022/04/20/06/28/flowers-7144466__340.jpg";
    userProfile.role = 2;

    console.log(userProfile);
  }

  function logout(): void {
    userProfile.username = "";
    userProfile.photoUrl = "";
    userProfile.role = 1;
  }

  return readonly({ userProfile, signIn, logout });
});
