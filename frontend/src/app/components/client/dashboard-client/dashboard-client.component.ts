import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
@Component({
  selector: 'app-dashboard-client',
  imports: [CommonModule,FormsModule, RouterModule,SidebarComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css',
  standalone:true,
})
export class DashboardClientComponent implements OnInit{
  unreadCount: number = 0;
  clientName: string | null = null;

  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit() {
    this.clientService.getNotifications().subscribe((data) => {
      this.unreadCount = data.filter((n: any) => !n.read).length;
    });
    this.clientService.getProfile().subscribe((data)=>
      {
        this.clientName=data.client.name;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
