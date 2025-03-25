import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import { MecanicienServiceService } from '../services/mecanicien-service.service';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGard implements CanActivate{
  mecanicienService : MecanicienServiceService= inject(MecanicienServiceService);
  router: Router= inject(Router);

  canActivate():boolean {
      if(this.mecanicienService.isAuthenticated()){
        console.log("Misy token")
        return true;
      }
      else{
        console.log("")
        this.router.navigate(['/'])
        return false
      }
  }
}