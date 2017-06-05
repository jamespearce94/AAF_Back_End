import {Injectable}             from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {ActivityService} from "../shared/activity-service/activity.service";
import {Observable} from "rxjs";
@Injectable()
export class HomeResolver implements Resolve<any> {
    constructor(private activityService: ActivityService, private router: Router) {
    }

    /**
     * @param route
     * @param state
     * @return {Observable<R>}
     * get activities before the view loads
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {

        return this.activityService.getAll();

    }
}

