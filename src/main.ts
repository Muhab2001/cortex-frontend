import { createApp } from "vue";
import { createPinia } from "pinia";
import axios from "axios";

import App from "./App.vue";
import router from "./router";

import "./assets/main.css";

axios.defaults.baseURL = "http://localhost:3000/";
const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
