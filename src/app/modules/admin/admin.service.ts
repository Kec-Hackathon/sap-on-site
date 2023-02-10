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

  addNewMentor(mentorData: any): any {
    return this.http.post(`${this.BACKEND_URL}/user/signup`, mentorData)
  }

  getStudentListByDepartment(department: string): any {
    return this.http.get(`${this.BACKEND_URL}/user/s/department/${department}`)
  }

  getAdminListByDepartment(department: string): any {
    return this.http.get(`${this.BACKEND_URL}/user/m/department/${department}`)
  }

  updateStudentMentorId(id: string, studentDetail: string): any {
    console.log(studentDetail);
    
    return this.http.put(`${this.BACKEND_URL}/user/update-admin/${id}`, studentDetail)
  }
}
