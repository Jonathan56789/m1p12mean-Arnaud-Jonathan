import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { VehicleStatusComponent } from '../vehicle-status/vehicle-status.component';
import { NotificationsComponent } from '../notifications/notifications.component';
import { AppointmentService } from '../../../services/appointment/appointment.service';
@Component({
  selector: 'app-overview',
  imports: [CommonModule,FormsModule, RouterModule,VehicleStatusComponent,NotificationsComponent],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
  standalone:true,
})
export class OverviewComponent implements OnInit{
  nextAppointment: any;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit() {
    console.log('tttttttuuuuuu');
    this.appointmentService.getMyAppointments().subscribe((data) => {
      
      this.nextAppointment = data.appointments[data.appointments.length-1]; // Simule le prochain rendez-vous
    });
  }
}
