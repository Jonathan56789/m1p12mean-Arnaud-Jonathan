import { Component } from '@angular/core';
import { ReparationService } from '../../../../services/reparation/reparation.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user/user.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-reparation-manager',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
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
  filterForm: FormGroup = new FormGroup({

  })
  mecanicien: any[] = [];

  // Tableau pour stocker les rendez-vous filtrés (par exemple, pour la tab "En attente de confirmation")
  searchedRepair: any[] = [];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(private reparationService: ReparationService, private userService: UserService) { }

  ngOnInit() {
    this.filterForm = new FormGroup({
      mecanicienId: new FormControl('all') // Valeur par défaut "Tous"
    });
    this.loadRepairs();
    this.loadMechanics();
    this.filterForm.get('mecanicienId')?.valueChanges.subscribe(value => {
      this.loadRepairs(); // Recharge les réparations filtrées
    });

    this.searchForm.get('search')?.valueChanges.subscribe(
      (value: string) => {
        const term = value ? value.toLowerCase().trim() : '';
        if (term.length > 0) {
          this.searchedRepair = this.repairs.filter(
            repair => repair.details.toLowerCase().includes(term) || repair.vehicleId.nameVehicle.toLowerCase().includes(term)
          );
          console.log(this.searchedRepair)
        }
        else{
          this.searchedRepair = []; 
        }
      }
    )
  }
  loadRepairs() {
    this.reparationService.getAllRepairs().subscribe(
      (data) => {
        const selectedMecanicien = this.filterForm.get('mecanicienId')?.value;

        if (selectedMecanicien === 'all') {
          this.repairs = data; // Affiche toutes les réparations
        } else {
          this.repairs = data.filter(rep => rep.mecanicienId._id === selectedMecanicien);
        }

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

  loadMechanics() {
    this.userService.getAllMechanics().subscribe(
      (data) => {
        this.mecanicien = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des réparations:', error);
      }
    )
  }

}
