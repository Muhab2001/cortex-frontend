export interface User {
  username: string;
  photoUrl: string;
  role: Role;
}
export enum Role {
  STUDENT = 1,
  INSTRUCTOR = 2,
}
