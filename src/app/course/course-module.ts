import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';  // ✅ FIXED
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';


import { AddCourse } from './add-course/add-course';
import { ListCourse } from './list-course/list-course';
import { CourseRoutingModule } from './course-routing-module';
import { Course } from './course';

@NgModule({
  declarations: [
    AddCourse,
    ListCourse,
    Course
  ],
  imports: [
    CommonModule,


    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatCardModule,
    MatChipsModule,   // ✅ FIXED
    MatInputModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    CourseRoutingModule
  ]
})
export class CourseModule { }
