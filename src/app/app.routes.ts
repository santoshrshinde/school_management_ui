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
        path: '',
        redirectTo: '/student',
        pathMatch: 'full'
    },
    { path: '**', component: NotFound },
];
