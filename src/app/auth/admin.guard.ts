import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthService } from "../services/auth.service";
import { map, take } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      take(1),
      map((user) => {
        const isAdmin = user.email === "admin@admin.com";
        if (isAdmin) {
          return true;
        }
        return this.router.createUrlTree(["/vehicles"]);
      })
    );
  }
}
