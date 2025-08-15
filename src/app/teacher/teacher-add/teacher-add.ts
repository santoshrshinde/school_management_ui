import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-teacher-add',
  standalone: false,
  templateUrl: './teacher-add.html',
  styleUrl: './teacher-add.sass'
})
export class TeacherAdd {
   private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  private toastr: ToastrService = inject(ToastrService);
  teacher: any = {
    Name: '',
    Subject: '',
    Contact: ''
  }
  teacherID: number = 0;

  constructor() {
    this.route.params.subscribe((params: any) => {
      this.teacherID = params['id'];
      if (this.teacherID) {
        this.loadStudentDetails(this.teacherID);
      }
    });
  }

  loadStudentDetails(id: number) {
    this.commonService.getTeacherById(id).subscribe({
      next: (data: any) => {
        console.log('Teacher details:', data);
        this.teacher = data;
        console.log('Loaded teacher:', this.teacher);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err: any) => {
        console.error('Failed to load teacher details', err);
        this.toastr.error('Failed to load teacher details', 'Error');
      }
    });
  }
  
  save() {
    console.log(this.teacher);
    if (this.teacherID) {
      // Update existing teacher
      this.commonService.updateStudent(this.teacherID, this.teacher).subscribe({
        next: (value: any) => {
          this.toastr.success('Teacher updated successfully', 'Success');
          this.router.navigateByUrl('/teacher');
        },
        error: (err: any) => {
          console.log('Error', err);
          this.toastr.error('Failed to update teacher', 'Error');
        }
      });
    } else {
      // Create new teacher
      this.commonService.saveTeacher(this.teacher).subscribe({
        next: (value: any) => {
          this.toastr.success('Teacher added successfully', 'Success');
          this.router.navigateByUrl('/teacher');
        },
        error: (err: any) => {
          console.log('Error', err);
          this.toastr.error('Failed to add teacher', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/teacher');
  }

}
