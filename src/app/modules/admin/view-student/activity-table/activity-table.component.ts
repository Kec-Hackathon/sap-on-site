import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AdminService } from '../../admin.service';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-activity-table',
  templateUrl: './activity-table.component.html',
  styleUrls: ['./activity-table.component.scss']
})
export class ActivityTableComponent {
  studentActivitiesList = [];
  studentId: string;
  adminId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.studentId = params['student'];
      this.adminService.getUserActivityByUserId(params['student']).subscribe((res) => {
        this.studentActivitiesList = res.activites;
      });
    });
  }

  updateLockStatus(id: string, activity: any) {
    this.adminService.updateActivityStatus(id, activity).subscribe((res) => {
      console.log(res);

    })
  }

  // viewActivity(id: string) {
  //   this.router.navigate([`view-a/a/${id}`], {
  //     queryParams: { adminId: this.adminId },
  //   });
  // }

  // updateLockStatus(id: string, status: boolean) {
  //   let lockStatus: string;
  //   status ? (lockStatus = 'Unlock') : (lockStatus = 'Lock');
  //   this.confirmationService.confirm({
  //     target: event.target,
  //     message: `Are you sure that you want to ${lockStatus} this activity?`,
  //     accept: () => {
  //       this.activityService.updateLockStatus(id, status).subscribe((res) => {
  //         if (res.success) {
  //           this.activityService.getUserActivityByUserId(this.studentId);
  //           this.messageService.add({
  //             severity: 'success',
  //             summary: 'Success',
  //             detail: res.message,
  //           });
  //         } else {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: res.message,
  //           });
  //         }
  //       });
  //     },
  //     reject: () => { },
  //   });
  // }

  // deleteActivity(event: Event, id: string) {
  //   this.confirmationService.confirm({
  //     target: event.target,
  //     message: 'Are you sure that you want to proceed?',
  //     accept: () => {
  //       this.activityService.deleteActivity(id).subscribe((res) => {
  //         if (res.success) {
  //           this.activityService.getUserActivityByUserId(this.studentId);
  //           this.markService
  //             .updateMark(
  //               this.studentId,
  //               -res.activity.mark,
  //               res.activity.activity_type
  //             )
  //             .subscribe((result) => {
  //               if (result.success) {
  //                 this.markService.getMarkByUserId(this.studentId);
  //                 this.messageService.add({
  //                   severity: 'success',
  //                   summary: 'Success',
  //                   detail: res.message,
  //                 });
  //               } else {
  //                 this.messageService.add({
  //                   severity: 'error',
  //                   summary: 'Error',
  //                   detail: res.message,
  //                 });
  //               }
  //             });
  //         } else {
  //           this.messageService.add({
  //             severity: 'error',
  //             summary: 'Error',
  //             detail: res.message,
  //           });
  //         }
  //       });
  //     },
  //     reject: () => { },
  //   });
  // }

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default("l", "mm");
        autoTable(doc, { body: this.studentActivitiesList });
        doc.save('sap.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.studentActivitiesList);
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "sap");
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + EXCEL_EXTENSION);
  }
}
