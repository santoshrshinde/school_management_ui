import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentbus } from './list-studentbus/list-studentbus';
import { AddStudentbus } from './add-studentbus/add-studentbus';
import { Studentbus } from './studentbus';
const routes: Routes = [
    {
        path:'',
        component: Studentbus,
        children: [
          {
            path: 'list-studentbus',
            component: ListStudentbus
          },
          {
            path: 'add-studentbus',
            component: AddStudentbus
          },
          {
            path: 'edit-studentbus/:id',
            component: AddStudentbus
          },
          {
            path: '',
            redirectTo: 'list-studentbus',
            pathMatch: 'full'
          }
        ]
      }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentbusRoutingModule { }
