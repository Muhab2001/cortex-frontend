import type { Role } from "@/enums/roles";

export type SectionTab =
  | "Course Content"
  | "Grades"
  | "Assignments"
  | "Attendance"
  | "Announcements";

export interface SectionSlotProps {
  sectionId: number;
  role: Role;
  tab: SectionTab;
}

export type SectionTabProps = Omit<SectionSlotProps, "tab">;

interface baseItemProps {
  id: number;
  title: string;
  description?: string;
  lastUpdated: string;
  visible: boolean;
}

export interface ContentItemProps extends baseItemProps {
  fileUrls: string[];
}

export interface GradeItemProps extends baseItemProps {
  score?: number;
  assignmentId: number;
}

export interface AnnouncementItemProps extends baseItemProps {
  tag: string;
}

export interface AssignmentItemProps extends baseItemProps {
  deadline: string;
  maxPoints: number;
}

export type Editable<T> = T & { editable: boolean };
