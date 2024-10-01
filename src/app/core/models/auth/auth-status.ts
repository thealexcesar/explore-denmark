import {RoleType} from "@models/enums/RoleType";

export interface AuthStatus {
  isAuthenticated: boolean;
  userRole: RoleType;
  userId: string;
}
