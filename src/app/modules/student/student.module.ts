import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PrimengModule } from 'src/app/primeng.module';
import { ActivityTableComponent } from './table/activity-table/activity-table.component';
import { MarkTableComponent } from './table/mark-table/mark-table.component';
import { ConfirmationService, MessageService } from 'primeng/api';

const routes: Routes = [
  {
    path: '', children: [
      { path: ':id', component: StudentComponent }
    ]
  }
]

@NgModule({
  declarations: [
    StudentComponent,
    ActivityTableComponent,
    MarkTableComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HttpClientModule,
    PrimengModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class StudentModule { }
