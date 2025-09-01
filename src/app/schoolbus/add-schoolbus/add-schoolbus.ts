import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { Common } from '../../serices/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { Schoolbus } from '../schoolbus'; 

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl| null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-add-schoolbus',
  standalone: false,
  templateUrl: './add-schoolbus.html',
  styleUrl: './add-schoolbus.sass'
})
export class AddSchoolbus {
 private commonService = inject(Common);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef
  private toastr: ToastrService = inject(ToastrService);
  schoolbus: any = {
    BusNumber: '',
    Driver: '',
     
  }
  schoolbusId: number = 0;

  constructor() {
    this.route.params.subscribe(params => {
      this.schoolbusId = params['id'];
      if (this.schoolbusId) {
        this.loadSchoolbusDetails(this.schoolbusId);
      }
    });
  }

  loadSchoolbusDetails(id: number) {
    this.commonService.getSchoolbusById(id).subscribe({
      next: (data: any) => {
        console.log('Schoolbus details:', data);
        this.schoolbus = data;
        console.log('Loaded Schoolbus:', this.schoolbus);
        this.cdr.detectChanges(); // Trigger change detection
      },
      error: (err) => {
        console.error('Failed to load schoolbus details', err);
        this.toastr.error('Failed to load schoolbus details', 'Error');
      }
    });
  }
  
  save() {
    console.log(this.schoolbus);
    if (this.schoolbusId) {
      // Update existing schoolbus
      this.commonService.updateSchoolbus(this.schoolbusId, this.schoolbus).subscribe({
        next: (value) => {
          this.toastr.success('Schoolbus updated successfully', 'Success');
          this.router.navigateByUrl('/schoolbus');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to update schoolbus', 'Error');
        }
      });
    } else {
      // Create new student
      this.commonService.saveSchoolbus(this.schoolbus).subscribe({
        next: (value) => {
          this.toastr.success('Schoolbus added successfully', 'Success');
          this.router.navigateByUrl('/schoolbus');
        },
        error: (err) => {
          console.log('Error', err);
          this.toastr.error('Failed to add schoolbus', 'Error');
        }
      });
    }
  }

  cancel() {
    this.router.navigateByUrl('/schoolbus');
  }
}
