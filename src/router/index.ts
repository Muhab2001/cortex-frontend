import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
      props: { header: false },
    },
    {
      path: "/home",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      props: { header: true },
    },
    {
      path: "/course/:sectionId",
      name: "course",
      component: () => import("@/views/course/CourseView.vue"),
      props: true,
    },
    {
      path: "/grade/:courseFlag/:sectionId/:assignmentId",
      name: "grade",
      component: () => import("@/views/GradeView.vue"),
      props: true,
    },
    {
      path: "/assignment",
      name: "assignment",
      component: () => import("@/views/AssignmentView.vue"),
    },
    // This is a temporary route for development purposes
    {
      path: "/announcement",
      name: "announcement",
      component: () => import("@/views/AnnouncementView.vue"),
    },
  ],
});

export default router;
