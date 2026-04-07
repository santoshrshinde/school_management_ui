import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.html',
  styleUrls: ['./add-book.sass'],
  standalone:false
})
export class AddBook implements OnInit {

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

  ngOnInit() {

    this.route.params.subscribe(params => {

      this.BookId = Number(params['BookId']) || 0; // ✅ FIX

      console.log("Edit Book ID:", this.BookId);

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
        this.toastr.error('Failed to load book details', 'Error');
      }

    });

  }

  save() {

    if (this.BookId) {

      this.commonService.updateLibrary(this.BookId, this.library).subscribe({

        next: () => {
          this.toastr.success('Book updated successfully', 'Success');
          this.router.navigateByUrl('/library/list-books'); // ✅ FIX
        },

        error: () => {
          this.toastr.error('Failed to update book', 'Error');
        }

      });

    } else {

      this.commonService.saveBook(this.library).subscribe({

        next: () => {
          this.toastr.success('Book added successfully', 'Success');
          this.router.navigateByUrl('/library/list-books'); // ✅ FIX
        },

        error: () => {
          this.toastr.error('Failed to add book', 'Error');
        }

      });

    }

  }

  cancel() {
    this.router.navigateByUrl('/library/list-books'); // ✅ FIX
  }

}