import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ViewStudentComponent } from './view-student/view-student.component';
import { PrimengModule } from 'src/app/primeng.module';
import { ActivityTableComponent } from './view-student/activity-table/activity-table.component';
import { MarkTableComponent } from './view-student/mark-table/mark-table.component';
import { ShowMarksComponent } from './show-marks/show-marks.component';
import { AgGridModule } from 'ag-grid-angular';
import { AssignMentorComponent } from './assign-mentor/assign-mentor.component';

const routes: Routes = [
  {
    path: '', children: [
      { path: ':id', component: AdminComponent },
      { path: ':id/s', component: ViewStudentComponent },
      { path: ':id/assign-mentor', component: AssignMentorComponent },
      { path: ':id/show-all-mark', component: ShowMarksComponent },
    ]
  },
];

@NgModule({
  declarations: [AdminComponent, ViewStudentComponent, ActivityTableComponent, MarkTableComponent, ShowMarksComponent, AssignMentorComponent],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),
    PrimengModule,
    AgGridModule
  ],
  providers: [MessageService, ConfirmationService]
})
export class AdminModule { }
