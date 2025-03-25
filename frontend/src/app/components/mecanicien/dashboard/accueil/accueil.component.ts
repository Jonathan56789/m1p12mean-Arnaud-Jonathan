import { Component } from '@angular/core';
import { MecanicienServiceService } from '../../../../services/mecanicien-service.service';

@Component({
  selector: 'app-accueil',
  imports: [],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  user: any;

  constructor(private mecanicienService: MecanicienServiceService) {
    this.mecanicienService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
