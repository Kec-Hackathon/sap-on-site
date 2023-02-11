import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent implements OnInit {
  studentActivitiesList = [];

  constructor(private studentService: StudentService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      if (res['id']) {
        this.studentService.getActivitiesByStudentId(res['id']).subscribe((res) => {
          if (res.activites) {
            this.studentActivitiesList = res.activites
          }

        })
      }
    })
  }

  viewActivity(id: string) {
    this.router.navigate([`v/${id}`])
  }
}
