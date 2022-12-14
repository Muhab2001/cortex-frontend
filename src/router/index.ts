import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/grade",
      name: "grade",
      component: () => import("@/views/GradeView.vue"),
    },
    {
      path: "/assignment",
      name: "assignment",
      component: () => import("@/views/AssignmentView.vue"),
    },
  ],
});

export default router;
