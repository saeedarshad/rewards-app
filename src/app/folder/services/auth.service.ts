import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/internal/Observable';
import {tap} from 'rxjs/operators';
import {ApiService} from './api.service';
import {LocalService} from './local.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    prefix = 'auth';

    constructor(public api: ApiService) {
    }

    public static get isAuthenticated(): boolean {
        return LocalService.Token !== null;
    }

    public static get isSuperUser(): boolean {
        const user = LocalService.getUserProfile;
        return user ? user.is_superuser || user.type.value === 'admin' : false;
    }

    login(body): Observable<{ token: string; user }> {
        return this.api.post<{ token: string; user }>(`${this.prefix}/login/`, body).pipe(tap(res => {
            LocalService.setToken(res.token);
            LocalService.setUserProfile(res.user);
        }));
    }

    logout(): Observable<{ detail: string }> {
        return this.api.post<{ detail: string }>(`${this.prefix}/logout/`); // .pipe(tap(() => this.intercom.shutdown()))
    }

    resetPassword(body): Observable<{ detail: string }> {
        return this.api.post<{ detail: string }>(`${this.prefix}/password/reset/`, body);
    }

    resetPasswordConfirm(body): Observable<{ detail: string }> {
        return this.api.post<{ detail: string }>(`${this.prefix}/password/reset/confirm/`, body);
    }

    userDetails(): Observable<any> {
        return this.api.get<any>(`${this.prefix}/user/`);
    }
}
