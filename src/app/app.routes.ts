import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login').then(m => m.Login)
    },
    {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard)
    },
    {
        path: 'inventory',
        loadComponent: () => import('./pages/inventory/inventory').then(m => m.Inventory)
    },
    {
        path: 'user',
        loadComponent: () => import('./pages/user/user').then(m => m.UserComponent)
    },
    {
        path: 'producttype',
        loadComponent: () => import('./pages/producttype/producttype').then(m => m.Producttype)
    },
    {
      path: 'home',
      loadComponent: () => import('./pages/home/home').then(m => m.Home)
    },
    {
      path: 'idname',
      loadComponent: () => import('./pages/idname/idname').then(m => m.Idname)
    }

];
