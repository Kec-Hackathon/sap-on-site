import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private BACKEND_URL = environment.BACKEND_URL
  constructor(private http: HttpClient) { }

  getUserDetailById(id: string): any {
    return this.http.get(`${this.BACKEND_URL}/user/${id}`)
  }

  getMentorStudentList(id: string): any {
    return this.http.get(`${this.BACKEND_URL}/user/get-students/${id}`)
  }

  getMarkByUserId(id: string): any {
    return this.http.get(`${this.BACKEND_URL}/mark/${id}`)
  }

  getUserActivityByUserId(id: string): any {
    return this.http.get(`${this.BACKEND_URL}/activity/s/${id}`)
  }

  getActivityByDepartment(department: string): any {
    return this.http.get(`${this.BACKEND_URL}/activity/department/${department}`)
  }
}
