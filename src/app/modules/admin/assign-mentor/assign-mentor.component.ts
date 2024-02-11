import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-assign-mentor',
  templateUrl: './assign-mentor.component.html',
  styleUrls: ['./assign-mentor.component.scss']
})
export class AssignMentorComponent implements OnInit {
  studentsList = [];
  adminList = [];
  department: string;

  constructor(private adminService: AdminService, private route: ActivatedRoute, public location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      if (query['department']) {
        this.department = query['department']
        this.adminService.getStudentListByDepartment(query['department']).subscribe((res) => {
          if (res.length > 0) {
            this.studentsList = res;
          }
        })
        this.adminService.getAdminListByDepartment(query['department']).subscribe((res) => {
          if (res.length > 0) {
            this.adminList = res;
          }
        })
      }
    })
  }

  onChangeMentor(event: any, student: any) {
    student['mentor_id'] = event.value;
    this.adminService.updateStudentMentorId(student._id, student).subscribe((res) => {
      if (res) {
        this.adminService.getStudentListByDepartment(this.department).subscribe((res) => {
          if (res.length > 0) {
            this.studentsList = res;
          }
        })
      }
    })
  }
}
