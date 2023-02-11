import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityService } from '../activity.service';
import { GovtExamMarkData } from 'src/assets/form-data/govt-exam-mark.data';

@Component({
  selector: 'app-govt-exam',
  templateUrl: './govt-exam.component.html',
  styleUrls: ['./govt-exam.component.scss'],
})
export class GovtExamComponent implements OnInit {
  govtForm!: FormGroup;
  imageDisplay?: string;
  availableType = GovtExamMarkData.exportClass();
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
    this.govtForm.patchValue({ image: file });
    this.govtForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.govtForm.invalid) return;

    this.data = this.govtForm.get('examLevel')?.value;

    const form = new FormData();
    form.append('examName', this.govtForm.value.examName);
    form.append('examVenue', this.govtForm.value.examVenue);
    form.append('examLevel', this.govtForm.value.examLevel.label);
    form.append('eventDate', this.govtForm.value.eventDate);
    form.append('image', this.govtForm.value.image);
    form.append('mark', this.govtForm.value.mark);
    form.append('activityType', 'gate_govt_exam');
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

  onTypeChanged(event: any) {
    this.data = event.value;
    this.govtForm.patchValue({ mark: event.value.mark });
    this.govtForm.get('mark')?.updateValueAndValidity();
  }

  private _initForm() {
    this.govtForm = this.formBuilder.group({
      examName: ['', Validators.required],
      examVenue: ['', Validators.required],
      examLevel: ['', Validators.required],
      eventDate: ['', Validators.required],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
