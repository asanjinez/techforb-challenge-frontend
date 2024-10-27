import { Routes } from "@angular/router";

export const DASHBOARD_ROUTES: Routes = [
    { path: '', loadComponent: () => import('../../pages/dashboard/dashboard.component').then(m => m.DashboardComponent) },
    { path: 'monitoreo', loadComponent: () => import('../../modules/components/monitoreo/monitoreo.component').then(m => m.MonitoreoComponent) },
    { path: 'plantas', loadComponent: () => import('../../modules/components/plantas/plantas.component').then(m => m.PlantasComponent) },
    { path: 'parametros', loadComponent: () => import('../../modules/components/parametros/parametros.component').then(m => m.ParametrosComponent) }
];