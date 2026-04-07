import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';
import { MatSelectChange } from '@angular/material/select';

export interface Admission {
  AdmissionID: number;
  StudentName: string;
  CourseName: string;
  AdmissionDate: string;
}

@Component({
  selector: 'app-list-admission',
  templateUrl: './list-admission.html',
  styleUrls: ['./list-admission.sass'],
  standalone: false
})
export class ListAdmission implements AfterViewInit {

  displayedColumns: string[] = ['No','StudentName','CourseName','AdmissionDate','Action'];
  dataSource = new MatTableDataSource<Admission>([]);

  admissions: Admission[] = [];
  courses: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() {
    this.loadAdmission();
    this.loadCourses();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ LOAD
  loadAdmission() {
    this.commonService.getAdmission().subscribe({
      next: (data: any) => {

        console.log("🔥 API DATA:", data);

        this.dataSource.data = data;
        this.admissions = data;
      },
      error: () => {
        this.toastr.error('Failed to load admission');
      }
    });
  }

  // ✅ COURSES
  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any) => {
        this.courses = data;
      }
    });
  }

  // ✅ FILTER
  onCourseChange(event: MatSelectChange) {
    const value = event.value;

    if (value === 'all') {
      this.dataSource.data = this.admissions;
    } else {
      this.dataSource.data =
        this.admissions.filter(a => a.CourseName === value);
    }
  }

  // ✅ ADD
  addAdmission() {
    this.router.navigateByUrl('/admission/add-admission');
  }

  // ✅ EDIT
  edit(id: number) {

    console.log("Edit ID:", id);

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    this.router.navigate(['admission/edit-admission', id]);
  }

  // ✅ DELETE
  delete(id: number) {

    console.log("Delete ID:", id);

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    if (confirm('Are you sure?')) {
      this.commonService.deleteAdmission(id).subscribe({
        next: () => {
          this.toastr.success('Deleted successfully');
          this.loadAdmission();
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Delete failed');
        }
      });
    }
  }

  // ✅ SORT
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}