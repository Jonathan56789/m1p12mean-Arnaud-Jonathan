import { Component } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FormsModule } from '@angular/forms';
import { VehicleService } from '../../../services/vehicle/vehicle.service';
import { AppointmentService } from '../../../services/appointment/appointment.service';

@Component({
  standalone:true,
  selector: 'app-appointments',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.css'
})
export class AppointmentsComponent {
  activeTab = 'vehicle';
  selectedService: string | null = null;
  selectedDate: string | null = null;
  selectedTime: string | null = null;
  selectedVehicle: any = null;
  clientId: string | null = null;
  vehicles: any[] = [];
  services = [
    { type: 'Vidange', icon: 'bi bi-tools', description: 'Changement d\'huile et de filtres' },
    { type: 'Pneumatiques', icon: 'bi bi-circle', description: 'Changement ou rotation des pneus' },
    { type: 'Révision', icon: 'bi bi-gear', description: 'Entretien complet du véhicule' },
    { type: 'Diagnostic', icon: 'bi bi-search', description: 'Analyse complète de votre véhicule' },
    { type: 'Climatisation', icon: 'bi bi-fan', description: 'Entretien et recharge' },
    { type: 'Autre', icon: 'bi bi-wrench', description: 'Demande personnalisée' },
  ];
  timeSlots = ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'];

  constructor(private appointmentService: AppointmentService, private router: Router,private vehicleService: VehicleService,) {}

  selectService(service: string) {
    this.selectedService = service;
  }
  selectVehicle(vehicle: any) {
    this.selectedVehicle = vehicle;
  }
  selectTime(time: string) {
    this.selectedTime = time;
  }
  ngOnInit(){
    this.loadVehicles();
    console.log("dfd");
    // this.clientService.getProfile().subscribe((data)=>
    // {
    //   this.clientId=data.client.id;
    // });
   
  }
  confirmAppointment() {
    const appointment = {
      //clientId:this.clientId,
      vehicleId: this.selectedVehicle?._id, // À récupérer dynamiquement
      date: new Date(`${this.selectedDate}T${this.selectedTime}`),
      serviceType: this.selectedService,
    };
    this.appointmentService.bookAppointment(appointment).subscribe(() => {
      this.router.navigate(['dashboard-client']);
    });
  }
  loadVehicles() {
    this.vehicleService.getMyVehicles().subscribe(
      (data) => {
        console.log(data);
        this.vehicles = data.vehicles;
      },
      (err) => {
        console.error('Erreur lors de la récupération des véhicules', err);
        alert('Erreur lors de la récupération des véhicules');
      }
    );
  }
}
