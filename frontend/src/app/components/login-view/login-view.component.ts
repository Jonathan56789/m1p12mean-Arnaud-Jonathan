import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MecanicienServiceService } from '../../services/mecanicien-service.service';

@Component({
  selector: 'app-login-view',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-view.component.html',
  styleUrl: './login-view.component.css'
})
export class LoginViewComponent {

  mecanicienService: MecanicienServiceService = inject(MecanicienServiceService);

  applyForm: FormGroup = new FormGroup({
    role: new FormControl(''),
    email: new FormControl(''),
    mdp: new FormControl('')
  })

  loginMethod() {
    if (this.applyForm.value.role == "mechanic") {
      console.log("mécanicien")
    }
    else {
      console.log("Autre")
    }
  }
}
