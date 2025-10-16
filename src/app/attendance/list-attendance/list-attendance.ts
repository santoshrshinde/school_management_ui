import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface Attendance {
  StudentName: string;
  Date: string;
  Status: string;
  Action?: string;
}

@Component({
  selector: 'app-list-attendance',
  standalone: false,
  templateUrl: './list-attendance.html',
  styleUrls: ['./list-attendance.sass'],
})
export class ListAttendance implements AfterViewInit {
  displayedColumns: string[] = ['StudentName', 'Date', 'Status', 'Action'];
  dataSource = new MatTableDataSource<Attendance>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Attendance>(true, []);
  attendances: Attendance[] = [];

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.getAttendances();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addAttendance() {
    this.router.navigateByUrl('attendance/add-attendance');
  }

  getAttendances() {
    this.commonService.getAttendance().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load attendance records:', err);
        this.toastr.error('Failed to load attendance records', 'Error');
      },
    });
  }

  delete(id: number) {
    this.commonService.deleteAttendance(id).subscribe({
      next: (response) => {
        this.toastr.success('Attendance deleted successfully', 'Success');
        this.getAttendances(); // Refresh list
      },
      error: (err) => {
        console.error('Failed to delete attendance:', err);
        this.toastr.error('Failed to delete attendance', 'Error');
      },
    });
  }

  edit(id: number) {
    this.router.navigate(['attendance/edit-attendance', id]);
  }

  announceSortChange(sortState: Event) {
    // Optional: implement live announcer for accessibility
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach((item) => {
      const index = this.attendances.findIndex((d) => d === item);
      this.dataSource.data.splice(index, 1);
      this.dataSource = new MatTableDataSource<Attendance>(this.attendances);
    });
    this.selection = new SelectionModel<Attendance>(true, []);
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row) => this.selection.select(row));
  }
}
