import { Component, OnInit } from '@angular/core';
import { AdminService } from '../admin.service';
import * as FileSaver from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable'
import { ActivatedRoute } from '@angular/router';
import autoTable from 'jspdf-autotable';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-show-marks',
  templateUrl: './show-marks.component.html',
  styleUrls: ['./show-marks.component.scss']
})
export class ShowMarksComponent implements OnInit {
  department: string;
  columnDefs: any = [
    { headerName: 'Name', field: 'name', filter: true },
    { headerName: 'Roll No.', field: 'roll_no', filter: true },
    {
      headerName: 'Year', field: 'year', filter: 'agNumberColumnFilter',
      filterParams: {
        allowedCharPattern: '\\d\\-\\,',
        numberParser: text => {
          return text == null ? null : parseFloat(text.replace(',', '.'));
        }
      }
    },
    {
      headerName: 'Uploaded At', field: 'uploadedAt', cellRenderer: (data) => {
        return data.value ? (new Date(data.value)).toLocaleDateString() : '';
      }, filter: 'agDateColumnFilter',
      filterParams: {
        comparator: (filterLocalDateAtMidnight, cellValue) => {
          const dateAsString = cellValue;

          if (dateAsString == null) {
            return 0;
          }

          const dateParts = dateAsString.split('/');
          const year = Number(dateParts[2]);
          const month = Number(dateParts[1]) - 1;
          const day = Number(dateParts[0]);
          const cellDate = new Date(year, month, day);

          if (cellDate < filterLocalDateAtMidnight) {
            return -1;
          } else if (cellDate > filterLocalDateAtMidnight) {
            return 1;
          }
          return 0;
        }
      }
    },
    { headerName: 'Event', field: 'event', filter: true },
    {
      headerName: 'Mark', field: 'mark', filter: 'agNumberColumnFilter',
      filterParams: {
        allowedCharPattern: '\\d\\-\\,',
        numberParser: text => {
          return text == null ? null : parseFloat(text.replace(',', '.'));
        }
      }
    },
    { headerName: 'Verified By Admin', field: 'is_locked', filter: true },
    { headerName: 'Activity', field: 'activity', filter: true },
  ];
  rowData$: Observable<any[]>;
  defaultCol = { filter: true, sortable: true, }
  gridOptions: any;
  columnApi: any;
  private gridApi: any;

  constructor(private adminService: AdminService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe((query) => {
      if (query['department']) {
        this.department = query['department']
        this.rowData$ = this.adminService.getActivityByDepartment(query['department'])
      }
    })

  }

  onGridReady(params: any) {
    this.gridApi = params.api
    this.columnApi = params.columnApi
  }

  exportPdf(type: string) {
    const pdf = new jsPDF();
    const filteredData = this.gridApi.selectAllFiltered();
    const getRows = this.gridApi.getSelectedRows();

    let columns = [];
    let rows = [];
    let filteredRows = [];
    let updatedFilterArr = []

    this.columnApi.getAllColumns().forEach((column) => {
      columns.push(column.getColDef().headerName)
    })

    this.gridApi.forEachNode(node => {
      let arr = [];
      columns.forEach(col => {
        let colName = col.toLowerCase();
        let data = (node.data[colName]);        
        if (typeof data !== 'string') {
          data = String(data)
        }
        arr.push(data)
      })
      rows.push(arr);
    })

    getRows.forEach((ele) => {
      let arr = [];
      columns.forEach(col => {
        let colName = col.toLowerCase();
        arr.push(String(ele[colName]))
      })
      filteredRows.push(arr);
    })

    if (type === 'All') {

      autoTable(pdf, {
        head: [columns],
        body: rows
      })

      pdf.save(this.department + '_table.pdf')
    } else if (type === 'Filter') {

      autoTable(pdf, {
        head: [columns],
        body: filteredRows
      })

      pdf.save(this.department + '_filtered_table.pdf')
    }
  }
}
