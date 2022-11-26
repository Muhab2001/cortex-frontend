import type { InjectionKey } from "vue";

export const CourseMeta = Symbol() as InjectionKey<{
  term: string;
  courseId: string;
  courseName: string;
  sectionNo: number | string;
}>;
