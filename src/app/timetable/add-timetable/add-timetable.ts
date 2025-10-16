import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-timetable',
  standalone: false,
  templateUrl: './add-timetable.html',
  styleUrls: ['./add-timetable.sass']
})
export class AddTimetable implements OnInit {
  private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);
  private toastr: ToastrService = inject(ToastrService);

  timetable: any = {
    CourseID: null,
    TeacherID: null,
    Day: '',
    TimeSlot: '',
    Subject: ''
  };

  courses: any[] = [];  // Courses list
  teachers: any[] = []; // Teachers list
  timetableID: number = 0;

  ngOnInit() {
    this.loadCourses();
    this.loadTeachers();

    this.route.params.subscribe((params: any) => {
      this.timetableID = +params['id'] || 0;
      if (this.timetableID) {
        this.loadTimetableDetails(this.timetableID);
      }
    });
  }

  loadCourses() {
    this.commonService.getCourse().subscribe({
      next: (data: any) => {
        this.courses = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load courses', err);
      }
    });
  }

  loadTeachers() {
    this.commonService.getTeacher().subscribe({
      next: (data: any) => {
        this.teachers = data;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load teachers', err);
      }
    });
  }

  loadTimetableDetails(id: number) {
    this.commonService.getTimetableById(id).subscribe({
      next: (data: any) => {
        // Ensure IDs are numbers for proper dropdown selection
        this.timetable = {
          ...data,
          CourseID: Number(data.CourseID),
          TeacherID: Number(data.TeacherID)
        };
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Failed to load timetable details', err);
        this.toastr.error('Failed to load timetable details', 'Error');
      }
    });
  }

  save() {
    // Convert IDs to number before saving
    this.timetable.CourseID = Number(this.timetable.CourseID);
    this.timetable.TeacherID = Number(this.timetable.TeacherID);

    if (this.timetableID) {
      this.commonService.updateTimetable(this.timetableID, this.timetable).subscribe({
        next: () => {
          this.toastr.success('Timetable updated successfully', 'Success');
          this.router.navigateByUrl('/timetable/list-timetable');
        },
        error: (err: any) => {
          console.error('Error updating timetable', err);
          this.toastr.error('Failed to update timetable', 'Error');
        }
      });
    } else {
      this.commonService.saveTimetable(this.timetable).subscribe({
        next: () => {
          this.toastr.success('Timetable added successfully', 'Success');
          this.router.navigateByUrl('/timetable/list-timetable');
        },
        error: (err: any) => {
          console.error('Error adding timetable', err);
          this.toastr.error('Failed to add timetable', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/timetable/list-timetable');
  }
}
