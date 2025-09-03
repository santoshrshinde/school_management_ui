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
  selector: 'app-add-studentbus',
  standalone: false,
  templateUrl: './add-studentbus.html',
  styleUrls: ['./add-studentbus.sass']
})
export class AddStudentbus {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  // ✅ Proper student-bus object as per table
  studentbus: any = {
    StudentBusID: 0,
    StudentID: '',
    BusID: ''
  };

  constructor() {
    this.route.params.subscribe(params => {
      const id = params['id'];
      if (id) {
        this.studentbus.StudentBusID = +id;
        this.loadStudentbusDetails(this.studentbus.StudentBusID);
      }
    });
  }

  loadStudentbusDetails(id: number) {
    this.commonService.getStudentbusById(id).subscribe({
      next: (data: any) => {
        console.log('Studentbus details:', data);
        this.studentbus = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load studentbus details', err);
        this.toastr.error('Failed to load studentbus details', 'Error');
      }
    });
  }

  save() {
    if (this.studentbus.StudentBusID) {
      // ✅ Update existing
      this.commonService.updateStudentbus(this.studentbus.StudentBusID, this.studentbus).subscribe({
        next: () => {
          this.toastr.success('Studentbus updated successfully', 'Success');
          this.router.navigateByUrl('/studentbus');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to update studentbus', 'Error');
        }
      });
    } else {
      // ✅ Create new
      this.commonService.saveStudentbus(this.studentbus).subscribe({
        next: () => {
          this.toastr.success('Studentbus added successfully', 'Success');
          this.router.navigateByUrl('/studentbus');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to add studentbus', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/studentbus');
  }
}
