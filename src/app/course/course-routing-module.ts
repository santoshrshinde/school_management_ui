import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListCourse } from './list-course/list-course';
import { AddCourse } from './add-course/add-course';

const routes: Routes = [
  {
    path:'',
    
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
export class CourseRoutingModule { }
