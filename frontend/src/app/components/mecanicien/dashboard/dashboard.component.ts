import { Component, inject, OnInit } from '@angular/core';
import { MecanicienServiceService } from '../../../services/mecanicien-service.service';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  user: any;

  mecanicienService: MecanicienServiceService= inject(MecanicienServiceService)

  ngOnInit(): void{
    this.user= this.mecanicienService.getUser();
  }
}
