import { Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardComponent } from './components/mecanicien/dashboard/dashboard.component';
import { AuthGard } from './guards/auth.guard';
import path from 'path';
import { ReparationComponent } from './components/mecanicien/dashboard/reparation/reparation.component';
import { AccueilComponent } from './components/mecanicien/dashboard/accueil/accueil.component';
import { ProfilComponent } from './components/mecanicien/dashboard/profil/profil.component';

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
        canActivate: [AuthGard], 
        title: "Dashboard - mécanicien" , 
        children:[
            {
                path: 'reparation', 
                component: ReparationComponent
            }, 
            {
                path:'accueil', 
                component: AccueilComponent
            }, 
            {
                path: 'profil', 
                component: ProfilComponent
            }
        ]
    }
];
