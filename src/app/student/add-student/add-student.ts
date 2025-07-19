import { Component, inject } from '@angular/core';
import { Common } from '../../serices/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.html',
  styleUrl: './add-student.sass'
})
export class AddStudent {
  private commonService = inject(Common);
  private router = inject(Router);
  student: any = {
    Name: '',
    DateOfBirth: '',
    Address: '',
  }

  save() {
    console.log(this.student);
    this.commonService.saveStudent(this.student).subscribe({
      next: (value) => {
        console.log('value', value);
        this.router.navigateByUrl('/student');
        
      },
      error(err) {
        console.log('Error', err);
      }
    });
  }
}
