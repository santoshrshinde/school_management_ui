import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Common } from '../../serices/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-attendance',
  standalone: false,
  templateUrl: './add-attendance.html',
  styleUrls: ['./add-attendance.sass']
})
export class AddAttendance {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); 
  private toastr: ToastrService = inject(ToastrService);

  attendance: any = {
    StudentID: '',
    Date: '',
    Status: ''
  }

  students: any[] = []; // Student list
  attendanceId: number = 0;

  constructor() {
    this.route.params.subscribe(params => {
      this.attendanceId = params['id'];
      if (this.attendanceId) {
        this.loadAttendanceDetails(this.attendanceId);
      }
    });
  }

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.commonService.getStudent().subscribe({
      next: (data: any) => {
        this.students = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load students', err);
        this.toastr.error('Failed to load students', 'Error');
      }
    });
  }

  loadAttendanceDetails(id: number) {
    this.commonService.getAttendanceById(id).subscribe({
      next: (data: any) => {
        this.attendance = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load attendance details', err);
        this.toastr.error('Failed to load attendance details', 'Error');
      }
    });
  }

  save() {
    console.log(this.attendance);
    if (this.attendanceId) {
      // Update existing attendance
      this.commonService.updateAttendance(this.attendanceId, this.attendance).subscribe({
        next: () => {
          this.toastr.success('Attendance updated successfully', 'Success');
          this.router.navigateByUrl('/attendance/list-attendance');
        },
        error: (err) => {
          console.error('Failed to update attendance', err);
          this.toastr.error('Failed to update attendance', 'Error');
        }
      });
    } else {
      // Create new attendance
      this.commonService.saveAttendance(this.attendance).subscribe({
        next: () => {
          this.toastr.success('Attendance added successfully', 'Success');
          this.router.navigateByUrl('/attendance/list-attendance');
        },
        error: (err) => {
          console.error('Failed to add attendance', err);
          this.toastr.error('Failed to add attendance', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/attendance/list-attendance');
  }
}
