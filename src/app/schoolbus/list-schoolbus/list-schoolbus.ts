import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ViewChild, inject } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Common } from '../../serices/common';
import { ToastrService } from 'ngx-toastr';

export interface Schoolbus {
  BusID: number;   // ✅ IMPORTANT
  BusNumber: string;
  Driver: string;
}

@Component({
  selector: 'app-list-schoolbus',
  templateUrl: './list-schoolbus.html',
  styleUrls: ['./list-schoolbus.sass'],
  standalone: false
})
export class ListSchoolbus implements AfterViewInit {

  displayedColumns: string[] = ['BusNumber', 'Driver', 'Action'];
  dataSource = new MatTableDataSource<Schoolbus>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private commonService = inject(Common);
  private toastr = inject(ToastrService);
  private router = inject(Router);
  private _liveAnnouncer = inject(LiveAnnouncer);

  constructor() {
    this.getSchoolbus(); // ✅ SAME as student
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  // ✅ LOAD DATA (same as student)
  getSchoolbus() {
    this.commonService.getSchoolbus().subscribe({
      next: (data: any) => {
        console.log("Schoolbus API:", data); // 🔥 DEBUG
        this.dataSource.data = data;
      },
      error: () => {
        this.toastr.error('Failed to load schoolbus');
      }
    });
  }

  // ✅ ADD (same)
  addSchoolbus() {
    this.router.navigateByUrl('schoolbus/add-schoolbus');
  }

  // ✅ DELETE (same as student - WORKING)
  delete(id: number) {

    console.log("Delete ID:", id); // 🔥 DEBUG

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    if (confirm('Are you sure to delete?')) {
      this.commonService.deleteSchoolbus(id).subscribe({
        next: () => {
          this.toastr.success('Deleted successfully');
          this.getSchoolbus(); // 🔁 refresh
        },
        error: (err) => {
          console.error("DELETE ERROR:", err);
          this.toastr.error('Failed to delete schoolbus');
        }
      });
    }
  }

  // ✅ EDIT (same as student)
  edit(id: number) {

    console.log("Edit ID:", id);

    if (!id) {
      this.toastr.error('Invalid ID');
      return;
    }

    this.router.navigate(['schoolbus/edit-schoolbus', id]);
  }

  // ✅ SORT
  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}