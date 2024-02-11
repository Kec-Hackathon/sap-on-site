import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewActivityComponent } from './view-activity.component';
import { RouterModule, Routes } from '@angular/router';
import { PrimengModule } from 'src/app/primeng.module';
import { HttpClientModule } from '@angular/common/http';
import { ConfirmationService, MessageService } from 'primeng/api';

const routes: Routes = [
  { path: '', component: ViewActivityComponent }
]

@NgModule({
  declarations: [ViewActivityComponent],
  imports: [
    CommonModule,
    PrimengModule,
    HttpClientModule,
    RouterModule.forChild(routes)
  ],
  providers: [MessageService, ConfirmationService]
})
export class ViewActivityModule { }
