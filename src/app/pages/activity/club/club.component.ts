import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityService } from '../activity.service';
import { ClubMarkData } from './data/club-mark.data';

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.scss'],
})
export class ClubComponent implements OnInit {
  clubForm!: FormGroup;
  availalePositions = ClubMarkData.exportClass();
  imageDisplay?: string;
  isLoading: boolean = false;
  id!: string;
  data: any;

  constructor(
    private formBuilder: FormBuilder,
    private activityService: ActivityService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService,
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
    this.data = event.value;
    this.clubForm.patchValue({ mark: event.value.mark });
    this.clubForm.get('mark')?.updateValueAndValidity();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.clubForm.patchValue({ image: file });
    this.clubForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.clubForm.invalid) return;

    this.data = this.clubForm.get('position')?.value;

    const form = new FormData();
    form.append('clubName', this.clubForm.value.clubName);
    form.append('position', this.clubForm.value.position.label);
    form.append('image', this.clubForm.value.image);
    form.append('mark', this.clubForm.value.mark);
    form.append('activityType', 'club');
    form.append('label', this.data.label);
    form.append('uploaderId', this.id);

    this.activityService.uploadNewActivity(form).subscribe((res) => {
      this.isLoading = false;
      if (res.activity != null) {
        // this.markService
        //   .updateMark(this.id, this.clubForm.value.mark, 'club')
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
    this.clubForm = this.formBuilder.group({
      clubName: ['', [Validators.required]],
      position: ['', [Validators.required]],
      mark: ['', [Validators.required]],
      image: ['', [Validators.required]],
    });
  }
}
