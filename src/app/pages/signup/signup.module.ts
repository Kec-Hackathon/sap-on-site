import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignupComponent } from './signup.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { PrimengModule } from 'src/app/primeng.module';
import { MessageService } from 'primeng/api';

const routes: Routes = [
  { path: '', component: SignupComponent }
]

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PrimengModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  providers: [MessageService]
})
export class SignupModule { }
