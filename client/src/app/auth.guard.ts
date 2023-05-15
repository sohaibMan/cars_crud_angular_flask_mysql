import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";




export const authGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  if (route.component?.name === "AppComponent") {
    const jwt = localStorage.getItem("jwt")
    if (!jwt) {
      return router.navigate(['/login'])
    }
  }

  return true;
};
