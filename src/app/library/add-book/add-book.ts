import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-book',
  standalone: false,
  templateUrl: './add-book.html',
  styleUrls: ['./add-book.sass']
})
export class AddBook {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  library: any = {
    BookName: '',
    Author: '',
    Publisher: '',
    TotalQuantity: 0,
    AvailableQuantity: 0
  };

  BookId: number = 0;

  constructor() {
    this.route.params.subscribe(params => {
      this.BookId = params['id'];
      if (this.BookId) {
        this.loadLibraryDetails(this.BookId);
      }
    });
  }

  loadLibraryDetails(id: number) {
    this.commonService.getBookById(id).subscribe({
      next: (data: any) => {
        this.library = data;
        this.cdr.detectChanges();
      },
      error: () => {
        this.toastr.error('Failed to load library details', 'Error');
      }
    });
  }

  save() {
    if (this.BookId) {
      this.commonService.updateLibrary(this.BookId, this.library).subscribe({
        next: () => {
          this.toastr.success('Library updated successfully', 'Success');
          this.router.navigateByUrl('/library');
        },
        error: () => {
          this.toastr.error('Failed to update library', 'Error');
        }
      });
    } else {
      this.commonService.saveBook(this.library).subscribe({
        next: () => {
          this.toastr.success('Book added successfully', 'Success');
          this.router.navigateByUrl('/library');
        },
        error: () => {
          this.toastr.error('Failed to add book', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/library');
  }
}
