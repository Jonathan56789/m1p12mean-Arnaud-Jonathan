import { CommonModule } from '@angular/common';
import { Component ,OnInit} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ClientService } from '../../../services/client.service';

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

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.loadVehicles();
  }

  loadVehicles() {
    this.clientService.getMyVehicles().subscribe(
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

    this.clientService.createVehicle({ licensePlate: this.licensePlate }).subscribe(
      (res) => {
        alert('Véhicule ajouté avec succès');
        this.licensePlate = '';
        this.showAddForm = false;
        this.loadVehicles(); // Rafraîchir la liste
      },
      (err) => {
        console.error('Erreur lors de l’ajout du véhicule', err);
        alert('Erreur lors de l’ajout du véhicule');
      }
    );
  }

  deleteVehicle(vehicleId: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce véhicule ?')) {
      this.clientService.deleteVehicle(vehicleId).subscribe(
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
