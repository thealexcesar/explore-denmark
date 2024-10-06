import {User} from "@models/users/user";

export interface ServerAuthResponse {
  token: string;
  refreshToken?: string;
  user?: User;
}
