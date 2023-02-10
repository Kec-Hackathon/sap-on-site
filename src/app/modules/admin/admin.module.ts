import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ToastModule } from 'primeng/toast';
import { RouterModule, Routes } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import {CardModule} from 'primeng/card';
const routes: Routes = [
  { path: '', children: [{ path: ':id', component: AdminComponent }] },
];

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    InputSwitchModule,
    ToastModule,
    RouterModule,
    DialogModule,
    ProgressSpinnerModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule,
    CardModule,
    RouterModule.forChild(routes),
  ],
  providers:[MessageService]
})
export class AdminModule {}
