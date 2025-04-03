import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client.service';
import { VehicleService } from '../../../services/vehicle/vehicle.service';

@Component({
  selector: 'app-my-vehicle',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './my-vehicle.component.html',
  styleUrl: './my-vehicle.component.css'
})
export class MyVehicleComponent {
  vehicles: any[] = [];
  showAddForm: boolean = false;
  licensePlate: string = '';
  nameVehicle: string='ze';
  marqueVehicle:string='ze';

  constructor(private vehicleService: VehicleService,private clientService: ClientService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.vehicleService.getMyVehicles().subscribe(
      (data) => {
        this.vehicles = data.vehicles;
      },
      (err) => {
        console.error('Erreur lors de la récupération des véhicules', err);
        alert('Erreur lors de la récupération des véhicules');
      }
    );
  }

  addVehicle() {
    if (!this.licensePlate) {
      alert('Veuillez entrer une plaque d’immatriculation');
      return;
    }

    this.vehicleService.createVehicle(
      { licensePlate: this.licensePlate ,nameVehicle: this.nameVehicle,marqueVehicle:this.marqueVehicle}).subscribe(
      (res) => {
        alert('Véhicule ajouté avec succès');
        this.licensePlate = '';
        this.showAddForm = false;
        this.loadVehicles(); // Rafraîchir la liste
      },
      (err) => {
        console.error('Erreur lors de ajout du véhicule', err);
        alert('Erreur lors de jout du véhicule');
      }
    );
  }

  deleteVehicle(vehicleId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.vehicleService.deleteVehicle(vehicleId).subscribe(
        (res) => {
          alert('Véhicule supprimé avec succès');
          this.loadVehicles(); // Rafraîchir la liste
        },
        (err) => {
          console.error('Erreur lors de la suppression du véhicule', err);
          alert('Erreur lors de la suppression du véhicule');
        }
      );
    }
  }
}
