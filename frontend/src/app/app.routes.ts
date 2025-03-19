import { Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardComponent } from './components/mecanicien/dashboard/dashboard.component';
import { AuthGard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path:'login', 
        component: LoginViewComponent,
        title: "Log In"
    }, 
    {
        path:'', 
        redirectTo: '/login',
        pathMatch: 'full'
    }, 
    {
        path:'dashboard', 
        component: DashboardComponent, 
        // canActivate: [AuthGard], 
        title: "Dashboard - mécanicien"
    }
];
