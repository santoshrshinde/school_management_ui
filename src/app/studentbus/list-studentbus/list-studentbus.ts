import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Common } from '../../serices/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

export interface Studentbus {
  StudentBusID: number;
  StudentID: number;
  BusID: number;
  StudentName?: string;
  BusNumber?: string;
}

@Component({
  selector: 'app-list-studentbus',
  templateUrl: './list-studentbus.html',
  styleUrls: ['./list-studentbus.sass'],
  standalone: false
})
export class ListStudentbus implements AfterViewInit {

  displayedColumns: string[] = ['BusNumber', 'StudentName', 'Action'];
  dataSource = new MatTableDataSource<Studentbus>([]);
  selection = new SelectionModel<Studentbus>(true, []);
  studentbus: Studentbus[] = [];
  students: any[] = [];
  buses: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);
  private router = inject(Router);

  constructor() {
    this.loadStudentsAndBuses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // Load students and buses first, then map StudentBus list
  loadStudentsAndBuses() {
    this.commonService.getStudents().subscribe({
      next: (studentsData: any[]) => {
        this.students = studentsData;

        this.commonService.getSchoolbus().subscribe({
          next: (busesData: any[]) => {
            this.buses = busesData;
            this.loadStudentbus();
          },
          error: (err) => {
            console.error('Failed to load buses:', err);
            this.toastr.error('Failed to load buses', 'Error');
          }
        });
      },
      error: (err) => {
        console.error('Failed to load students:', err);
        this.toastr.error('Failed to load students', 'Error');
      }
    });
  }

  // Load all studentbus records
  loadStudentbus() {
    this.commonService.getStudentbus().subscribe({
      next: (data: Studentbus[]) => {
        this.studentbus = data.map(d => ({
          ...d,
          StudentName: this.students.find(s => s.StudentID === d.StudentID)?.Name || '',
          BusNumber: this.buses.find(b => b.BusID === d.BusID)?.BusNumber || ''
        }));

        this.dataSource.data = this.studentbus;

        if (this.paginator) this.dataSource.paginator = this.paginator;
        if (this.sort) this.dataSource.sort = this.sort;

        console.log('StudentBus Loaded:', this.studentbus);
      },
      error: (err) => {
        console.error('Failed to load studentbus:', err);
        this.toastr.error('Failed to load studentbus', 'Error');
      }
    });
  }

  // Navigation for Add/Edit
  addStudentbus() {
    this.router.navigateByUrl('/studentbus/add-studentbus');
  }

  edit(id: number) {
    this.router.navigate(['/studentbus/edit-studentbus', id]);
  }

  // Delete StudentBus
  delete(id: number) {
    if (!confirm('Are you sure you want to delete this record?')) return;

    this.commonService.deleteStudentbus(id).subscribe({
      next: () => {
        this.toastr.success('Deleted successfully', 'Success');
        this.loadStudentbus(); // refresh list
      },
      error: (err) => {
        console.error('Failed to delete studentbus:', err);
        this.toastr.error('Failed to delete studentbus', 'Error');
      }
    });
  }

  // Sorting announcement
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // Select all toggle
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  // Remove selected rows locally
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index = this.studentbus.findIndex(d => d === item);
      if (index >= 0) this.studentbus.splice(index, 1);
    });
    this.dataSource = new MatTableDataSource<Studentbus>(this.studentbus);
    this.selection = new SelectionModel<Studentbus>(true, []);
  }

}
