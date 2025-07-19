import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Student } from './student';
import { ListStudent } from './list-student/list-student';
import { AddStudent } from './add-student/add-student';

const routes: Routes = [
  {
    path:'',
    component: Student,
    children: [
      {
        path: 'student-list',
        component: ListStudent
      },
      {
        path: 'add-student',
        component: AddStudent
      },
      {
        path: '',
        redirectTo: 'student-list',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
