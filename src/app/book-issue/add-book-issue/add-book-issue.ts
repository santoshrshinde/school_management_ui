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

  // ✅ FIXED OBJECT
  bookIssue: any = {
    StudentID: '',
    BookIDs: [],   // 🔥 FIX
    IssueDate: '',
    ReturnDate: '',
    Status: 'Issued'
  };

  issueId = 0;
  students: any[] = [];
  books: any[] = [];

  ngOnInit() {
    this.route.params.subscribe(params => {

      this.issueId = Number(params['id']) || 0;

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
      error: () => {
        this.toastr.error('Failed to load students');
      }
    });
  }

  loadBooks() {
    this.commonService.getBooks().subscribe({
      next: (data: any) => {
        this.books = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastr.error('Failed to load books');
      }
    });
  }

  loadBookIssueDetails(id: number) {
    this.commonService.getBookIssueById(id).subscribe({
      next: (data: any) => {
        this.bookIssue = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastr.error('Failed to load book issue');
      }
    });
  }

  // ✅ DATE FORMAT FIX
  formatDate(date: string): string {
    if (!date) return '';

    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();

    return `${day}-${month}-${year}`;
  }

  // ✅ SAVE METHOD FIXED
  save() {

    const payload = {
      StudentID: this.bookIssue.StudentID,
      BookIDs: this.bookIssue.BookIDs,

      IssueDate: this.formatDate(this.bookIssue.IssueDate),
      ReturnDate: this.formatDate(this.bookIssue.ReturnDate),

      Status: this.bookIssue.Status
    };

    if (this.issueId) {

      this.commonService.updateBookIssue(this.issueId, payload).subscribe({
        next: () => {
          this.toastr.success('Book issue updated successfully');
          this.commonService.triggerDashboardRefresh();
          this.router.navigateByUrl('book-issue/list-book-issue');
        },
        error: () => {
          this.toastr.error('Failed to update book issue');
        }
      });

    } else {

      this.commonService.saveBookIssue(payload).subscribe({
        next: () => {
          this.toastr.success('Book issued successfully');
          this.commonService.triggerDashboardRefresh();
          this.router.navigateByUrl('book-issue/list-book-issue');
        },
        error: (err) => {
          console.error(err);
          this.toastr.error('Failed to issue book');
        }
      });

    }
  }

  cancel() {
    this.router.navigateByUrl('book-issue/book-issue');
  }

  edit(issueId: number) {
    this.router.navigate(['book-issue/edit-book-issue', issueId]);
  }
}