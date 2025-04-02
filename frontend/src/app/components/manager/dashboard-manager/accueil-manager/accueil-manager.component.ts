import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReparationService } from '../../../../services/reparation/reparation.service';

@Component({
  standalone: true,
  selector: 'app-accueil-manager',
  imports: [CommonModule, RouterModule],
  templateUrl: './accueil-manager.component.html',
  styleUrl: './accueil-manager.component.css'
})
export class AccueilManagerComponent {
  repairs: any[] = [];
  completedRepairs: any[] = [];
  ongoingRepairs: any[] = [];
  plannedRepairs: any[] = [];

  //Nombre de véhicule au garage
  nbrCarEnCours : Number = 0; 
  nbrCarTermine : Number = 0;


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
        this.plannedRepairs = this.repairs.filter(rep => rep.status === "En attente"); 

        //Nombre de voiture en cours/ terminé/ en attente
        this.nbrCarEnCours = this.ongoingRepairs.length;
        this.nbrCarTermine = this.plannedRepairs.length;

        // console.log(this.completedRepairs, this.ongoingRepairs, this.plannedRepairs)
      },
      (error) => {
        console.error('Erreur lors de la récupération des réparations:', error);
      }
    )
  }
}
