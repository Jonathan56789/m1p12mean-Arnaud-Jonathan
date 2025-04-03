import { Component,OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../services/user/user.service';
@Component({
  selector: 'app-profil',
  imports: [CommonModule,FormsModule, RouterModule,],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent implements OnInit{
    userName: string | null = null;
  
    constructor(private userService:UserService, private router: Router) {}
  
    ngOnInit() {
      this.userService.getProfile().subscribe((data)=>
        {
          this.userName=data.user.name;
        });
    }
}
