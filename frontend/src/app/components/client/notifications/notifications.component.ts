import { Component ,OnInit} from '@angular/core';
import { ClientService } from '../../../services/client.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  standalone:true,
  selector: 'app-notifications',
  imports: [CommonModule,FormsModule, RouterModule,],
  templateUrl: './notifications.component.html',
  styleUrl: './notifications.component.css'
})
export class NotificationsComponent implements OnInit{
  notifications: any[] = [];
  unreadCount: number = 0;

  constructor(private clientService: ClientService) {}

  ngOnInit() {
    this.clientService.getNotifications().subscribe((data) => {
      this.notifications = data;
      this.unreadCount = data.filter((n:any) => !n.read).length;
    });
  }

}
