import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
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
  Status: string;
}

@Component({
  selector: 'app-list-admission',
  standalone:false,
  templateUrl: './list-admission.html',
  styleUrls: ['./list-admission.sass']
})
export class ListAdmission implements AfterViewInit {
  displayedColumns: string[] = ['No', 'StudentName', 'CourseName', 'AdmissionDate', 'Action'];
  dataSource = new MatTableDataSource<Admission>([]);
  admissions: Admission[] = [];
  courses: any[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.loadAdmission();
    this.loadCourses();
  }

  loadAdmission() {
    this.commonService.getAdmission().subscribe({
      next: (data: Admission[]) => {
        this.admissions = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load admissions', 'Error');
      }
    });
  }

  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any[]) => {
        this.courses = data;
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to load courses', 'Error');
      }
    });
  }

  onCourseChange(event: MatSelectChange) {
    const courseName = event.value;
    if (courseName === 'all') {
      this.dataSource.data = this.admissions;
    } else {
      this.dataSource.data = this.admissions.filter(a => a.CourseName === courseName);
    }
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }

  addAdmission() {
    this.router.navigateByUrl('/admission/add-admission');
  }

  edit(id: number) {
    this.router.navigate(['/admission/edit-admission', id]);
  }

  delete(id: number) {
    this.commonService.deleteAdmission(id).subscribe({
      next: () => {
        this.toastr.success('Admission deleted successfully', 'Success');
        this.loadAdmission();
      },
      error: (err) => {
        console.error(err);
        this.toastr.error('Failed to delete admission', 'Error');
      }
    });
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
