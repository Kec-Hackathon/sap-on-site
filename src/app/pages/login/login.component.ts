import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { LocalStorageService } from 'src/app/core/auth/local-storage.service';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  loading: boolean = false;
  formSubmitAttempt: boolean = false;

  constructor(private formBuilder: FormBuilder, private messageService: MessageService, private loginService: LoginService, private localStorage: LocalStorageService, private router: Router) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit() {
    this.formSubmitAttempt = true;
    this.loading = true

    if (this.form.valid) {
      this.loginService.loginUser(this.form.value).subscribe((res) => {
        if (res.user) {
          if (this.form.value.rememberMe[0]) {
            this.localStorage.setLocalStorage('token', res.token);
          }
          this.loading = false;
          if(res.user.user_type === 'Student') {
            this.router.navigate([`s/${res.user._id}`]);
          } else if(res.user.user_type === 'Mentor') {
            this.router.navigate([`a/${res.user._id}`]);
          }
        } else {
          this.loading =  false
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: res.message
          })
        }
      })
    }
  }

  
}

