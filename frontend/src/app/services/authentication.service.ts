import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environments/environment'
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private tokenSubject: BehaviorSubject<any>;
    public token: Observable<any>;

    constructor(private http: HttpClient) {
        this.tokenSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('token')));
        this.token = this.tokenSubject.asObservable();
    }

    public get tokenValue() {
        return this.tokenSubject.value;
    }

    login(username, password) {
        return this.http.post<any>(`${environment.apiURL}/signin`, { username, password })
            .pipe(map(user => {
                localStorage.setItem('token', JSON.stringify(user));
                this.tokenSubject.next(user);
                return user;
            }));
    }

    logout() {
        // remove user from local storage and set current user to null
        localStorage.removeItem('token');
        this.tokenSubject.next(null);
    }
}