import LoginView from "@/views/LoginView.vue";
import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: LoginView,
      props: { header: false },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      props: { header: true },
    },
    {
      path: "/course",
      name: "course",
      component: () => import("@/views/course/CourseView.vue"),
      props: true,
    },
    {
      path: "/grade",
      name: "grade",
      component: () => import("@/views/GradeView.vue"),
      props: true,
    },
    {
      path: "/assignment",
      name: "assignment",
      component: () => import("@/views/AssignmentView.vue"),
    },
  ],
});

export default router;
