import {User} from "@models/user/user";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User | null;
}
