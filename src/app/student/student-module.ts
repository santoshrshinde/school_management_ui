import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { StudentRoutingModule } from './student-routing-module';
import { Student } from './student';
import { AddStudent } from './add-student/add-student';
import { ListStudent } from './list-student/list-student';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    Student,
    AddStudent,
    ListStudent
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
    StudentRoutingModule
  ]
})
export class StudentModule { }
