import type { Role } from "@/enums/roles";

export interface User {
  username: string;
  fullname: string;
  photoUrl: string;
  role: Role;
}
