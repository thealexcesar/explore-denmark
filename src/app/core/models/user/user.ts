import {RoleType} from "@models/enums/RoleType";

export interface User {
  id: number | string;
  avatar: string;
  email: string;
  dateOfBirth?: Date | null | string;
  isActive: boolean;
  name: string;
  password: string;
  role: RoleType | string;
}
