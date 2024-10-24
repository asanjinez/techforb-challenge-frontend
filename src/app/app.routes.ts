import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { noAuthGuard } from './core/guards/no-auth.guard';

export const routes: Routes = [
    { 
        path: 'home',
        pathMatch: 'full',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    { 
        path: 'login',
        canActivate: [noAuthGuard],
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)
    },
    {
        path: 'dashboard',
        canActivate: [authGuard],
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
];
