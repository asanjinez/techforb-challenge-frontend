import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { AppLayoutComponent } from './layouts/app-layout/app-layout.component';
import { noAuthGuard } from './core/guards/no-auth.guard';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    { 
        path: 'home',
        canActivate: [noAuthGuard],
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'auth',
        canActivateChild: [noAuthGuard],
        component: AuthLayoutComponent,
        loadChildren: () => import('./pages/auth/auth.routes').then(m => m.AUTH_ROUTES)            
    },
    {
        path: 'dashboard',
        canActivateChild: [authGuard],
        component: AppLayoutComponent,
        loadChildren: () => import('./pages/dashboard/dashboard.routes').then(m => m.DASHBOARD_ROUTES)
    },
    {
        path: 'login',
        redirectTo: 'auth/login',
        pathMatch: 'full'
    },
    {
        path: 'register',
        redirectTo: 'auth/register',
        pathMatch: 'full'
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
];
