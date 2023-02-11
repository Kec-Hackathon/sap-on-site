import { query } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-show-admin',
  templateUrl: './show-admin.component.html',
  styleUrls: ['./show-admin.component.scss']
})
export class ShowAdminComponent implements OnInit {
  adminList = [];

  constructor(private adminService: AdminService, private route: ActivatedRoute, public location: Location) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(query => {
      if (query) {
        this.adminService.getAdminListByDepartment(query['department']).subscribe((res) => {
          if (res.length > 0) {
            this.adminList = res
          }
        })
      }
    })
  }
}
