import { Component } from '@angular/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email:string='';
  password:string='';
  selectedState: string[] = [];
  loading = false

    load() {
        this.loading = true;
        setTimeout(() => this.loading = false, 1000);
    }

}
