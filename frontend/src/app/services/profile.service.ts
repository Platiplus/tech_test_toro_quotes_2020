import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class ProfileService {
    constructor(private http: HttpClient) { }

    getUser() {
      const _id = localStorage.getItem('_id');
      return this.http.get<any>(`${environment.apiURL}/users/${_id}`);
    }

    getAccount() {
      const _id = localStorage.getItem('_id');
      return this.http.get<any>(`${environment.apiURL}/accounts/${_id}`);
    }
}