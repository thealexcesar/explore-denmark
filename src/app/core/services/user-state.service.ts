import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {User} from "@models/users/user";

@Injectable({
  providedIn: 'root'
})
export class UserStateService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser = this.currentUserSubject.asObservable();

  constructor() {
    const user = sessionStorage.getItem('current_user');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }

  setCurrentUser(user: User | null): void {
    this.currentUserSubject.next(user);
    user ? sessionStorage.setItem('current_user', JSON.stringify(user))
      : sessionStorage.removeItem('current_user');
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAdmin(): boolean {
    const user = this.getCurrentUser();
    return user?.role === 'admin';
  }
}
