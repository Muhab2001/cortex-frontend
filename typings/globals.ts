export interface User {
  username: string;
  photoUrl: string;
  role: Role;
}
export enum Role {
  STUDENT = 0,
  INSTRUCTOR = 1,
}
