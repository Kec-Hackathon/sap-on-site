import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityService } from '../activity.service';
import { ProjectMarkData } from './data/project-mark.data';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit {
  projectForm!: FormGroup;
  type = ['Inside KEC', 'Outside KEC'];
  availableModes = ['Online', 'Offline'];
  availablePosition = ProjectMarkData.exportClass();
  isPrizeWon: boolean = false;
  imageDisplay?: string;
  isLoading: boolean = false;
  data: any;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private messageService: MessageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this._initForm();
    this.route.queryParams.subscribe((res) => {
      if (res['userId']) {
        this.id = res['userId'];
      }
    });
  }

  onPositionChange(event: any) {
    if (event.value.prize) {
      this.isPrizeWon = true;
    } else {
      this.isPrizeWon = false;
    }

    this.data = event.value;
    this.projectForm.patchValue({ mark: event.value.mark });
    this.projectForm.get('mark')?.updateValueAndValidity();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.projectForm.patchValue({ image: file });
    this.projectForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.projectForm.invalid) return;

    this.data = this.projectForm.get('position')?.value;

    const form = new FormData();
    form.append('eventName', this.projectForm.value.eventName);
    form.append('eventVenue', this.projectForm.value.eventVenue);
    form.append('title', this.projectForm.value.title);
    form.append('type', this.projectForm.value.type);
    form.append('eventDate', this.projectForm.value.eventDate);
    form.append('eventMode', this.projectForm.value.eventMode);
    form.append('position', this.projectForm.value.position.label);
    form.append('prizeAmount', this.projectForm.value.prizeAmount);
    form.append('image', this.projectForm.value.image);
    form.append('mark', this.projectForm.value.mark);
    form.append('activityType', 'project');
    form.append('label', this.data.label);
    form.append('prize', this.data.prize);
    form.append('uploaderId', this.id);

    this.activityService.uploadNewActivity(form).subscribe((res) => {
      this.isLoading = false;
      if (res.activity != null) {
        // this.markService
        //   .updateMark(this.id, this.projectForm.value.mark, 'project')
        //   .subscribe((res) => {
        //     if (res.success) {
        //       this.messageService.add({
        //         severity: 'success',
        //         summary: 'Success',
        //         detail: 'Activity Saved, ' + res.message,
        //       });
        //     } else {
        //       this.messageService.add({
        //         severity: 'warn',
        //         summary: 'Warning',
        //         detail: 'Activity Saved, ' + res.message,
        //       });
        //     }
        //   });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  private _initForm() {
    this.projectForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventVenue: ['', Validators.required],
      title: ['', Validators.required],
      type: ['', Validators.required],
      eventDate: [new Date(), Validators.required],
      mode: ['', Validators.required],
      position: ['', Validators.required],
      prizeAmount: [''],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
