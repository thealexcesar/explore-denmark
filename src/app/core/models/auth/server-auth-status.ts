import {User} from "@models/user/user";

export interface ServerAuthResponse {
  token: string;
  refreshToken?: string;
  user?: User;
}
