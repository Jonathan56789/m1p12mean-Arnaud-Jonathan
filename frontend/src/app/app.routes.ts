import { Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';
import { DashboardComponent } from './components/mecanicien/dashboard/dashboard.component';
import { AuthGard } from './guards/auth.guard';
import { DashboardClientComponent } from './components/client/dashboard-client/dashboard-client.component';
import { VehicleStatusComponent } from './components/client/vehicle-status/vehicle-status.component';
import { AppointmentsComponent } from './components/client/appointments/appointments.component';
import { HistoryComponent } from './components/client/history/history.component';
import { NotificationsComponent } from './components/client/notifications/notifications.component';
import { QuoteComponent } from './components/client/quote/quote.component';
import { OverviewComponent } from './components/client/overview/overview.component';
import { MyVehicleComponent } from './components/client/my-vehicle/my-vehicle.component';
import { ReparationComponent } from './components/mecanicien/dashboard/reparation/reparation.component';
import { AccueilComponent } from './components/mecanicien/dashboard/accueil/accueil.component';
import { ProfilComponent } from './components/mecanicien/dashboard/profil/profil.component';
import { DetailsComponent } from './components/mecanicien/dashboard/reparation/details/details.component';
import { DashboardManagerComponent } from './components/manager/dashboard-manager/dashboard-manager.component';
import { AccueilManagerComponent } from './components/manager/dashboard-manager/accueil-manager/accueil-manager.component';
import { RendezvousManagerComponent } from './components/manager/dashboard-manager/rendezvous-manager/rendezvous-manager.component';
import { ReparationManagerComponent } from './components/manager/dashboard-manager/reparation-manager/reparation-manager.component';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginViewComponent,
        title: "Log In"
    },
    {
        path: '',
        redirectTo: '/manager/dashboard/accueil',
        pathMatch: 'full'
    },
    {
        path: 'dashboard-client',
        component: DashboardClientComponent,
        canActivate: [AuthGard],
        title: "Dashboard-Client",
        children: [
            { path: '', redirectTo: 'overview', pathMatch: 'full' },
            { path: 'overview', component: OverviewComponent, title: 'apercu' },
            { path: 'vehicle', component: VehicleStatusComponent, title: 'État du véhicule' },
            { path: 'appointments', component: AppointmentsComponent, title: 'Rendez-vous' },
            { path: 'history', component: HistoryComponent, title: 'Historique' },
            { path: 'quotes', component: QuoteComponent, title: 'Demande de devis' },
            { path: 'notifications', component: NotificationsComponent, title: 'Notifications' },
            { path: 'my-vehicle', component: MyVehicleComponent, title: 'Mes Vehicules' },
        ]
    },
    {
        path: 'mecanicien/dashboard',
        component: DashboardComponent,
        canActivate: [AuthGard],
        title: "Dashboard - mécanicien",
        children: [
            {
                path: 'reparation',
                component: ReparationComponent,
                children: []
            },
            {
                path: 'accueil',
                component: AccueilComponent
            },
            {
                path: 'profil',
                component: ProfilComponent
            },
            {
                path: 'details/:id',
                component: DetailsComponent
            }
        ]
    },
    {
        path: 'manager/dashboard', 
        component: DashboardManagerComponent,
        title: 'Dasboard - Manager',
        children:[
            {
                path:'accueil', 
                component: AccueilManagerComponent
            }, 
            {
                path: 'rendezvous',
                component: RendezvousManagerComponent
            },
            {
                path: 'reparation', 
                component: ReparationManagerComponent
            }
        ]
    }
];