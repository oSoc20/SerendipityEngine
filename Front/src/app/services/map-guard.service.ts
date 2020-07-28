import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { StoreService } from './store/store.service';

@Injectable({
  providedIn: 'root'
})
export class MapGuardService {

  constructor(private router : Router, private store : StoreService) { 
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      if(this.store.selectedDestinationCity && this.store.selectedFrequency && this.store.selectedOriginCity && this.store.selectedTransport) {
        return true;
      }
      else {
        this.router.navigate(['']);
      }
  }
}
