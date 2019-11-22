import { Injectable } from '@angular/core';
import * as socketIo from 'socket.io-client';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


const SERVER_URL = environment.quotesURL;

@Injectable({
  providedIn: 'root'
})

export class QuoteService {
  private socket;

  public initSocket(): void {
    this.socket = socketIo(SERVER_URL);
  }

  public onMessage(): Observable<any> {
      return new Observable<any>(observer => {
          this.socket.on('message', (data: any) => observer.next(data));
      });
  }

  public moveQuote(action, stock) {
    const _id = localStorage.getItem('_id');
    return this.http.patch<any>(`${environment.apiURL}/users/${_id}`, {action, stock});
  }

  constructor(private http: HttpClient) {}
}