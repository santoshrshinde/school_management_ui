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
  selector: 'app-add-result',
  standalone: false,
  templateUrl: './add-result.html',
  styleUrls: ['./add-result.sass']
})
export class AddResult implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); 
  private toastr: ToastrService = inject(ToastrService);

  result: any = {
    StudentID: '',
    ExamID: '',
    MarksObtained: '',
    Grade: ''
  };

  resultId: number = 0;
  students: any[] = [];
  exams: any[] = [];

  ngOnInit() {
    // Load all students and exams on init
    this.loadStudent();
    this.loadExams();

    // Check if editing an existing result
    this.route.params.subscribe(params => {
      this.resultId = params['id'];
      if (this.resultId) {
        this.loadResultDetails(this.resultId);
      }
    });
  }

  // Load students
  loadStudent() {
    this.commonService.getStudents().subscribe({
      next: (data: any) => {
        this.students = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load students', err);
        this.toastr.error('Failed to load student list', 'Error');
      }
    });
  }

  // Load exams
  loadExams() {
    this.commonService.getExam().subscribe({
      next: (data: any) => {
        this.exams = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load exams', err);
        this.toastr.error('Failed to load exam list', 'Error');
      }
    });
  }

  // Load existing result for edit
  loadResultDetails(id: number) {
    this.commonService.getResultById(id).subscribe({
      next: (data: any) => {
        this.result = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load result details', err);
        this.toastr.error('Failed to load result details', 'Error');
      }
    });
  }

  // Save or update result
  save() {
    if (this.resultId) {
      // Update existing result
      this.commonService.updateResult(this.resultId, this.result).subscribe({
        next: () => {
          this.toastr.success('Result updated successfully', 'Success');
          this.router.navigateByUrl('/result/list-result');
        },
        error: (err) => {
          console.error('Failed to update result', err);
          this.toastr.error('Failed to update result', 'Error');
        }
      });
    } else {
      // Add new result
      this.commonService.saveResult(this.result).subscribe({
        next: () => {
          this.toastr.success('Result added successfully', 'Success');
          this.router.navigateByUrl('/result/list-result');
        },
        error: (err) => {
          console.error('Failed to add result', err);
          this.toastr.error('Failed to add result', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/result/list-result');
  }
}
