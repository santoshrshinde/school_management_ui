import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCourse } from './list-course/list-course';
import { AddCourse } from './add-course/add-course';
import { Course } from './course';

const routes: Routes = [
  {
    path:'',
    component: Course,
    children: [
      {
        path: 'list-course',
        component: ListCourse
      },
      {
        path: 'add-course',
        component: AddCourse
      },
      {
        path: 'edit-course/:id',
        component: AddCourse
      },
      {
        path: '',
        redirectTo: 'list-course',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CourseRoutingModule { }
