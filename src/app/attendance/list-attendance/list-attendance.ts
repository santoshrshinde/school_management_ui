import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';
import { SelectionModel } from '@angular/cdk/collections';

export interface Attendance {
  AttendanceID: number;
  StudentName: string;
  CourseName: string;
  Date: string;
  Status: string;
}

@Component({
  selector: 'app-list-attendance',
  standalone: false,
  templateUrl: './list-attendance.html',
  styleUrls: ['./list-attendance.sass']
})
export class ListAttendance implements AfterViewInit {

  displayedColumns: string[] = ['StudentName', 'CourseName', 'Date', 'Status', 'Action'];
  dataSource = new MatTableDataSource<Attendance>([]);
  attendances: Attendance[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  courses: any[] = [];
  selectedCourseId: number | null = null;

  private commonService = inject(Common);
  private toastr: ToastrService = inject(ToastrService);
  private announcer = inject(LiveAnnouncer);

  constructor(private router: Router) {
    this.loadCourses();
    this.getAttendance();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addAttendance() {
    this.router.navigateByUrl('attendance/add-attendance');
  }

  // Load all attendance
  getAttendance() {
    this.commonService.getAttendance().subscribe({
      next: (res: any) => {
        this.attendances = res;
        this.dataSource.data = res;
      },
      error: (err: any) => {
        console.error("Failed to load attendance:", err);
        this.toastr.error("Failed to load attendance");
      }
    });
  }

  // Load all courses
  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (res: any) => {
        this.courses = res;
      },
      error: (err: any) => {
        console.error("Failed to load courses:", err);
        this.toastr.error("Failed to load courses");
      }
    });
  }

  // Filter attendance by course
  filterByCourse() {
    if (this.selectedCourseId) {
      this.commonService.getAttendanceByCourse(this.selectedCourseId).subscribe({
        next: (data: any) => {
          this.dataSource.data = data;
        },
        error: (err: any) => {
          console.error("Failed to load filtered attendance:", err);
        }
      });
    } else {
      this.getAttendance();
    }
  }

  edit(id: number) {
    this.router.navigate(['attendance/edit-attendance', id]);
  }


  // Delete Attendance
  deleteAttendance(id: number) {
    if (confirm("Are you sure you want to delete attendance?")) {
      this.commonService.deleteAttendance(id).subscribe({
        next: () => {
          this.toastr.success("Attendance deleted");
          this.getAttendance();
        },
        error: (err: any) => {
          console.error("Failed to delete:", err);
          this.toastr.error("Failed to delete attendance");
        }
      });
    }
  }
}
