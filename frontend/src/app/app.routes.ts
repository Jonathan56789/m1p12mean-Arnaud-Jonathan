import { Routes } from '@angular/router';
import { LoginViewComponent } from './components/login-view/login-view.component';

export const routes: Routes = [
    {
        path:'', 
        component: LoginViewComponent,
        title: "Log In"
    }
];
