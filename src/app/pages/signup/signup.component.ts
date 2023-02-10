import { Component } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Signup } from './signup-form.data';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent {
  signup=Signup;
  form!:FormGroup;
  loading:boolean=false;
  uploadedFiles: any[] = [];
  constructor(private formBuilder: FormBuilder ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name:['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      roll_no:['',Validators.required],
      password: ['', [Validators.required]],
      department:['', Validators.required],
      mentor_id:['', Validators.required],
      year:['',Validators.required],
      profile:['', Validators.required]
    });
  }

    load() {
        this.loading = true;
        setTimeout(() => this.loading = false, 1000);
    }
    onBasicUploadAuto(event:any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }

  }

}


