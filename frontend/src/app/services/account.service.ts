import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({ providedIn: 'root' })
export class AccountService {
    constructor(private http: HttpClient) { }

    moveMoney(movement){
      const _id = localStorage.getItem('_id');
      return this.http.patch<any>(`${environment.apiURL}/accounts/${_id}`, {action: movement.action, value: movement.value});
    }
}