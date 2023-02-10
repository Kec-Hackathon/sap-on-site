import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../admin.service';

@Component({
  selector: 'app-mark-table',
  templateUrl: './mark-table.component.html',
  styleUrls: ['./mark-table.component.scss']
})
export class MarkTableComponent {
  studentActivityMarks = [];

  constructor(
    private adminService: AdminService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((res) => {
      if (res['id']) {
        this.adminService.getMarkByUserId(res['id']).subscribe((res) => {
          Object.keys(res.mark[0]).forEach((key) => {
            if (
              key == '_id' ||
              key == 'id' ||
              key == 'uploader_id' ||
              key == 'createdAt' ||
              key == 'updatedAt' ||
              key == '__v'
            ) {
            } else {
              this.studentActivityMarks.push({
                event: key,
                mark: res.mark[0][key],
              });
            }
          });
        });
      }
    });
  }
}
