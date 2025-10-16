import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Exam } from './exam';
import { ListExam } from './list-exam/list-exam';
import { AddExam } from './add-exam/add-exam';

const routes: Routes = [ {
      path:'',
      component: Exam,
      children: [
        {
          path: 'list-exam',
          component: ListExam
        },
        {
          path: 'add-exam',
          component: AddExam
        },
        {
          path: 'edit-exam/:id',
          component: AddExam
        },
        {
          path: '',
          redirectTo: 'list-exam',
          pathMatch: 'full'
        }
      ]
    }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExamRoutingModule { }
