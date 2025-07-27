import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Teacher } from './teacher';
import { TeacherList } from './teacher-list/teacher-list';
import { TeacherAdd } from './teacher-add/teacher-add';

const routes: Routes = [
   {
      path:'',
      component: Teacher,
      children: [
        {
          path: 'teacher-list',
          component: TeacherList
        },
        {
          path: 'add-teacher',
          component: TeacherAdd
        },
        {
          path: 'edit-teacher/:id',
          component: TeacherAdd
        },
        {
          path: '',
          redirectTo: 'teacher-list',
          pathMatch: 'full'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
