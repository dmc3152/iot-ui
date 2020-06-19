import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private authenticationService: AuthenticationService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const url: string = state.url;

      return this.checkLogin(url);
  }

  checkLogin(url: string) {
    if (!this.authenticationService.isTokenExpired()) { return true; }

    // Store the attempted URL for redirecting
    this.authenticationService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['/authentication/login']);
    return false;
  }
}
