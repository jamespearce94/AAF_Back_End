import {Injectable} from "@angular/core";
import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {ActivityService} from "../shared/activity-service/activity.service";
@Injectable()
export class UserResolver implements Resolve<any> {
    /**
     * @param activityService
     */
    constructor(public activityService: ActivityService) {
    }

    /**
     * @param route
     * @param state
     * @return {Observable<string[]>}
     * get user activities before view loads
     */
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
        return this.activityService.getUser();
    }
}
