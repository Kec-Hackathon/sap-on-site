import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class MentorService {
  BACKEND_URL = environment.BACKEND_URL;
  mentors: any[] = [];
  availableMentor = [];

  constructor(private http: HttpClient) {}

  getMentors() {
    return this.http.get<any[]>(`${this.BACKEND_URL}available-mentors/`);
  }

  getUpdatedMentor() {
    this.getMentors().subscribe((res) => {
      for (let a of res) {
        delete a._id;
        delete a.__v;
        delete a.id;
        a.item.map((e: { _id: any; }) => {
          delete e._id;
        });
        this.mentors.push(a);
      }
    });
    return this.mentors;
  }

  addAdmin(name: string, id: string, dept: string) {
    return this.http.put<{ message: string }>(
      `${this.BACKEND_URL}available-mentors/${dept}`,
      {
        name,
        id,
      }
    );
  }

  checkMentorOldPassword(password: string, id: string) {
    return this.http.post<{ confirmation: boolean; message: string }>(
      `
    ${this.BACKEND_URL}user/check-password/${id}`,
      { password: password }
    );
  }

  updatePassword(password: string, id: string) {
    return this.http.put<{ updated: boolean; message: string }>(
      `${this.BACKEND_URL}user/update-password/${id}`,
      { password: password }
    );
  }
}