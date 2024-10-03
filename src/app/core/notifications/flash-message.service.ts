import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Type} from "./type";

@Injectable({
  providedIn: 'root'
})
export class FlashMessageService {
  private notificationsSubject = new BehaviorSubject<Type[]>([]);
  notifications = this.notificationsSubject.asObservable();

  addNotification(notification:Type) {
    const notifications = this.notificationsSubject.value;
    this.notificationsSubject.next([...notifications, notification]);

    setTimeout(() => {
      this.removeNotification(notification);
    }, 3000);
  }

  removeNotification(notification:Type) {
    const notifications = this.notificationsSubject.value.filter(
      (n) => n !== notification
    );
    this.notificationsSubject.next(notifications);
  }
}
