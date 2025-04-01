import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MecanicienServiceService } from '../../services/mecanicien-service.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
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
    role: new FormControl(''),
    email: new FormControl(''),
    mdp: new FormControl('')
  })

  login() {
    if (this.applyForm.value.role == 'mechanic') {
      this.mecanicienService.login(this.applyForm.value.email, this.applyForm.value.mdp).subscribe(
        res => {
          this.mecanicienService.saveToken(res.token);
          this.router.navigate(['dashboard'])
        },
        err => {
          // Affichage de l'erreur
        }
      );
      // console.log("Mécanicien")
    }
    else if(this.applyForm.value.role == 'client'){
      this.authService.login(this.applyForm.value.email, this.applyForm.value.mdp).subscribe(
        res => {
          console.log("eeeeeeeeeeeeeee");
          this.authService.saveToken(res.token);
          console.log(localStorage.getItem('token'));
          this.router.navigate(['dashboard-client']);
          console.log(res.token);
        },
        err => {
          // Affichage de l'erreur
        }
      //   {
      //     next: (response) => {
      //         this.authService.saveToken(response.token);
      //         this.router.navigate(['dashboard-client']);
      //     },
      //     error: (err) => {}
      // }
      );
    }
  }
}
