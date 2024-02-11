import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Signup } from './signup-form.data';
import { MessageService } from 'primeng/api';
import { SignupService } from './signup.service';
import { Router } from '@angular/router';
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

  constructor(private formBuilder: FormBuilder, private signupService: SignupService, private router: Router, private messageService: MessageService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roll_no: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      department: ['', Validators.required],
      year: ['', Validators.required],
      profile: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loading = true;

    if (this.form.valid) {
      const formData = new FormData();
      formData.append('name', this.form.value.name);
      formData.append('email', this.form.value.email);
      formData.append('password', this.form.value.password);
      formData.append('roll_no', this.form.value.roll_no);
      formData.append('department', this.form.value.department);
      formData.append('year', this.form.value.year);
      formData.append('profile', this.form.value.profile);
      formData.append('user_type', 'Student');

      this.signupService.userSignup(formData).subscribe((res) => {
        if (res.user) {
          this.loading = false;
          this.router.navigate([`s/${res.user._id}`])
        } else {
          this.loading = false;
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message
          })
        }
      })
    }

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
