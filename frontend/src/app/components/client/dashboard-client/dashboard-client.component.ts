import { Component,OnInit } from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { UserService } from '../../../services/user/user.service';
@Component({
  selector: 'app-dashboard-client',
  imports: [CommonModule,FormsModule, RouterModule,SidebarComponent],
  templateUrl: './dashboard-client.component.html',
  styleUrl: './dashboard-client.component.css',
  standalone:true,
})
export class DashboardClientComponent implements OnInit{
  unreadCount: number = 0;
  userName: string | null = null;

  constructor(private clientService: ClientService,private userService:UserService, private router: Router) {}

  ngOnInit() {
    this.clientService.getNotifications().subscribe((data) => {
      this.unreadCount = data.filter((n: any) => !n.read).length;
    });
    this.userService.getProfile().subscribe((data)=>
      {
        this.userName=data.user.name;
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
