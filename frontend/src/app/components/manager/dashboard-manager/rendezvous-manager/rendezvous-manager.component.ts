import { Component } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment/appointment.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
import { ReparationService } from '../../../../services/reparation/reparation.service';
import { error } from 'console';
// import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  standalone: true,
  selector: 'app-rendezvous-manager',
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './rendezvous-manager.component.html',
  styleUrl: './rendezvous-manager.component.css'
})
export class RendezvousManagerComponent {
  appointments: any[] = [];
  userName: string | null = null;
  // En attente de confirmation
  planifiedAppointments: any[] = [];
  // Appointments en attente de date
  ongoingAppointments: any[] = [];
  completedAppointments: any[] = [];

  mecanicienNonOccupe: any[] = [];

  assignedAppointments: { [key: string]: boolean } = {};
  // Propriété pour le filtre de date
  selectedDateFilter: string = 'all';

  // Tableau pour stocker les rendez-vous filtrés (par exemple, pour la tab "En attente de confirmation")
  filteredAppointments: any[] = [];
  searchForm: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(private appointmentService: AppointmentService, private userService: UserService, private reparationService: ReparationService) {

  }

  ngOnInit() {
    this.loadAppointment();
    this.loadMecanicienNonOccupe();
    this.userService.getProfile().subscribe((data) => {
      this.userName = data.user.name;
    });
    // Ecoute les changements sur le champ "search"
    this.searchForm.get('search')?.valueChanges.subscribe((value: string) => {
      const term = value ? value.toLowerCase().trim() : '';
      if (term.length > 0) {
        // Filtre les rendez-vous dont le serviceType correspond au terme
        this.filteredAppointments = this.appointments.filter(app =>
          app.serviceType.toLowerCase().includes(term) || app.vehicleId.nameVehicle.toLowerCase().includes(term)
        );
      } else {
        this.filteredAppointments = [];
      }
      console.log("RECHERCHE FILTRE", this.filteredAppointments)
    });
  }
  loadAppointment() {
    this.appointmentService.getAppointments().subscribe(
      (data) => {
        this.appointments = data.appointments;

        console.log(this.appointments);
        this.planifiedAppointments = this.appointments.filter(rdv => rdv.status === "En attente"); // EN attente de confirmation
        this.ongoingAppointments = this.appointments.filter(rdv => rdv.status === "Confirmé"); // EN attente de date (déjà confirmé)
        this.completedAppointments = this.appointments.filter(rdv => rdv.status === "Terminé" || rdv.status === "Assigné"); // Terminé
        console.log(this.completedAppointments);

      }
    )
  }


  //Update rdv
  formAppointment: FormGroup = new FormGroup({
    id: new FormControl(''),
    status: new FormControl('')
  })

  setFormValuesAndSubmit(id: string, status: string ) {
    this.formAppointment.patchValue({
      id: id,
      status: status
    });
    console.log("Ici" + this.formAppointment.value.id);

    this.updateAppointment();
    // event.preventDefault();

  }
  updateAppointment() {
    const appointmentId = this.formAppointment.value.id;
    if (!appointmentId) {
      console.error("L'ID du rdv est manquant !");
      return;
    }
    let updatedData: any = { status: this.formAppointment.value.status };

    this.appointmentService.updateAppointment(appointmentId, updatedData).subscribe(
      response => {
        console.log('Réparation mise à jour avec succès', response);
        this.formAppointment.reset();
        this.loadAppointment();
      },
      error => {
        console.error('Erreur lors de la mise à jour de la réparation', error);
      }
    )

  }

  // load Mécanicien non-occupé

  loadMecanicienNonOccupe() {
    this.userService.getMecanonOccupe().subscribe(
      (data) => {
        this.mecanicienNonOccupe = data
        console.log("Voici les méca non occupé", this.mecanicienNonOccupe)
      },
      (error) => {
        console.error('Erreur load mécanicien non occupé', error);
      }
    )
  }


  formRepair: FormGroup = new FormGroup({
    clientId: new FormControl(''),
    vehicleId: new FormControl(''),
    mecanicienId: new FormControl(''),
    startDate: new FormControl(''),
    cost: new FormControl(0),
    details: new FormControl('')
  })


  setFormCreateValues(clientId: string, vehicleId: string, cost: number, details: string, rdvId: string) {

    console.log("setFormCreateValuesAndSubmit")
    this.formRepair.patchValue({
      clientId: clientId,
      vehicleId: vehicleId,
      // mecanicienId : mecanicienId , 
      // startDate : startDate , 
      cost: cost,
      details: details
    })

    console.log("Form create repair", this.formRepair.value.mecanicienId)
    this.createRepair(rdvId)
  }
  createRepair(rdvId: string) {
    console.log("Create repair", this.formRepair.value)

    this.reparationService.createRepair(this.formRepair.value).subscribe(
      (data) => {
        console.log("Réparation crée avec succès")


      },
      (error) => {
        console.error("Erreur")
      }
    )
  }



}
