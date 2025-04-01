import { Component } from '@angular/core';
import { MecanicienServiceService } from '../../../../services/mecanicien/mecanicien-service.service';
import { ReparationService } from '../../../../services/reparation/reparation.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-accueil',
  imports: [CommonModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  user: any;
  repair: any[] = [];
  ongoingRepair: any[] = [];
  todayRepair: any[] = [];
  todayDate: string = new Date().toISOString().split('T')[0];


  constructor(private mecanicienService: MecanicienServiceService, private repairService: ReparationService) {
    this.mecanicienService.user$.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {
    this.loadRepair();
  }

  loadRepair() {
    if (!this.user.id) {
      console.log(this.user.id)
      console.error("L'id du mécanicien n'est pas disponible");
      return;
    }

    this.repairService.getRepairsByMechanics(this.user.id).subscribe(
      (data) => {
        this.repair = data;
        console.log(this.repair)

        this.ongoingRepair = this.repair.filter(rep => rep.status == "En cours");
        this.todayRepair = this.repair.filter(rep => {
          const repairDate = new Date(rep.startDate).toISOString().split('T')[0]; 
          return repairDate === this.todayDate && rep.status === 'En attente';
        });
        console.log(this.todayDate)
        console.log("On going repair:", this.ongoingRepair)
        console.log("Today's repair:", this.todayRepair)

      },
      (error) => {
        console.error("Erreur lors du chargemet des données", error)
      }
    );
  }
}
