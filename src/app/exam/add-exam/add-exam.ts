import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
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
  selector: 'app-add-exam',
  standalone: false,
  templateUrl: './add-exam.html',
  styleUrls: ['./add-exam.sass']
})
export class AddExam implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); 
  private toastr: ToastrService = inject(ToastrService);

  exam: any = {
    CourseID: '',
    Subject: '',
    ExamDate: '',
    TotalMarks: ''
  };

  courses: any[] = []; // Course list
  examId: number = 0;

  ngOnInit() {
    // Check if route has exam id (edit mode)
    this.route.params.subscribe(params => {
      this.examId = params['id'];
      if (this.examId) {
        this.loadExamDetails(this.examId);
      }
    });
    this.loadCourses();
  }

  // Load all courses for dropdown
  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any) => {
        this.courses = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load courses', err);
        this.toastr.error('Failed to load courses', 'Error');
      }
    });
  }

  // Load exam details for editing
  loadExamDetails(id: number) {
    this.commonService.getExamById(id).subscribe({
      next: (data: any) => {
        this.exam = {
          CourseID: data.CourseID,
          Subject: data.Subject,
          ExamDate: data.ExamDate,
          TotalMarks: data.TotalMarks
        };
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load exam details', err);
        this.toastr.error('Failed to load exam details', 'Error');
      }
    });
  }

 save() {
  // Convert ExamDate to YYYY-MM-DD before sending
  if (this.exam.ExamDate) {
    const date = new Date(this.exam.ExamDate);
    this.exam.ExamDate = date.toISOString().split('T')[0]; // "2025-10-28"
  }

  if (this.examId) {
    // Update existing exam
    this.commonService.updateExam(this.examId, this.exam).subscribe({
      next: () => {
        this.toastr.success('Exam updated successfully', 'Success');
        this.router.navigateByUrl('/exam/list-exam');
      },
      error: (err) => {
        console.error('Failed to update exam', err);
        this.toastr.error('Failed to update exam', 'Error');
      }
    });
  } else {
    // Add new exam
    this.commonService.saveExam(this.exam).subscribe({
      next: () => {
        this.toastr.success('Exam added successfully', 'Success');
        this.router.navigateByUrl('/exam/list-exam');
      },
      error: (err) => {
        console.error('Failed to add exam', err);
        this.toastr.error('Failed to add exam', 'Error');
      }
    });
  }
}


  cancel() {
    this.router.navigateByUrl('/exam/list-exam');
  }
}
