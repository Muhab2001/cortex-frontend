import type { Component } from "vue";
import type { Role } from "./globals";

export type SectionTab =
  | "Course Content"
  | "Grades"
  | "Assignments"
  | "Attendance"
  | "Announcements";

export interface SectionTabProps {
  sectionId: number;
  role: Role;
  tab: SectionTab;
}



interface baseItemProps {
  id: number;
  title: string;
  description?: string;
  lastUpdated: string;
}

export interface ContentItemProps extends baseItemProps {
  fileUrls: string[];
}

export interface GradeItem extends baseItemProps {
  score?: number;
}

export interface AnnouncementItemProps extends baseItemProps {
  tag: string;
}

export interface AssignmentItemProps extends baseItemProps {
  deadline: string;
  maxPoints: number;
}

export type Editable<T> = T & { editable: boolean };
