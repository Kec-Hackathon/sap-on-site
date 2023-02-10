import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ActivityService } from '../activity.service';
import { PaperMarkData } from './data/paper-mark.data';

@Component({
  selector: 'app-paper',
  templateUrl: './paper.component.html',
  styleUrls: ['./paper.component.scss'],
})
export class PaperComponent implements OnInit {
  paperForm!: FormGroup;
  type = ['Inside KEC', 'Outside KEC'];
  availableModes = ['Online', 'Offline'];
  availablePosition = PaperMarkData.exportClass();
  isPrizeWon: boolean = false;
  imageDisplay?: string;
  isLoading: boolean = false;
  data: any;
  id!: string;

  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private activityService: ActivityService,
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
    this.paperForm.patchValue({ mark: event.value.mark });
    this.paperForm.get('mark')?.updateValueAndValidity();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.paperForm.patchValue({ image: file });
    this.paperForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.paperForm.invalid) return;

    this.data = this.paperForm.get('position')?.value;

    const form = new FormData();
    form.append('eventName', this.paperForm.value.eventName);
    form.append('eventVenue', this.paperForm.value.eventVenue);
    form.append('title', this.paperForm.value.title);
    form.append('type', this.paperForm.value.type);
    form.append('eventDate', this.paperForm.value.eventDate);
    form.append('eventMode', this.paperForm.value.eventMode);
    form.append('position', this.paperForm.value.position.label);
    form.append('prizeAmount', this.paperForm.value.prizeAmount);
    form.append('image', this.paperForm.value.image);
    form.append('mark', this.paperForm.value.mark);
    form.append('activityType', 'paper');
    form.append('label', this.data.label);
    form.append('prize', this.data.prize);
    form.append('uploaderId', this.id);

    this.activityService.uploadNewActivity(form).subscribe((res) => {
      this.isLoading = false;
      if (res.activity != null) {
        // this.markService
        //   .updateMark(this.id, this.paperForm.value.mark, 'paper')
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
    this.paperForm = this.formBuilder.group({
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
