import {Injectable}             from '@angular/core';
import {
    Router, Resolve, RouterStateSnapshot,
    ActivatedRouteSnapshot
} from '@angular/router';
import {ActivityService} from "../shared/activity-service/activity.service";
import {Observable} from "rxjs";
@Injectable()
export class DetailsResolver implements Resolve<any> {
    constructor(private activityService: ActivityService, private router: Router) {
    }

    /**
     * @param route
     * @param state
     * @return {Observable<any>}
     * Gets the activity before the view loads
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        let id = route.params['id'];
        return this.activityService.getDetails(id);
    }
}
