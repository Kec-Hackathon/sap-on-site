import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {AvatarModule} from 'primeng/avatar';

const routes: Routes = [
  {
    path: '', children: [
      { path: ':id', component: StudentComponent }
    ]
  }
]

@NgModule({
  declarations: [
    StudentComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    AvatarModule
  ]
})
export class StudentModule { }