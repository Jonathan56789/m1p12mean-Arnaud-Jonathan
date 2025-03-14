import { Component , inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RendezVousServiceService } from '../../services/rendez-vous-service.service';

@Component({
  selector: 'app-rendezvous',
  imports: [CommonModule],
  templateUrl: './rendezvous.component.html',
  styleUrl: './rendezvous.component.css'
})
export class RendezvousComponent {
  rdvList: any[] = [] ; 
  rdvService: RendezVousServiceService = inject(RendezVousServiceService)

  ngOnInit(): void{
    this.loadRdv() ; 
  }

  loadRdv(): void{
    this.rdvService.getRdv().subscribe(data => this.rdvList = data)
  }
}
