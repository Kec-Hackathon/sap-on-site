import { Component } from '@angular/core';
import { Signup } from './signup-form.data';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signup = Signup;
  Department: any;
  Mentor: any;
  Year: any;
  loading = false

    load() {
        this.loading = true;
        setTimeout(() => this.loading = false, 1000);
    }

}


