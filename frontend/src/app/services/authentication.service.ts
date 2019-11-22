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
        return this.http.post<any>(`${environment.authURL}/signin`, { username, password })
            .pipe(map(user => {
                let name = user.username.split('');
                name[0] = name[0].toUpperCase();
                name = name.join('');
                localStorage.setItem('token', JSON.stringify(user.token));
                localStorage.setItem('username', name);
                localStorage.setItem('_id', user._id);
                this.tokenSubject.next(user);
                return user;
            }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        localStorage.removeItem('_id');
        this.tokenSubject.next(null);
    }
}