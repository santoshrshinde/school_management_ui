import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { SelectionModel } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Common } from '../../serices/common';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// ✅ Studentbus Interface (with join fields also)
export interface Studentbus {
  StudentBusID: number;
  StudentID: number;
  BusID: number;
  StudentName?: string;   // from join
  BusNumber?: string;     // from join
}

@Component({
  selector: 'app-list-studentbus',
  standalone: false,
  templateUrl: './list-studentbus.html',
  styleUrls: ['./list-studentbus.sass']
})
export class ListStudentbus implements AfterViewInit {
  // ✅ Show StudentName and BusNumber instead of IDs
  displayedColumns: string[] = ['BusNumber', 'StudentName', 'Action'];

  dataSource = new MatTableDataSource<Studentbus>([]);
  selection = new SelectionModel<Studentbus>(true, []);
  studentbus: Studentbus[] = [];   

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.loadStudentbus();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ Navigate to Add StudentBus
  addStudentbus() {
    this.router.navigateByUrl('studentbus/add-studentbus');
  }

  // ✅ API Call to fetch studentbus records
  loadStudentbus() {
    this.commonService.getStudentbus().subscribe({
      next: (data:any) => {
        this.studentbus = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error('Failed to load Studentbus:', err);
        this.toastr.error('Failed to load Studentbus', 'Error');
      }
    });
  }

  // ✅ Delete API
  delete(id: number) {
    this.commonService.deleteStudentbus(id).subscribe({
      next: (response) => {
        this.toastr.success('Studentbus deleted successfully', 'Success');
        this.loadStudentbus(); // refresh list
      },
      error: (err: any) => {
        console.error('Failed to delete Studentbus:', err);
        this.toastr.error('Failed to delete Studentbus', 'Error');
      }
    });
  }

  // ✅ Edit Navigation
  edit(id: number) {
    this.router.navigate(['/studentbus/edit-studentbus', id]);
  }

  // ✅ Announce sort change for screen readers
  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  // ✅ Select all toggle
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach((row: Studentbus) => this.selection.select(row));
  }

  // ✅ Remove selected rows (frontend only)
  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      let index: number = this.studentbus.findIndex(d => d.StudentBusID === item.StudentBusID);
      if (index >= 0) {
        this.dataSource.data.splice(index, 1);
      }
    });
    this.dataSource = new MatTableDataSource<Studentbus>(this.studentbus);
    this.selection = new SelectionModel<Studentbus>(true, []);
  }
}
