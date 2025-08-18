import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Course } from '../course';   // ✅ correct path


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-course',
  standalone: false,
  templateUrl: './add-course.html',
  styleUrls: ['./add-course.sass']   // ✅ fix
})
export class AddCourse {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); 
  private toastr: ToastrService = inject(ToastrService);

  Course: Course = {   // ✅ rename + correct type
    CourseName: '',
    CourseID: 0
  };

  constructor() {
    this.route.params.subscribe(params => {
      this.Course.CourseID = params['id'];
      if (this.Course.CourseID) {
        this.loadCourseDetails(this.Course.CourseID);
      }
    });
  }

  loadCourseDetails(id: number) {
    this.commonService.getCourseById(id).subscribe({
      next: (data: any) => {
        this.Course = data;   // ✅ assign poora object
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.toastr.error('Failed to load Course details', 'Error');
      }
    });
  }
  
  save() {
    if (this.Course.CourseID) {
      // Update
      this.commonService.updateCourse(this.Course.CourseID, this.Course).subscribe({
        next: () => {
          this.toastr.success('Course updated successfully', 'Success');
          this.router.navigateByUrl('/course');
        },
        error: () => this.toastr.error('Failed to update Course', 'Error')
      });
    } else {
      // Create
      this.commonService.saveCourse(this.Course).subscribe({
        next: () => {
          this.toastr.success('Course added successfully', 'Success');
          this.router.navigateByUrl('/course');
        },
        error: () => this.toastr.error('Failed to add Course', 'Error')
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/course');
  }
}
