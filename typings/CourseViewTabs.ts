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
  updatedAt: string;
  visible: boolean;
}

export interface ContentItemProps extends baseItemProps {
  fileUrls: string[];
}

// the grade item is only shown for students
export interface GradeItemProps
  extends Omit<baseItemProps, "description" | "visible"> {
  score: number;
  maxPoints: number;
  comment?: string;
}

export interface AnnouncementItemProps extends Omit<baseItemProps, "visible"> {
  description: string;
  tag: string;
}

export interface AssignmentItemProps extends baseItemProps {
  deadline: number;
  maxPoints: number;
  submissions?: number;
  submissionsLeft?: number;
  fileUrls: string[];
  isSubmitted?: boolean;
  isSubmittable: boolean;
  isUnlimited: boolean;
}

export type Editable<T> = T & { editable: boolean };
