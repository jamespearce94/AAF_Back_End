import { Injectable }     from '@angular/core';
import {CanActivate, Router}    from '@angular/router';
import {NotificationsService} from 'angular2-notifications';



@Injectable()
export class AuthGuard implements CanActivate {
    /**
     * @param route
     * @param notificationsService
     *
     */
    constructor(private route: Router, private notificationsService: NotificationsService) {

        }

    canActivate() {
        let user = JSON.parse(localStorage.getItem('user'));
        if(user && user.token) {
            return true;
        }
        else{
            this.notificationsService.info('Error', 'Invalid or no Token Detected');
            this.route.navigate(['login']);
            return false;
        }

    }
}

