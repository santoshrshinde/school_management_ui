import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';

import { StudentRoutingModule } from './student-routing-module';
import { Student } from './student';
import { AddStudent } from './add-student/add-student';
import { ListStudent } from './list-student/list-student';


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
    StudentRoutingModule
  ]
})
export class StudentModule { }
