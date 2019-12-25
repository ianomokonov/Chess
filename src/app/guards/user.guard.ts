import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/internal/operators';

export class UserGuard implements CanActivate{
 
    constructor( private router:Router){

    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
         if(sessionStorage.getItem('userId')){
            return of(true);
         }else{
            this.router.navigate(['/login']);
            return of(false);
         }
    }
}