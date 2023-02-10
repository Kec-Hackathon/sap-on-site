import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environment.development';
import { UserLogin } from './User-Login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BACKEND_URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  loginUser(userLogin: UserLogin): Observable<{ user: any, token: string, message: string }> {
    return this.http.post<{ user: any, token: string, message: string }>(`${this.BACKEND_URL}/user/login`, userLogin)
  }
}
