import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ReparationService } from '../../../../../services/reparation/reparation.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-details',
  imports:[CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  repairId: string | null = null;
  repair: any;

  private route: ActivatedRoute = inject(ActivatedRoute);
  private reparationService: ReparationService = inject(ReparationService)

  constructor() {

  }

  ngOnInit() {
    this.repairId = this.route.snapshot.paramMap.get('id');

    if (this.repairId) {
      this.reparationService.getRepairById(this.repairId).subscribe(
        (data) => this.repair = data,
        (error) => console.error('Erreur lors de la récupération', error)
      );
    }
  }

  formRepair: FormGroup = new FormGroup({
    progression: new FormControl(0)
  })

  updateRepair(){
    const updatedData: any = { progression: this.formRepair.value.progression };
    // Envoyer la requête API
    this.reparationService.updateRepair(this.repairId!, updatedData).subscribe(
      response => {
        console.log('Réparation mise à jour avec succès', response);
        this.formRepair.reset();
      },
      error => {
        console.error('Erreur lors de la mise à jour de la réparation', error);
      }
    );

  }
}
