import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MecanicienServiceService } from '../../../services/mecanicien/mecanicien-service.service';

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [RouterModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any;

  constructor(private mecanicienService: MecanicienServiceService) {
    this.mecanicienService.user$.subscribe(user => {
      this.user = user;
    });
  }
}
