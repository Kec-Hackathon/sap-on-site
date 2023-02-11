import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  showMarkTable: boolean = false;
  studentDetail: any;
  studentId: string;
  markDetails?: any;
  markNeeded: boolean;
  totalMark: number;

  constructor(
    public location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      if (query['student']) {
        this.adminService.getUserDetailById(query['student']).subscribe((res) => {
          if (res.user) {
            this.studentDetail = res.user;
            this.studentId = res.user._id;
            this.adminService.getMarkByUserId(this.studentId).subscribe((marks) => {
              if (marks.mark) {
                this.markDetails = marks.mark
              }

            })
          }
        });
      }

    })
  }

  openMailDailog() { }
}
