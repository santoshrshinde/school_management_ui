import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';

@Component({
  selector: 'app-list-student',
  standalone: false,
  templateUrl: './list-student.html',
  styleUrl: './list-student.sass',
  // imports: [MatTableModule, MatPaginatorModule],
})
export class ListStudent implements AfterViewInit{
  displayedColumns: string[] = ['Name', 'DateOfBirth', 'Address'];
  dataSource = new MatTableDataSource<Student>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  
  
  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  constructor(private router: Router) {
    this.getStudents();
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  addStudent() {
    this.router.navigateByUrl('student/add-student');
  }

  getStudents() {
    this.commonService.getStudent().subscribe({
      next: (data: any) => {
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Failed to load students:', err);
      }
    });
  }
  /** Announce the change in sort state for assistive technology. */
  announceSortChange(sortState: Event) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    /* if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    } */
  }
}

export interface Student {
  Name: string;
  Address: string;
  DateOfBirth: string;
}
