import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import * as FileSaver from 'file-saver';
import autoTable from 'jspdf-autotable'
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-marks',
  templateUrl: './show-marks.component.html',
  styleUrls: ['./show-marks.component.scss']
})
export class ShowMarksComponent implements OnInit {
  activitesList: [];

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      if (query['department']) {
        this.adminService.getActivityByDepartment(query['department']).subscribe((res) => {
          if (res.length > 0) {
            this.activitesList = res;
          }
        })
      }

    })

  }

  exportPdf() {
    import("jspdf").then(jsPDF => {
      import("jspdf-autotable").then(x => {
        const doc = new jsPDF.default("l", "mm");
        autoTable(doc, { body: this.activitesList });
        doc.save('sap.pdf');
      })
    })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.activitesList);
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
