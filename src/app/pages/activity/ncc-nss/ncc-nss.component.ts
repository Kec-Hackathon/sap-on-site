import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NccNssMarkData } from 'src/assets/form-data/ncc-nss-data.mark';

@Component({
  selector: 'app-ncc-nss',
  templateUrl: './ncc-nss.component.html',
  styleUrls: ['./ncc-nss.component.scss'],
})
export class NccNssComponent implements OnInit {
  nccForm!: FormGroup;
  imageDisplay?: string;
  isLoading: boolean = false;
  availableMarks = NccNssMarkData.exportClass();
  data?: { label: string; mark: number };

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this._initForm();
  }

  onImageUpload(event: any) {
    const file = event.files[0];
    this.nccForm.patchValue({ image: file });
    this.nccForm.get('image')?.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imageDisplay = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onFormSubmitted() {
    this.isLoading = true;
    if (this.nccForm.invalid) return;

    console.log(this.nccForm.value);
  }

  onChange(event: any) {
    this.data = event.value;
    this.nccForm.patchValue({ mark: event.value.mark });
    this.nccForm.get('mark')?.updateValueAndValidity();
  }

  private _initForm() {
    this.nccForm = this.formBuilder.group({
      eventName: ['', Validators.required],
      eventVenue: ['', Validators.required],
      position: [''],
      campRange:['', Validators.required],
      eventDateRange: ['', Validators.required],
      mark: ['', Validators.required],
      image: ['', Validators.required],
    });
  }
}
