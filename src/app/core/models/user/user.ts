import {RoleType} from "@models/enums/RoleType";

export interface UserParams {
  email: string,
  name?: string
  password: string,
}

export interface UserForm extends UserParams {
  avatar: string;
  role: RoleType;
}

export interface User extends UserParams, UserForm {
  id: number | string;
}
