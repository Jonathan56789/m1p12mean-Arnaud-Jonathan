import { Component } from '@angular/core';
import { MecanicienServiceService } from '../../../../services/mecanicien/mecanicien-service.service';
import { ReparationService } from '../../../../services/reparation/reparation.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';



@Component({
  standalone: true,
  selector: 'app-reparation',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './reparation.component.html',
  styleUrl: './reparation.component.css'
})
export class ReparationComponent {

  meca: any;
  repairs: any[] = [];
  completedRepairs: any[] = [];
  ongoingRepairs: any[] = [];
  plannedRepairs: any[] = [];
  todayDate: string = new Date().toISOString().split('T')[0];


  constructor(private mecanicienService: MecanicienServiceService, private reparationService: ReparationService) {
    this.mecanicienService.user$.subscribe(user => {
      this.meca = user
    });
  }

  // Récupération des données de réparation lors du chargement du composant
  ngOnInit() {
    this.loadRepairs();
  }
  loadRepairs() {
    if (!this.meca || !this.meca.id) {
      console.error("L'ID du mécanicien n'est pas disponible.");
      return;
    }

    this.reparationService.getRepairsByMechanics(this.meca.id).subscribe(
      (data) => {
        this.repairs = data;
        // console.log(this.repairs)

        this.completedRepairs = this.repairs.filter(rep => rep.status === "Terminé")
        this.ongoingRepairs = this.repairs.filter(rep => rep.status === "En cours")
        this.plannedRepairs = this.repairs.filter(rep => rep.status === "En attente")
      },
      (error) => {
        console.error('Erreur lors de la récupération des réparations:', error);
      }
    );
  }

  //Fonctionnalité Démarrer un réparation 
  formRepair: FormGroup = new FormGroup({
    id: new FormControl(''),
    status: new FormControl(''),
    progression: new FormControl(null),
    endDate: new FormControl(null)
  })

  // Nouvelle fonction pour gérer les valeurs avant soumission
  setFormValuesAndSubmit(id: string, status: string, progression?: number, endDate?: string) {
    // Mettre à jour les valeurs dynamiquement
    this.formRepair.patchValue({ id: id, status: status, progression: progression, endDate: endDate || null });

    console.log("Ici" + this.formRepair.value.id)

    // Envoyer la mise à jour
    this.updateRepair();
  }


  updateRepair() {
    const repairId = this.formRepair.value.id;
    if (!repairId) {
      console.error("L'ID de la réparation est manquant !");
      return;
    }

    // Construire l'objet de mise à jour
    let updatedData: any = { status: this.formRepair.value.status };

    // Ajouter `endDate` seulement s'il est défini
    if (this.formRepair.value.endDate) {
      updatedData.endDate = this.formRepair.value.endDate;
    }
    if(this.formRepair.value.progression){
      updatedData.progression = this.formRepair.value.progression;
    }

    // Envoyer la requête API
    this.reparationService.updateRepair(repairId, updatedData).subscribe(
      response => {
        console.log('Réparation mise à jour avec succès', response);
        this.formRepair.reset();
        this.loadRepairs();
      },
      error => {
        console.error('Erreur lors de la mise à jour de la réparation', error);
      }
    );
  }



}
