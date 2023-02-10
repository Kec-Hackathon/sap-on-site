import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TechnoManagerialMarkData } from './data/techno-managerial-mark.data';

@Component({
  selector: 'app-techno-managerial',
  templateUrl: './techno-managerial.component.html',
  styleUrls: ['./techno-managerial.component.scss'],
})
export class TechnoManagerialComponent implements OnInit {
  technoForm!: FormGroup;
  type = ['Inside KEC', 'Outside KEC'];
  availableLevels = TechnoManagerialMarkData.exportClass();
  imageDisplay?: string;
  isLoading: boolean = false;
  isPrizeWon: boolean = false;
  data?: { label: string; prize: boolean; mark: number };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.technoForm.patchValue({ image: file });
    this.technoForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true
    if (this.technoForm.invalid) return;

    console.log(this.technoForm.value);
  }

  onLevelChange(event: any) {
    if (event.value.prize) {
      this.isPrizeWon = true;
    } else {
      this.isPrizeWon = false;
    }

    this.data = event.value;
    this.technoForm.patchValue({ mark: event.value.mark });
    this.technoForm.get('mark')?.updateValueAndValidity();
  }

  private _initForm() {
    this.technoForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventVenue: ['', Validators.required],
      type: ['', Validators.required],
      title: ['', Validators.required],
      eventLevel: ['', Validators.required],
      eventDate: [new Date(), Validators.required],
      prizeAmount: [''],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
