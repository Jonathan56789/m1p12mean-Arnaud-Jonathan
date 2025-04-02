import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import { inject ,Injectable} from '@angular/core';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGard implements CanActivate{
  authService : AuthService= inject(AuthService);
  router: Router= inject(Router);
  //constructor(private authService: AuthService, private router: Router) {}
  canActivate():boolean {

      if(this.authService.isAuthenticated()){
        console.log("Ici c'est Paris")

      // if(this.mecanicienService.isAuthenticated()){
      //   console.log("Misy token")

        return true;
      }
      else{
        console.log("")
        this.router.navigate(['/'])
        return false
      }
  }
}