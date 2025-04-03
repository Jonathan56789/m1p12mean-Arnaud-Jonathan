import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MecanicienServiceService } from '../../services/mecanicien/mecanicien-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import Swal from 'sweetalert2'

@Component({
  standalone: true,
  selector: 'app-login-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {

  // mecanicienService: MecanicienServiceService = inject(MecanicienServiceService);
  // router: Router = inject(Router)


  constructor(
    private mecanicienService: MecanicienServiceService,
    private authService:AuthService,
    private router: Router

  ){}


  applyForm: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mdp: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.applyForm.value.role == 'mecanicien') {
      this.authService.login(this.applyForm.value.email, this.applyForm.value.mdp, this.applyForm.value.role).subscribe(
        res => {
          // this.mecanicienService.saveToken(res.token);
          // this.router.navigate(['mecanicien/dashboard/accueil'])
          console.log("Afichage token");
          this.authService.saveToken(res.token);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['mecanicien/dashboard/accueil']);
          //console.log(res.token);
        },
      );
    }

    else if(this.applyForm.value.role == 'client'){
      this.authService.login(this.applyForm.value.email, this.applyForm.value.mdp,this.applyForm.value.role).subscribe(
        res => {
          console.log("Afichage token");
          this.authService.saveToken(res.token);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['dashboard-client']);
        },
        err => {
          // Affichage de l'erreur
        }
      );
    }
    else if(this.applyForm.value.role == 'manager'){
      this.authService.login(this.applyForm.value.email, this.applyForm.value.mdp,this.applyForm.value.role).subscribe(
        res => {
          console.log("Afichage token");
          this.authService.saveToken(res.token);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['manager/dashboard/accueil']);
        },
        err => {
          // Affichage de l'erreur
        }
      );
    }
  }
}
