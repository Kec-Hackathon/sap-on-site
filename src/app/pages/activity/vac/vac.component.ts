import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vac',
  templateUrl: './vac.component.html',
  styleUrls: ['./vac.component.scss'],
})
export class VacComponent implements OnInit {
  vacForm!: FormGroup;
  imageDisplay?: string;
  mode = ['Online', 'Offline'];
  isLoading: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.vacForm.patchValue({ image: file });
    this.vacForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.vacForm.invalid) return;

    console.log(this.vacForm.value);
  }

  private _initForm() {
    this.vacForm = this.formBuilder.group({
      courseName: ['', Validators.required],
      coursePlatform: ['', Validators.required],
      mode: ['', Validators.required],
      courseDateRange: ['', Validators.required],
      mark: [5, Validators.required],
      image: ['', Validators.required],
    });
  }
}
