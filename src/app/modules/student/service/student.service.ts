import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  BACKEND_URL = environment.BACKEND_URL;

  constructor(private http: HttpClient) { }

  getUserDetailById(id: string) {
    return this.http.get(`${this.BACKEND_URL}/user/${id}`)
  }
}
