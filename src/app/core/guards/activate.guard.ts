import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";

export const activateGuard: CanActivateFn = (route, state) => {
  const localToken = sessionStorage.getItem("access_token");
  if (localToken != null) return true;

  const router = inject(Router);
  router.navigate(['/']).then(r => r);
  return false;
};
