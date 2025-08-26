import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';

export interface Admission {
  AdmissionID: number;
  StudentID: number;
  CourseID: number;
  AdmissionDate: string; // 'yyyy-MM-dd' from API
  Status: string;
}

@Component({
  selector: 'app-list-admission',
  standalone: false,
  templateUrl: './list-admission.html',
  styleUrls: ['./list-admission.sass'],
})
export class ListAdmission implements AfterViewInit {
  // 👇 MUST match matColumnDef in HTML
  displayedColumns: string[] = ['No', 'StudentID', 'CourseID', 'AdmissionDate', 'Action'];

  dataSource = new MatTableDataSource<Admission>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Admission>(true, []);
  admissions: Admission[] = [];

  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);

  constructor(private router: Router) {
    this.loadAdmission();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addAdmission() {
    this.router.navigateByUrl('/admission/add-admission');
  }

  loadAdmission() {
    this.commonService.getAdmission().subscribe({
      next: (data:any) => {
        this.admissions = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err: any) => {
        console.error('Failed to load admissions:', err);
        this.toastr.error('Failed to load admissions', 'Error');
      }
    });
  }

  delete(id: number) {
    console.log('ID', id);
    this.commonService.deleteAdmission(id).subscribe({
      next: (response) => {
        console.log('Delete Response', response);
        this.toastr.success('Admission deleted successfully', 'Success');
        this.loadAdmission(); // refresh
      },
      error: (err: any) => {
        console.error('Failed to delete admission:', err);
        this.toastr.error('Failed to delete admission', 'Error');
      }
    });
  }

  edit(id: number) {
    this.router.navigate(['/admission/edit-admission', id]);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
    this.selection.selected.forEach(item => {
      const index = this.admissions.findIndex(d => d.AdmissionID === item.AdmissionID);
      if (index > -1) this.admissions.splice(index, 1);
    });
    this.dataSource.data = [...this.admissions];
    this.selection.clear();
  }

  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
