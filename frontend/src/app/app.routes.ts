import { Routes } from '@angular/router';
import { RendezvousComponent } from './components/rendezvous/rendezvous.component';

export const routes: Routes = [
    {
        path:'dashboard' , //http://localhost:5000/dashboard
        component: RendezvousComponent,
        title: "Dashboard"
    }, 
    {
        path:'' ,
        redirectTo: 'dashboard',  
        pathMatch: 'full'
    }
];
