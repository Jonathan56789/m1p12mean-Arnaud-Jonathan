import { Component } from '@angular/core';
import { ReparationService } from '../../../../services/reparation/reparation.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-reparation-manager',
  imports: [CommonModule, RouterModule],
  templateUrl: './reparation-manager.component.html',
  styleUrl: './reparation-manager.component.css'
})
export class ReparationManagerComponent {

  //Liste des réparations
  repairs: any[] = [];
  completedRepairs: any[] = [];
  ongoingRepairs: any[] = [];
  plannedRepairs: any[] = [];

  // Liste des mécaniciens

  mecanicien: any[] = [];

  constructor(private reparationService: ReparationService) { }

  ngOnInit() {
    this.loadRepairs();
  }
  loadRepairs() {
    this.reparationService.getAllRepairs().subscribe(
      (data) => {
        this.repairs = data;

        this.completedRepairs = this.repairs.filter(rep => rep.status === "Terminé")
        this.ongoingRepairs = this.repairs.filter(rep => rep.status === "En cours")
        this.plannedRepairs = this.repairs.filter(rep => rep.status === "En attente")

        console.log(this.completedRepairs, this.ongoingRepairs, this.plannedRepairs)
      },
      (error) => {
        console.error('Erreur lors de la récupération des réparations:', error);
      }
    )
  }
}
