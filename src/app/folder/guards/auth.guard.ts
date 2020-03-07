import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private router: Router) {
    }

    canActivate() {
        if (AuthService.isAuthenticated) {
            return true;
        }

        this.router.navigate(['accounts/login']);
        return false;
    }
}
