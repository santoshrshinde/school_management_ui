import { SelectionModel } from '@angular/cdk/collections';
import { Component, inject, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Common } from '../../serices/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Timetable {
  TimetableID: number;
  CourseName: string;
  Day: string;
  TimeSlot: string;
  Subject: string;
  TeacherName: string;
  Action?: string;
}

@Component({
  selector: 'app-list-timetable',
  standalone: false,
  templateUrl: './list-timetable.html',
  styleUrls: ['./list-timetable.sass']
})
export class ListTimetable {
  displayedColumns: string[] = ['No', 'CourseName', 'Day', 'TimeSlot', 'Subject', 'TeacherName', 'Action'];
  dataSource = new MatTableDataSource<Timetable>([]);
  selection = new SelectionModel<Timetable>(true, []);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.loadTimetables();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadTimetables() {
    this.commonService.getTimetable().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load timetables:', err);
        this.toastr.error('Failed to load timetables', 'Error');
      }
    });
  }

  addTimetable() {
    this.router.navigateByUrl('timetable/add-timetable');
  }

  edit(id: number) {
    this.router.navigate(['timetable/edit-timetable', id]);
  }

  delete(id: number) {
    if(confirm('Are you sure you want to delete this timetable record?')) {
      this.commonService.deleteTimetable(id).subscribe({
        next: () => {
          this.toastr.success('Timetable deleted successfully', 'Success');
          this.loadTimetables();
        },
        error: (err) => {
          console.error('Failed to delete timetable:', err);
          this.toastr.error('Failed to delete timetable', 'Error');
        }
      });
    }
  }

  /** Selection functions */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index = this.dataSource.data.findIndex(d => d === item);
      if(index >= 0) this.dataSource.data.splice(index, 1);
    });
    this.dataSource = new MatTableDataSource<Timetable>(this.dataSource.data);
    this.selection.clear();
  }

  /** Sorting announcer */
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
