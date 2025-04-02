import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dashboard-manager',
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard-manager.component.html',
  styleUrl: './dashboard-manager.component.css'
})
export class DashboardManagerComponent {

}
