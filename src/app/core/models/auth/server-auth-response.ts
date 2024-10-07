import {User} from "@models/users/user";

export interface ServerAuthResponse {
  access_token: string;
  refresh_token?: string;
  user: User;
}
