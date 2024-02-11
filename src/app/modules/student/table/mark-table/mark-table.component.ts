import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../service/student.service';

@Component({
  selector: 'app-mark-table',
  templateUrl: './mark-table.component.html',
  styleUrls: ['./mark-table.component.scss']
})
export class MarkTableComponent implements OnInit {
  studentActivityMarks = [];

  constructor(private studentService: StudentService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.studentService.getMarkById(params['id']).subscribe((res) => {
          Object.keys(res.mark).forEach((key) => {
            if (
              key == '_id' ||
              key == 'uploader_id' ||
              key == 'createdAt' ||
              key == 'updatedAt'
            ) {
            } else {
              this.studentActivityMarks.push({
                event: key,
                mark: res.mark[key],
              });
            }
          });
        });
      }
    })
  }
}
