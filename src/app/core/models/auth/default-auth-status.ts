import { RoleType } from '@models/enums/RoleType';
import {AuthStatus} from "@models/auth/auth-status";

export const defaultAuthStatus: AuthStatus = {
  isAuthenticated: false,
  userRole: RoleType.USER,
  userId: '',
};
