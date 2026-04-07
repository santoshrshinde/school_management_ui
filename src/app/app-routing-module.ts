import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';

const routes: Routes = [

  {
    path: 'users',
    loadChildren: () =>
      import('./users/users-module').then(m => m.UsersModule)
  },

  {
    path: 'student',
    loadChildren: () =>
      import('./student/student-module').then(m => m.StudentModule)
  },

  {
    path: 'teacher',
    loadChildren: () =>
      import('./teacher/teacher-module').then(m => m.TeacherModule)
  },

  {
    path: 'course',
    loadChildren: () =>
      import('./course/course-module').then(m => m.CourseModule)
  },

  {
    path: 'admission',
    loadChildren: () =>
      import('./admission/admission-module').then(m => m.AdmissionModule)
  },

  {
    path: 'schoolbus',
    loadChildren: () =>
      import('./schoolbus/schoolbus-module').then(m => m.SchoolbusModule)
  },

  {
    path: 'studentbus',
    loadChildren: () =>
      import('./studentbus/studentbus-module').then(m => m.StudentbusModule)
  },

  {
    path: 'fees',
    loadChildren: () =>
      import('./fees/fees-module').then(m => m.FeesModule)
  },

  {
    path: 'library',
    loadChildren: () =>
      import('./library/library-module').then(m => m.libraryModule)  // 🔥 FIXED
  },

  {
    path: 'timetable',
    loadChildren: () =>
      import('./timetable/timetable-module').then(m => m.TimetableModule)
  },

  {
    path: 'book-issue',
    loadChildren: () =>
      import('./book-issue/book-issue-module').then(m => m.BookIssueModule)
  },

  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance-module').then(m => m.AttendanceModule)
  },

  {
    path: 'exam',
    loadChildren: () =>
      import('./exam/exam-module').then(m => m.ExamModule)
  },

  {
    path: 'result',
    loadChildren: () =>
      import('./result/result-module').then(m => m.ResultModule)
  },

  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard-module').then(m => m.DashboardModule)
  },

  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },

  {
    path: '**',
    component: NotFound
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
