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
        canActivateChild: [],
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
        path: 'dash',
        loadComponent: () => import('./dash/dash.component').then(m => m.DashComponent)
    },
    {
        path: 'monitoreo',
        loadComponent: () => import('./modules/components/monitoreo/monitoreo.component').then(m => m.MonitoreoComponent)   
    },
    {
        path: 'plantas',
        loadComponent: () => import('./modules/components/plantas/plantas.component').then(m => m.PlantasComponent)
    },
    {
        path: 'parametros',
        loadComponent: () => import('./modules/components/parametros/parametros.component').then(m => m.ParametrosComponent)
    },
    {
        path: '**',
        loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent)
    },
];
