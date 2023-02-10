import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {AvatarModule} from 'primeng/avatar';
import {CardModule} from 'primeng/card';
import {SidebarModule} from 'primeng/sidebar';
import {InputSwitchModule} from 'primeng/inputswitch';

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
    AvatarModule,
    CardModule,
    SidebarModule,
    InputSwitchModule
  ]
})
export class StudentModule { }
