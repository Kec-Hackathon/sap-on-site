import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Signup } from './signup-form.data';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signup = Signup;
  form!: FormGroup;
  loading: boolean = false;
  uploadedFiles: any[] = [];
  displayImage: string = '';

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roll_no: ['', Validators.required],
      password: ['', [Validators.required]],
      department: ['', Validators.required],
      mentor_id: ['', Validators.required],
      year: ['', Validators.required],
      profile: ['', Validators.required],
    });
  }

  onSubmit() {
    console.log(this.form.value);

    if(this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('email', this.form.value.email);
      formData.append('password', this.form.value.password);
      formData.append('roll_no', this.form.value.roll_no);
      formData.append('department', this.form.value.department);
      formData.append('mentor_id', this.form.value.mentor_id);
      formData.append('year', this.form.value.year);
      formData.append('profile', this.form.value.profile);
    }
    
    this.loading = true;
    setTimeout(() => (this.loading = false), 1000);
  }

  onUpload(event: any) {
    const file = event.files[0];
    this.form.patchValue({ profile: file });
    this.form.get('profile')!.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.displayImage = reader.result as string;
    };
    reader.readAsDataURL(file);
  }
}
