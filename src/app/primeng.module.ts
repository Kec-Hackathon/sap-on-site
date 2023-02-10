import { NgModule } from '@angular/core';

import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputMaskModule } from 'primeng/inputmask';
import { FileUploadModule } from 'primeng/fileupload';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    exports: [
        InputTextModule,
        ButtonModule,
        RippleModule,
        InputMaskModule,
        FileUploadModule,
        ToastModule,
        ProgressSpinnerModule,
        CheckboxModule,
        DropdownModule,
        TableModule,
        TooltipModule,
        InputTextareaModule,
        CalendarModule,
        CardModule,
        InputNumberModule,
        DialogModule,
        InputSwitchModule,
        ConfirmPopupModule,
        ConfirmDialogModule,
    ],
})
export class PrimengModule { }