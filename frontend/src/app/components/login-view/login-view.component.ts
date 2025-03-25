import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validator, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MecanicienServiceService } from '../../services/mecanicien-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-login-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {

  // mecanicienService: MecanicienServiceService = inject(MecanicienServiceService);
  // router: Router = inject(Router)

  constructor(private mecanicienService: MecanicienServiceService, private router: Router) { }

  applyForm: FormGroup = new FormGroup({
    role: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    mdp: new FormControl('', [Validators.required, Validators.minLength(6)])
  })

  login() {
    if (this.applyForm.value.role == 'mechanic') {
      this.mecanicienService.login(this.applyForm.value.email, this.applyForm.value.mdp).subscribe(
        res => {
          this.mecanicienService.saveToken(res.token);
          this.router.navigate(['dashboard/accueil'])
        },
      );
      // 
    }


  }
}
