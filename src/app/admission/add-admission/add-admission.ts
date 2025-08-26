import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { Common } from '../../serices/common';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { ToastrService } from 'ngx-toastr';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = !!(form && form.submitted);
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-admission',
  standalone: false,
  templateUrl: './add-admission.html',
  styleUrls: ['./add-admission.sass']
})
export class AddAdmission {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  admission: any = {
    StudentID: '',
    CourseID: '',
    AdmissionDate: '',
    Status: ''
  };

  admissionId = 0;
  students: any[] = [];
  courses: any[] = [];

  constructor() {
    this.route.params.subscribe(params => {
      this.admissionId = +params['id'] || 0;
      this.loadStudents();
      this.loadCourses();
      if (this.admissionId) this.loadAdmissionDetails(this.admissionId);
    });
  }

  loadStudents() {
    // 🔁 Service ke actual method name ke hisaab se (aapke Common service me getStudent() hai)
    this.commonService.getStudent().subscribe({
      next: (data: any) => {
        this.students = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load students', err);
        this.toastr.error('Failed to load students', 'Error');
      }
    });
  }

  loadCourses() {
    // 🔁 Service me getCourse() hai
    this.commonService.getCourse().subscribe({
      next: (data: any) => {
        this.courses = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load courses', err);
        this.toastr.error('Failed to load courses', 'Error');
      }
    });
  }

  loadAdmissionDetails(id: number) {
    this.commonService.getAdmissionById(id).subscribe({
      next: (data: any) => {
        this.admission = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load admission details', err);
        this.toastr.error('Failed to load admission details', 'Error');
      }
    });
  }

  save() {
    if (this.admissionId) {
      this.commonService.updateAdmission(this.admissionId, this.admission).subscribe({
        next: () => {
          this.toastr.success('Admission updated successfully', 'Success');
          this.router.navigateByUrl('/admission');
        },
        error: (err: any) => {
          console.error('Error updating admission', err);
          this.toastr.error('Failed to update admission', 'Error');
        }
      });
    } else {
      this.commonService.saveAdmission(this.admission).subscribe({
        next: () => {
          this.toastr.success('Admission added successfully', 'Success');
          this.router.navigateByUrl('/admission');
        },
        error: (err: any) => {
          console.error('Error adding admission', err);
          this.toastr.error('Failed to add admission', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/admission');
  }
}
