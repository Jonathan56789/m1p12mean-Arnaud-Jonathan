import { Component ,OnInit} from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { catchError, throwError } from 'rxjs';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{
  userProfile: any = {};
  loading: boolean = true;
  error: string | null = null;
  isEditing: boolean = false;
  editedProfile: { name: string; email: string } = { name: '', email: '' };

  constructor(private userService: UserService) { }

      ngOnInit(): void {
        this.loadProfile();
      }

      loadProfile(): void {
        this.loading = true;
        this.userService.getProfile()
          .pipe(
            catchError(err => {
              this.error = 'Erreur lors du chargement du profil';
              this.loading = false;
              return throwError(err);
            })
          )
          .subscribe({
            next: (data) => {
              this.userProfile = data.user;
              this.editedProfile = { 
                name: data.user.name, 
                email: data.user.email 
              };
              this.loading = false;
              this.error = null;
            }
          });
      }

      toggleEdit(): void {
        this.isEditing = !this.isEditing;
      }

      updateProfile(): void {
        this.loading = true;
        this.userService.updateProfile(this.editedProfile)
          .pipe(
            catchError(err => {
              this.error = 'Erreur lors de la mise à jour du profil';
              this.loading = false;
              return throwError(err);
            })
          )
          .subscribe({
            next: (data) => {
              this.userProfile = data.user;
              this.loading = false;
              this.isEditing = false;
              this.error = null;
            },
            error: (err) => {
              console.error('Erreur:', err);
            }
          });
      }
}
