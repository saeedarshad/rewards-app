import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {
    HttpClient,
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpParameterCodec,
    HttpParams,
    HttpRequest
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs/internal/observable/throwError';
import {LocalService} from './local.service';
import {environment} from '../../../environments/environment';

export class UrlEncoder implements HttpParameterCodec {
    encodeKey(key: string): string {
        return encodeURIComponent(key);
    }

    encodeValue(value: string): string {
        return encodeURIComponent(value);
    }

    decodeKey(key: string): string {
        return decodeURIComponent(key);
    }

    decodeValue(value: string): string {
        return decodeURIComponent(value);
    }
}


@Injectable()
export class TokenInterceptor implements HttpInterceptor {

    constructor(private router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const params = new HttpParams({encoder: new UrlEncoder(), fromString: request.params.toString()});
        request = request.clone({
            params,
            setHeaders: {
                Authorization: `RewardsApp ${LocalService.Token}`
            }
        });
        return next.handle(request).pipe(catchError(response => {
            if (response.status === 403 && response.error && response.error.detail === 'Token Invalid') {
                LocalService.clear();
                this.router.navigate(['accounts/login']).then();
            }
            if (response.status === 401 && response.error && response.error.detail === 'Error decoding signature.') {
                LocalService.clear();
                this.router.navigate(['accounts/login']).then();
            }
            return throwError(response);
        }));
    }
}

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    baseUrl: string = environment.baseUrl;

    constructor(public http: HttpClient) {
    }

    static catchErrors(response: HttpErrorResponse): Observable<any> {
        if (response.error && response.error.non_field_errors) {
            response.error.non_field_errors.forEach(value => {
            });
        } else if (response.error && response.error.constructor === Object) {
        }
        return throwError(response);
    }

    options<T>(endPoint: string, params?: {}): Observable<T> {
        return this.http.options<T>(`${this.baseUrl}/${endPoint}`, {params: params}).pipe(catchError(ApiService.catchErrors));
    }

    get<T>(endPoint: string, params?: {}, isNext: boolean = false): Observable<T> {
        const ep = endPoint.endsWith('.json') ? endPoint : `${this.baseUrl}/${endPoint}`;
        if (isNext) {
            return this.http.get<T>(ep).pipe(catchError(ApiService.catchErrors));
        }
        return this.http.get<T>(ep, {params: params}).pipe(catchError(ApiService.catchErrors));
    }

    post<T>(endPoint: string, body?: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}/${endPoint}`, body).pipe(catchError(ApiService.catchErrors));
    }

    put<T>(endPoint: string, body?: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}/${endPoint}`, body).pipe(catchError(ApiService.catchErrors));
    }

    patch<T>(endPoint: string, body?: any, params?: {}): Observable<T> {
        return this.http.patch<T>(`${this.baseUrl}/${endPoint}`, body, {params: params}).pipe(catchError(ApiService.catchErrors));
    }

    delete<T>(endPoint: string, params?: {}): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}/${endPoint}`, {params: params}).pipe(catchError(ApiService.catchErrors));
    }

    empty(value?: any) {
        return of(value);
    }

    permissions(endPoint: string): Observable<{ [permission: string]: boolean }> {
        return this.options<any>(endPoint, {only_permission: true}).pipe(map(res => res.actions.permissions));
    }

}
