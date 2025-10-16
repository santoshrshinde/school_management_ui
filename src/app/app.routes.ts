import { Routes } from '@angular/router';
import { NotFound } from './not-found/not-found';

export const routes: Routes = [

    {
        path: 'users',
        loadChildren: () => import('./users/users-module').then((mod) => mod.UsersModule)
    },
    {
        path: 'student',
        loadChildren: () => import('./student/student-module').then((mod) => mod.StudentModule)
    },
    {
        path: 'teacher',
        loadChildren: () => import('./teacher/teacher-module').then((mod) => mod.TeacherModule)
    },
    {
        path: 'course',
        loadChildren: () => import('./course/course-module').then((mod) => mod.CourseModule)
    },
    {
        path: 'admission',
        loadChildren: () => import('./admission/admission-module').then((mod) => mod.AdmissionModule)
    },
    {
        path: 'schoolbus',
        loadChildren: () => import('./schoolbus/schoolbus-module').then((mod) => mod.SchoolbusModule)
    },
    {
        path: 'studentbus',
        loadChildren: () => import('./studentbus/studentbus-module').then((mod) => mod.StudentbusModule)
    }, 
    {
        path: 'fees',
        loadChildren: () => import('./fees/fees-module').then(m => m.FeesModule)
    },
    {
        path: 'library',
        loadChildren: () => import('./library/library-module').then(m => m.libraryModule)
    },
    {
        path: 'timetable',
        loadChildren: () => import('./timetable/timetable-module').then((mod) => mod.TimetableModule)
    },
    {
        path: 'book-issue',
        loadChildren: () => import('./book-issue/book-issue-module').then(m => m.BookIssueModule)
    },
   {
        path: 'attendance',
        loadChildren: () => import('./attendance/attendance-module').then((mod) => mod.AttendanceModule)
    },
     {
        path: 'exam',
        loadChildren: () => import('./exam/exam-module').then((mod) => mod.ExamModule)
    },
     {
        path: 'result',
        loadChildren: () => import('./result/result-module').then((mod) => mod.ResultModule)
    },


    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    { path: '**', component: NotFound },
];
