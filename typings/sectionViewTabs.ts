import type { Role } from "./globals";

export type SectionTab =
  | "Course Content"
  | "Grades"
  | "Assignments"
  | "Attendance"
  | "Announcements";

export interface SectionTabProps {
  label: SectionTab;
  sectionId: number;
  role: Role;
}

interface baseItem {
  title: string;
  description?: string;
  lastUpdated: string;
}

export interface ContentItem extends baseItem {
  fileURLs: string[];
}

export interface GradeItem extends baseItem {
  score?: number;
}

export interface AnnouncementItem extends baseItem {
  tag: string;
}

export interface AssignmentItem extends baseItem {
  deadline: string;
  maxPoints: number;
}

export type Editable<T> = T & { editable: boolean };
