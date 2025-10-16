import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Attendance } from './attendance';
import { ListAttendance } from './list-attendance/list-attendance';
import { AddAttendance } from './add-attendance/add-attendance';

const routes: Routes = [
  {
      path:'',
      component: Attendance,
      children: [
        {
          path: 'list-attendance',
          component: ListAttendance
        },
        {
          path: 'add-attendance',
          component: AddAttendance
        },
        {
          path: 'edit-attendance/:id',
          component: AddAttendance
        },
        {
          path: '',
          redirectTo: 'list-Attendance',
          pathMatch: 'full'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttendanceRoutingModule { }
