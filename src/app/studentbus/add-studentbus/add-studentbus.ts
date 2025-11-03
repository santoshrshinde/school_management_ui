import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-studentbus',
  templateUrl: './add-studentbus.html',
  styleUrls: ['./add-studentbus.sass'],
  standalone: false
})
export class AddStudentbus implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  studentbus: any = {
    StudentBusID: 0,
    StudentID: '',
    BusID: ''
  };

  buses: any[] = [];      // Bus dropdown list
  students: any[] = [];   // Student dropdown list
  studentbusId: number = 0;

  ngOnInit() {
    // Load dropdowns
    this.loadSchoolbus();
    this.loadStudents();

    // Check for edit
    this.route.params.subscribe(params => {
      this.studentbusId = params['id'];
      if (this.studentbusId) {
        this.loadStudentbusDetails(this.studentbusId);
      }
    });
  }

  // Load all buses
  loadSchoolbus() {
    this.commonService.getSchoolbus().subscribe({
      next: (data: any[]) => {
        this.buses = data;
        console.log('Buses loaded:', data);
      },
      error: (err) => console.error('Failed to load buses', err)
    });
  }

  // Load all students
  loadStudents() {
    this.commonService.getStudents().subscribe({
      next: (data: any[]) => {
        this.students = data;
        console.log('Students loaded:', data);
      },
      error: (err) => console.error('Failed to load students', err)
    });
  }

  // Load studentbus details for edit
  loadStudentbusDetails(id: number) {
    this.commonService.getStudentbusById(id).subscribe({
      next: (data: any) => {
        this.studentbus = data;
        this.cdr.detectChanges(); // Update UI
        console.log('Loaded studentbus:', data);
      },
      error: (err) => {
        console.error('Failed to load studentbus details', err);
        this.toastr.error('Failed to load studentbus details', 'Error');
      }
    });
  }

  // Save or update studentbus
  save() {
    if (this.studentbusId) {
      // Update existing
      this.commonService.updateStudentbus(this.studentbusId, this.studentbus).subscribe({
        next: () => {
          this.toastr.success('Studentbus updated successfully', 'Success');
          this.router.navigateByUrl('/studentbus');
        },
        error: (err) => {
          console.error('Error updating studentbus', err);
          this.toastr.error('Failed to update studentbus', 'Error');
        }
      });
    } else {
      // Add new
      this.commonService.saveStudentbus(this.studentbus).subscribe({
        next: () => {
          this.toastr.success('Studentbus added successfully', 'Success');
          this.router.navigateByUrl('/studentbus');
        },
        error: (err) => {
          console.error('Error adding studentbus', err);
          this.toastr.error('Failed to add studentbus', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/studentbus');
  }
}
