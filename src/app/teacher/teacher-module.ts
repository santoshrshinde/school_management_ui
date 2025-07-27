import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TeacherRoutingModule } from './teacher-routing-module';
import { Teacher } from './teacher';
import { TeacherList } from './teacher-list/teacher-list';
import { TeacherAdd } from './teacher-add/teacher-add';


@NgModule({
  declarations: [
    Teacher,
    TeacherList,
    TeacherAdd
  ],
  imports: [
    CommonModule,
    TeacherRoutingModule
  ]
})
export class TeacherModule { }
