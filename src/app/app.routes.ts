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
        path:'course',
        loadChildren: () => import('./course/course-module').then((mod) => mod.CourseModule)
    },
    {
        path: '',
        redirectTo: '/student',
        pathMatch: 'full'
    },
    { path: '**', component: NotFound },
];
