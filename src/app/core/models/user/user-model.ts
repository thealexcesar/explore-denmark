import { RoleType } from '@models/enums/RoleType';
import {User} from "@models/user/user";
import {defaultAuthStatus} from "@models/auth/default-auth-status";

export interface Name {
  first: string;
  last: string;
}

export class UserModel implements User {
  private authStatus: any;
  constructor(
    public id: number = 0,
    public avatar: string = '',
    public email: string = '',
    public dateOfBirth: Date | string | null = null,
    public isActive: boolean = false,
    public name: string = '',
    public password: string = '',
    public role: RoleType | string = RoleType.USER
  ) {}

  static build(user: User): UserModel {
    if (!user) return new UserModel();
    return new UserModel(
      typeof user.id === 'string' ? Number(user.id) : user.id,
      user.avatar,
      user.email,
      typeof user.dateOfBirth === 'string' ? new Date(user.dateOfBirth) : user.dateOfBirth,
      user.isActive,
      user.name,
      user.password,
      user.role as RoleType
    );
  }

  logout(clearToken?: boolean): void {
    setTimeout(() => this.authStatus.next(defaultAuthStatus), 0)
  }
}
