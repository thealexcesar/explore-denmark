import {User} from "@models/user-model";

export interface Login {
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}
