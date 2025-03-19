import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot} from '@angular/router';
import { MecanicienServiceService } from '../services/mecanicien-service.service';
import { inject } from '@angular/core';

export class AuthGard implements CanActivate{
  mecanicienService : MecanicienServiceService= inject(MecanicienServiceService);
  router: Router= inject(Router);

  canActivate():boolean {
      if(this.mecanicienService.isAuthenticated()){
        console.log("Ici c'est Paris")
        return true;
      }
      else{
        console.log("Halla madrid")
        this.router.navigate(['/'])
        return false
      }
  }
}