import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityService } from '../activity.service';
import { EntrepreneurshipMarkData } from 'src/assets/form-data/entrepreneurship-data.mark';

@Component({
  selector: 'app-entrepreneurship',
  templateUrl: './entrepreneurship.component.html',
  styleUrls: ['./entrepreneurship.component.scss'],
})
export class EntrepreneurshipComponent implements OnInit {
  entrepreneurshipForm!: FormGroup;
  imageDisplay?: string;
  availableType = EntrepreneurshipMarkData.exportClass();
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
    this.entrepreneurshipForm.patchValue({ image: file });
    this.entrepreneurshipForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.entrepreneurshipForm.invalid) return;

    this.data = this.entrepreneurshipForm.get('eventMode')?.value;

    const form = new FormData();
    form.append('eventName', this.entrepreneurshipForm.value.eventName);
    form.append('eventVenue', this.entrepreneurshipForm.value.eventVenue);
    form.append('workshopName', this.entrepreneurshipForm.value.workshopName);
    form.append('eventMode', this.entrepreneurshipForm.value.eventMode.label);
    form.append('eventDateRange', this.entrepreneurshipForm.value.eventDateRange);
    form.append('image', this.entrepreneurshipForm.value.image);
    form.append('mark', this.entrepreneurshipForm.value.mark);
    form.append('activityType', 'entrepreneurship');
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
    this.entrepreneurshipForm.patchValue({ mark: event.value.mark });
    this.entrepreneurshipForm.get('mark')?.updateValueAndValidity();
  }

  private _initForm() {
    this.entrepreneurshipForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventVenue: ['', Validators.required],
      workshopName: ['', Validators.required],
      eventMode: ['', Validators.required],
      eventDateRange: ['', Validators.required],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
