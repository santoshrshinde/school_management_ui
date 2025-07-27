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
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.html',
  styleUrl: './add-student.sass'
})
export class AddStudent {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  private toastr: ToastrService = inject(ToastrService);
  student: any = {
    Name: '',
    DateOfBirth: '',
    Address: '',
  }
  studentId: number = 0;

  constructor() {
    this.route.params.subscribe(params => {
      this.studentId = params['id'];
      if (this.studentId) {
        this.loadStudentDetails(this.studentId);
      }
    });
  }

  loadStudentDetails(id: number) {
    this.commonService.getStudentById(id).subscribe({
      next: (data: any) => {
        console.log('Student details:', data);
        this.student = data;
        console.log('Loaded student:', this.student);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Failed to load student details', err);
        this.toastr.error('Failed to load student details', 'Error');
      }
    });
  }
  
  save() {
    console.log(this.student);
    if (this.studentId) {
      // Update existing student
      this.commonService.updateStudent(this.studentId, this.student).subscribe({
        next: (value) => {
          this.toastr.success('Student updated successfully', 'Success');
          this.router.navigateByUrl('/student');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to update student', 'Error');
        }
      });
    } else {
      // Create new student
      this.commonService.saveStudent(this.student).subscribe({
        next: (value) => {
          this.toastr.success('Student added successfully', 'Success');
          this.router.navigateByUrl('/student');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to add student', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/student');
  }
}
