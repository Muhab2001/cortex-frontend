import type { User } from "typings/globals";
import { defineStore } from "pinia";
import { reactive, readonly } from "vue";
import { Role } from "@/enums/roles";

import { AxiosInstance } from "@/axios";

export const useAuth = defineStore("auth", () => {
  const userProfile = reactive<User>({
    username: "",
    fullname: "",
    photoUrl: "",
    // ! should default to a student
    role: Role.STUDENT,
    id: 0,
  });

  // TODO proper fetching for the token

  async function refresh(access_token: string) {
    console.log("REFRESHING");

    const response: {
      firstName: string;
      lastName: string;
      username: string;
      photoUrl: string;
      role: Role;
      id: number;
    } = (
      await AxiosInstance.post(
        "/refresh",
        {},
        {
          headers: {
            Authorization: "Bearer " + access_token,
          },
        }
      )
    ).data;
    console.log("REFRESH RESPONSE", response);

    AxiosInstance.defaults.headers.common = {
      Authentication: `Bearer ${access_token}`,
    };

    userProfile.username = response.username;
    userProfile.photoUrl = "http://localhost:3000/" + response.photoUrl;
    userProfile.role = response.role;
    userProfile.id = response.id;
    userProfile.fullname = response.firstName + " " + response.lastName;
  }

  async function login(username: string, password: string): Promise<void> {
    // fetch the login endpoint
    const response: {
      name: string;
      access_token: string;
      username: string;
      photoUrl: string;
      role: Role;
      id: number;
    } = (
      await AxiosInstance.post("/login", {
        username: username,
        password: password,
      })
    ).data;

    AxiosInstance.defaults.headers.common = {
      Authentication: `Bearer ${response.access_token}`,
    };
    sessionStorage.setItem("accessToken", response.access_token);
    // store the token in localStorage
    // populate the state
    userProfile.username = username;
    userProfile.photoUrl = "http://localhost:3000/" + response.photoUrl;
    userProfile.role = response.role;
    userProfile.id = response.id;
    userProfile.fullname = response.name;
    console.log(userProfile);

    console.log("RESPONSE", response);
  }

  function logout(): void {
    userProfile.username = "";
    userProfile.photoUrl = "";
    userProfile.role = 1;
    userProfile.id = 0;

    // remove the token from axios headers
    AxiosInstance.defaults.headers.common = {
      Authentication: null,
    };
    sessionStorage.removeItem("accessToken");
    console.log("TOKEN", sessionStorage.getItem("accessToken"));
  }

  return readonly({ userProfile, login, logout, refresh });
});
