import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class LocalService {

    public static get Token(): string {
        return localStorage.getItem('Token');
    }

    public static setToken(token: string): void {
        localStorage.setItem('Token', token);
    }

    public static setUserProfile(data: any): void {
        localStorage.setItem('UserProfile', JSON.stringify(data));
    }

    public static get getUserProfile(): any {
        return JSON.parse(localStorage.getItem('UserProfile'));
    }

    public static clear(): void {
        localStorage.clear();
    }
}
