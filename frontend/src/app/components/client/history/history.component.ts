import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ReparationService } from '../../../services/reparation/reparation.service';
@Component({
  selector: 'app-history',
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css',
  standalone:true,
})
export class HistoryComponent implements OnInit{
  repairs: any[] = [];

  constructor(private repairService: ReparationService) {}

  ngOnInit() {
    this.repairService.getHistoryRepairs().subscribe(
      (data) => {
        this.repairs = data;
      },
      (err) => console.error('Erreur lors de la récupération des réparations', err)
    );
  }

  downloadInvoice(invoiceUrl: string) {
    // Simule le téléchargement en ouvrant l'URL dans une nouvelle fenêtre
    // Dans une vraie app, vous pourriez utiliser un service pour gérer le téléchargement
    window.open(invoiceUrl, '_blank');
  }
}
