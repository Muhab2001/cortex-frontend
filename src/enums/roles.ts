export enum Role {
  INSTRUCTOR = "instructor",
  STUDENT = "student",
  UNSET = "unset",
}

export const RoleMap: { [key: number]: Role } = {
  0: Role.UNSET,
  1: Role.STUDENT,
  2: Role.INSTRUCTOR,
};
