import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-quote',
  standalone:true,
  imports: [CommonModule,FormsModule, RouterModule],
  templateUrl: './quote.component.html',
  styleUrl: './quote.component.css'
})
export class QuoteComponent implements OnInit {
  description: string = '';
  attachments: File[] = [];
  quotes: any[] = [];

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    // Charger les demandes de devis précédentes (optionnel)
    // this.clientService.getQuotes().subscribe(
    //   (data) => {
    //     this.quotes = data;
    //   },
    //   (err) => console.error('Erreur lors de la récupération des devis', err)
    // );
  }

  onFileChange(event: any) {
    this.attachments = Array.from(event.target.files);
  }

  requestQuote() {
    const formData = new FormData();
    formData.append('description', this.description);
    this.attachments.forEach((file, index) => {
      formData.append(`attachment${index}`, file, file.name);
    });

    this.clientService.requestQuote(formData).subscribe(
      (res) => {
        alert('Demande de devis envoyée avec succès');
        this.description = '';
        this.attachments = [];
        this.ngOnInit(); // Rafraîchir la liste des devis
      },
      (err) => console.error('Erreur lors de l\'envoi de la demande de devis', err)
    );
  }
}
