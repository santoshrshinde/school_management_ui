import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-book',
  templateUrl: './list-book.html',
  styleUrls: ['./list-book.sass'],
  standalone:false
})
export class ListBook implements OnInit {
  displayedColumns: string[] = ['BookName', 'Author', 'Publisher', 'TotalQuantity', 'AvailableQuantity', 'Action'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private commonSerice: Common,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBooks();
  }

loadBooks() {
  this.commonSerice.getAllBooks().subscribe({
    next: (data: any) => {

      console.log("API DATA:", data); // 🔥 IMPORTANT

      this.dataSource.data = data;

      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  });
}
  addBook() {
    this.router.navigateByUrl('/library/add-book');
  }

edit(BookId: number) {

  console.log("Edit Book ID:", BookId); // 👈 check this

  if (!BookId) {
    this.toastr.error('Invalid ID');
    return;
  }

  this.router.navigate(['/library/edit-book', BookId]);
}

delete(BookID: number) {

  console.log("DELETE ID:", BookID); // 🔥 CHECK THIS

  if (!BookID) {
    this.toastr.error('Invalid ID');
    return;
  }

  this.commonSerice.deleteBook(BookID).subscribe({
    next: () => {
      this.toastr.success('Book deleted successfully');
      this.loadBooks();
    },
    error: (err) => {
      console.error(err); // 🔥 CHECK ERROR
      this.toastr.error('Failed to delete book');
    }
  });
}

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      console.log(`Sorted ${sortState.active} ${sortState.direction}`);
    } else {
      console.log('Sorting cleared');
    }
  }
}
