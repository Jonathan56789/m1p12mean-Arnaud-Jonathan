import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ReparationService } from '../../../services/reparation/reparation.service';
@Component({
  selector: 'app-vehicle-status',
  standalone:true,
  imports: [CommonModule,FormsModule, RouterModule,],
  templateUrl: './vehicle-status.component.html',
  styleUrl: './vehicle-status.component.css'
})
export class VehicleStatusComponent implements OnInit{
  repairs:any[]=[];
  constructor(private reparationService: ReparationService) {}

  ngOnInit() {
    // this.clientService.getVehicles().subscribe((data) => {
    //   this.repairs = data; // Simule le premier véhicule
    // });
    this.reparationService.getRepairs().subscribe(
      (data) => {
        this.repairs = data.reverse(); // Liste des réparations
      },
      (error) => {
        console.error('Erreur lors de la récupération des réparations:', error);
      }
    );
  }
}
