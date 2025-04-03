import { Component } from '@angular/core';
import { MecanicienServiceService } from '../../../../services/mecanicien/mecanicien-service.service';
import { ReparationService } from '../../../../services/reparation/reparation.service';
import { error } from 'console';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../../services/user/user.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-accueil',
  imports: [CommonModule,RouterModule],
  templateUrl: './accueil.component.html',
  styleUrl: './accueil.component.css'
})
export class AccueilComponent {
  user: any;
  repair: any[] = [];
  ongoingRepair: any[] = [];
  attenteRepair:any[]=[];
  todayRepair: any[] = [];
  termineRepair:any[]=[];
  todayDate: string = new Date().toISOString().split('T')[0];
  nbrT:number=0;
  nbrC:number=0;
  nbrA:number=0;

  constructor(
    private mecanicienService: MecanicienServiceService, 
    private repairService: ReparationService,
    private userService: UserService,
    private router: Router) {
    this.userService.getProfile().subscribe((data)=>
      {
        this.user=data.user;
      });
  }

  ngOnInit() {
    this.loadRepair();
  }

  loadRepair() {
    // if (!this.user.id) {
    //   console.log(this.user.id)
    //   console.error("L'id du mécanicien n'est pas disponible");
    //   return;
    // }

    this.repairService.getRepairsByMechanics().subscribe(
      (data) => {
        this.repair = data;
        console.log(this.repair)

        this.ongoingRepair = this.repair.filter(rep => rep.status == "En cours");
        this.attenteRepair = this.repair.filter(rep => rep.status == "En attente");
        this.termineRepair = this.repair.filter(rep => rep.status == "Terminé");
        this.todayRepair = this.repair.filter(rep => {
          const repairDate = new Date(rep.startDate).toISOString().split('T')[0]; 
          return repairDate === this.todayDate && rep.status === 'En attente';
        });
        //nombre
        this.nbrC=this.ongoingRepair.length;
        this.nbrA=this.attenteRepair.length;
        this.nbrT=this.termineRepair.length;
        console.log(this.todayDate)
        console.log("On going repair:", this.ongoingRepair)
        console.log("Today's repair:", this.todayRepair)

      },
      (error) => {
        console.error("Erreur lors du chargemet des données", error)
      }
    );
    
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
