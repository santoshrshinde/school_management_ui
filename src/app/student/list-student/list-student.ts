import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { SelectionModel } from '@angular/cdk/collections';
import { ToastrService } from 'ngx-toastr';



export interface Student {
  Name: string;
  Address: string;
  DateOfBirth: string;
  Action?: string;
}



@Component({
  selector: 'app-list-student',
  standalone: false,
  templateUrl: './list-student.html',
  styleUrl: './list-student.sass',
  // imports: [MatTableModule, MatPaginatorModule],
})
export class ListStudent implements AfterViewInit{
  displayedColumns: string[] = [ 'Name', 'DateOfBirth', 'Address', 'Action'];
  dataSource = new MatTableDataSource<Student>([]);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  selection = new SelectionModel<Element>(true, []);
  students : Student[] = [];
  
  
  private commonService = inject(Common);
  private _liveAnnouncer = inject(LiveAnnouncer);
  private toastr: ToastrService = inject(ToastrService);
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
        this.toastr.error('Failed to load students', 'Error');
      }
    });
  }

  delete(id: number) {
    console.log('ID', id);
    this.commonService.deleteStudent(id).subscribe({
      next: (response) => {
        console.log('Delete Response', response);
        this.toastr.success('Student deleted successfully', 'Success');
        this.getStudents(); // Refresh the student list
      },
      error: (err) => {
        console.error('Failed to delete student:', err);
        this.toastr.error('Failed to delete student', 'Error');
      }
    });
  }

  edit(id: number) {
    console.log('ID', id);
    this.router.navigate(['student/edit-student', id]);
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



  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  removeSelectedRows() {
     this.selection.selected.forEach(item => {
      let index: number = this.students.findIndex((d : any)=> d === item);
      console.log(this.students.findIndex((d : any)=> d === item));
      this.dataSource.data.splice(index,1);

      this.dataSource = new MatTableDataSource<Student>(this.students);
    });
    this.selection = new SelectionModel<Element>(true, []);
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach((row: any) => this.selection.select(row));
  }
}


