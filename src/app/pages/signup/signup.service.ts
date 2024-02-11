import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  BACKEND_URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  userSignup(userData: FormData): any {
    return this.http.post(`${this.BACKEND_URL}/user/signup`, userData)
  }
}
