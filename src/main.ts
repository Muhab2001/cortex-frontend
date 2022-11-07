import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";
import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  FaChalkboardTeacher,
  HiSolidSpeakerphone,
  MdTimer,
} from "oh-vue-icons/icons";

addIcons(FaChalkboardTeacher, HiSolidSpeakerphone, MdTimer);

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

axios.defaults.baseURL = "http://localhost:3000/";
const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.use(createPinia());
app.use(router);

app.mount("#app");
