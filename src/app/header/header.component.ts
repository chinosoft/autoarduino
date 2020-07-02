import { Subscription } from "rxjs";
import { AuthService } from "./../services/auth.service";
import { Component, OnInit, OnDestroy } from "@angular/core";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated = false;
  isAdmin = false;
  private userSub: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.userSub = this.authService.user.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.isAdmin = this.authService.userAdmin;
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
