import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizeGuard implements CanActivate {

  constructor(private router: Router) {     
  }

  canActivate(): boolean {
    if(localStorage.getItem('userName'))
      return true;
    else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
