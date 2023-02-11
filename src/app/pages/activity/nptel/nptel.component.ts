import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityService } from '../activity.service';
import { NptelMarkData } from 'src/assets/form-data/nptel-data.mark';

@Component({
  selector: 'app-nptel',
  templateUrl: './nptel.component.html',
  styleUrls: ['./nptel.component.scss'],
})
export class NptelComponent implements OnInit {
  nptelForm!: FormGroup;
  imageDisplay?: string;
  type = ['Yes', 'No'];
  availableCredit = NptelMarkData.exportClass();
  isLoading: boolean = false;
  data: any;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private activityService: ActivityService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this._initForm();
    this.route.queryParams.subscribe((res) => {
      if (res['userId']) {
        this.id = res['userId'];
      }
    });
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.nptelForm.patchValue({ image: file });
    this.nptelForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.nptelForm.invalid) return;

    this.data = this.nptelForm.get('credit')?.value;

    const form = new FormData();
    form.append('registraionNumber', this.nptelForm.value.registraionNumber);
    form.append('courseCode', this.nptelForm.value.courseCode);
    form.append('courseName', this.nptelForm.value.courseName);
    form.append('hostInstitution', this.nptelForm.value.hostInstitution);
    form.append('organizationName', this.nptelForm.value.organizationName);
    form.append('creditTransfer', this.nptelForm.value.creditTransfer);
    form.append('credit', this.nptelForm.value.credit.label);
    form.append('image', this.nptelForm.value.image);
    form.append('mark', this.nptelForm.value.mark);
    form.append('activityType', 'nptel');
    form.append('label', this.data.label);
    form.append('uploaderId', this.id);

    this.activityService.uploadNewActivity(form).subscribe((res) => {
      this.isLoading = false;
      if (res.activity != null) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success',
          detail: 'Activity Saved, ' + res.message,
        });
      } else {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: res.message,
        });
      }
    });
  }

  onCreditChanged(event: any) {
    this.data = event.value;
    this.nptelForm.patchValue({ mark: event.value.mark });
    this.nptelForm.get('mark')?.updateValueAndValidity();
  }

  private _initForm() {
    this.nptelForm = this.formBuilder.group({
      registraionNumber: ['', Validators.required],
      courseCode: ['', Validators.required],
      courseName: ['', Validators.required],
      hostInstitution: ['', Validators.required],
      organizationName: ['', Validators.required],
      credit: ['', Validators.required],
      creditTransfer: ['', Validators.required],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
