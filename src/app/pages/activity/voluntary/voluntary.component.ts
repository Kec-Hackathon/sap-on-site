import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-voluntary',
  templateUrl: './voluntary.component.html',
  styleUrls: ['./voluntary.component.scss'],
})
export class VoluntaryComponent implements OnInit {
  voluntaryForm!: FormGroup;
  imageDisplay?: string;
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.voluntaryForm.patchValue({ image: file });
    this.voluntaryForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.voluntaryForm.invalid) return;

    console.log(this.voluntaryForm.value);
  }

  private _initForm() {
    this.voluntaryForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventVenue: ['', Validators.required],
      activityDone: ['', Validators.required],
      eventDate: [new Date(), Validators.required],
      mark: [5, Validators.required],
      image: ['', Validators.required],
    });
  }
}
