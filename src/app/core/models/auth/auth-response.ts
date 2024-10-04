import {User} from "@models/users/user";

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  user: User | null;
}
