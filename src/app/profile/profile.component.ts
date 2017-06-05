import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterModule, Routes, Router} from "@angular/router";
import {Http, Response, Headers} from '@angular/http';
import {ActivityService} from "../shared/activity-service/activity.service";
import {NotificationsService} from "angular2-notifications";

@Component({
    selector: 'app-root',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.css']
})
export class ProfileComponent implements OnInit {

    private headers: Headers;
    Bio: any = {bio: ''};
    update: boolean = false;
    activity: any[] = [{text: '', activityDate: '', distance: '', name: ''}];
    user: any;

    /**
     *
     * @param activityService
     * @param route
     * @param http
     * @param router
     * @param notificationService
     */
    constructor(public activityService: ActivityService, public route: ActivatedRoute, private http: Http, private router: Router, private notificationService: NotificationsService) {
    }

    /**
     * get resolved activities
     */
    ngOnInit() {
        this.activity = this.route.snapshot.data['activities'];
        this.user = JSON.parse(localStorage.getItem('user'))
    }

    /**
     * @param id
     * send delete request to the backend
     * update the results
     */
    deleteActivity = (id: string): void => {
        this.headers = new Headers();
        let user = JSON.parse(localStorage.getItem('user'));
        this.headers.append('Authorization', user.token);
        this.http.delete("http://localhost:3000/activities/delete/" + id, {headers: this.headers})
            .subscribe((result) => {
                this.updateUserActivities();

            });

    };
    /**
     * @param email
     * send delete request to the backend
     * Log the user out and clear local storage
     */
    deleteAccount = (email: string): void => {
        this.headers = new Headers();
        let user = JSON.parse(localStorage.getItem('user'));
        this.headers.append('Authorization', user.token);
        this.http.delete("http://localhost:3000/users/delete/" + email, {headers: this.headers})
            .subscribe((result) => {
                localStorage.removeItem('user');
                this.router.navigate(['login']);
            });

    };

    /**
     * update the Array of activities
     */
    updateUserActivities() {
        this.activityService.updateUsers()
            .subscribe(activity => {
                this.activity = activity
            });
    }

    /**
     * update the bio on the backend with a Put request
     * update the view
     */
    updateBio() {
        if (this.Bio.bio == '') {
            this.notificationService.error('Error', 'Bio cannot update when empty');
        }
        else {
            this.headers = new Headers();
            let user = JSON.parse(localStorage.getItem('user'));
            this.headers.append('Authorization', user.token);
            this.http.put("http://localhost:3000/user/update/" + this.user._id, this.Bio, {headers: this.headers})
                .subscribe((result) => {
                    result = result.json();
                    user.bio = result['bio'];
                    this.user.bio = user.bio;
                    localStorage.setItem('user', JSON.stringify(user));
                    this.update = false
                })
        }

    }


}