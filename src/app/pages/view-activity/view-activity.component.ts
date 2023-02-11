import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PrimengModule } from 'src/app/primeng.module';
import { ViewActivityService } from './view-activity.service';

@Component({
  selector: 'app-view-activity',
  templateUrl: './view-activity.component.html',
  styleUrls: ['./view-activity.component.scss'],
})

export class ViewActivityComponent implements OnInit {
  activityDetial: any;
  activityId: string;
  studentId: string;
  imageName: string;
  date?: any[];

  constructor(public location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private viewActivityService: ViewActivityService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['id']) {
        this.activityId = params['id']
        this.viewActivityService.getActivityDetail(params['id']).subscribe(res => {
          if (res) {
            this.activityDetial = res;
            this.studentId = res.uploader_id;
          }

        })
      }
    })
  }

  downloadProfile(imageLink: string) {
    window.open(imageLink);
  }
}
