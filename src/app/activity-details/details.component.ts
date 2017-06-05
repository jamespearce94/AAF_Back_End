import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {MapsAPILoader} from "angular2-google-maps/core";
import {ActivityService} from "../shared/activity-service/activity.service";
import {Observable} from "rxjs";
import {isUndefined} from "util";
import {NotificationsService} from "angular2-notifications";


declare var google: any;

/**
 * This class represents the lazy loadedDetailsComponent.
 */
@Component({
    selector: 'app-root',
    templateUrl: 'details.component.html',
    styleUrls: ['details.component.css'],
})
export class DetailsComponent implements OnInit {
    private headers: Headers;
    id: string = '';
    newName: string = '';
    errorMessage: string;
    activity: any[] = [];
    kudo: any = {id: '', email: ''};
    comment: any = {name: '', email: '', comment: '', time: ''};
    distance: number;
    kudos: number;
    elapsed: any;
    averageSpeed: any;
    lon: any;
    lat: any;

    /**
     *
     * @param activityService
     * @param route
     * @param http
     * @param router
     * @param mapsAPILoader
     * @param notificationService
     */
    constructor(public activityService: ActivityService, private route: Router, private http: Http, private router: ActivatedRoute,
                private mapsAPILoader: MapsAPILoader, private notificationService: NotificationsService) {

    }

    /**
     * OnInit
     * Get activities and elapsedTime
     * Calculate distance of the trackPoints
     */
    ngOnInit() {
        this.activity = this.router.snapshot.data['details'][0];
        this.distance = 0;
        this.mapsAPILoader.load().then(() => {
            this.activity['trackPoints'].forEach((point, index) => {
                if (index != this.activity['trackPoints'].length - 1) {
                    let point1 = new google.maps.LatLng(point.lat, point.lon);
                    let point2 = new google.maps.LatLng(this.activity['trackPoints'][index + 1].lat, this.activity['trackPoints'][index + 1].lon);
                    this.distance += google.maps.geometry.spherical.computeDistanceBetween(point1, point2) / 1000;
                }
            });
            this.distance = Math.round(this.distance * 100) / 100;
            this.elapsedTime();
        });
    }

    /**
     * Calculates the elapsed time in hours
     */
    elapsedTime() {
        let tracks = this.activity['trackPoints'];
        let startTime = new Date(this.activity['trackPoints'][0].time);
        let endTime = new Date(this.activity['trackPoints'][tracks.length - 1].time);
        let diff = (endTime.getTime() - startTime.getTime()) / 1000;
        this.elapsed = moment.duration(diff, "seconds").humanize();
        this.avgSpeed(moment.duration(diff, "seconds").asHours());
    };

    /**
     * Calculates the average speed in KPH
     */
    avgSpeed(diff) {
        this.averageSpeed = Math.round(this.distance / diff * 100) / 100;
    }

    /**
     * Post comment to the backend and update the comments on the frontend
     */
    postComment = (id: string): void => {
        if (this.comment.comment == '') {
            this.notificationService.error('Error', 'Please enter comment');
        }
        else {
            this.headers = new Headers();
            let user = JSON.parse(localStorage.getItem('user'));
            this.comment.email = user.emailAddress;
            this.comment.date = Date();
            this.comment.name = user.firstName;
            this.headers.append('Authorization', user.token)
            this.http.post("http://localhost:3000/activities/comment/" + id, this.comment, {headers: this.headers})
                .subscribe(() => {
                    this.notificationService.success('Success', 'Comment Posted');
                    this.activity['comments'].push(this.comment);
                });
        }
    }
    /**
     * Post current user email to the backend
     */
    postKudos = (id: string): void => {

        let user = JSON.parse(localStorage.getItem('user'));
        let kudos = this.activity['kudos'];
        let current = this.activity.email;
        let error = '';
        if (current != user.emailAddress) {
            for (var kudo of kudos) {
                if (current == kudo) {
                    error = 'You cannot give kudos to yourself';
                }
                else if (error == "") {
                    if (kudo == user.emailAddress) {
                        error = 'You have already given kudos';
                    }
                }
            }
            if (error != "") {
                this.notificationService.error('Error', error);
            }
            else if (error == "") {
                this.headers = new Headers();
                this.headers.append('Authorization', user.token)
                this.kudo.email = user.emailAddress;
                this.http.post("http://localhost:3000/activities/kudos/" + id, this.kudo, {headers: this.headers})
                    .subscribe((result) => {
                    });
                this.activity['kudos'].push(this.kudo.email);
            }
        }
        else {
            this.notificationService.error('Error', 'You cannot give kudos to yourself');
        }
    };


}
