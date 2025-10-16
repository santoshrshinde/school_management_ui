import { Component, inject, ChangeDetectorRef, OnInit } from '@angular/core';
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
  selector: 'app-add-book-issue',
  standalone: false,
  templateUrl: './add-book-issue.html',
  styleUrls: ['./add-book-issue.sass']
})
export class AddBookIssue implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  bookIssue: any = {
    StudentID: '',
    BookID: '',
    IssueDate: '',
    ReturnDate: '',
    Status: ''
  };

  issueId = 0;
  students: any[] = [];
  books: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.issueId = +params['id'] || 0;
      this.loadStudents();
      this.loadBooks();
      if (this.issueId) {
        this.loadBookIssueDetails(this.issueId);
      }
    });
  }

  loadStudents() {
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

  loadBooks() {
    this.commonService.getBooks().subscribe({
      next: (data: any) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load books', err);
        this.toastr.error('Failed to load books', 'Error');
      }
    });
  }

  loadBookIssueDetails(id: number) {
    this.commonService.getBookIssueById(id).subscribe({
      next: (data: any) => {
        this.bookIssue = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load book issue details', err);
        this.toastr.error('Failed to load book issue details', 'Error');
      }
    });
  }

  save() {
    if (this.issueId) {
      this.commonService.updateBookIssue(this.issueId, this.bookIssue).subscribe({
        next: () => {
          this.toastr.success('Book issue updated successfully', 'Success');
          this.router.navigateByUrl('book-issue/book-issue');
        },
        error: (err: any) => {
          console.error('Error updating book issue', err);
          this.toastr.error('Failed to update book issue', 'Error');
        }
      });
    } else {
      this.commonService.saveBookIssue(this.bookIssue).subscribe({
        next: () => {
          this.toastr.success('Book issued successfully', 'Success');
          this.router.navigateByUrl('book-issue/book-issue');
        },
        error: (err: any) => {
          console.error('Error issuing book', err);
          this.toastr.error('Failed to issue book', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('book-issue/book-issue');
  }
}
