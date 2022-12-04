import type { InjectionKey, Ref } from "vue";

export const CourseMeta = Symbol() as InjectionKey<
  Ref<{
    term: string;
    courseId: string;
    courseName: string;
    sectionNo: number | string;
  }>
>;
