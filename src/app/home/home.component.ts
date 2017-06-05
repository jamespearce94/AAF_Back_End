import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Http, Response, Headers} from '@angular/http';
import 'rxjs/add/operator/map'
import {ActivityService} from "../shared/activity-service/activity.service";
import {isUndefined} from "util";
import {FileUploader} from "ng2-file-upload";
import {NotificationsService} from "angular2-notifications";

const URL = 'http://localhost:3000/api';
/**
 * This class represents the lazy loaded HomeComponent.
 */
@Component({
    selector: 'app-root',
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})
export class HomeComponent implements OnInit {
    private headers: Headers;
    id: string = '';
    newName: string = '';
    errorMessage: string;
    activity: Array<any> = [];
    private options: any = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true,
        animate: "fromRight"
    };
    public action: string;
    private token: string = '';
    model = {text: "", type: "", email: "", name: "", shared: ""};

    /**
     *
     * @param activityService
     * @param activeRoute
     * @param http
     * @param route
     * @param router
     * @param notificationService
     */
    constructor(public activityService: ActivityService, public activeRoute: ActivatedRoute, private http: Http, private route: Router, private router: ActivatedRoute, private notificationService: NotificationsService) {
        this.uploader.onAfterAddingFile = function (file) {
            file.withCredentials = false;
        }
        this.uploader.onBuildItemForm = (item, form) => {
            form.append('ActivityName', this.model.text.toString());
            form.append('Type', this.model.type.toString());
            form.append('Name', activityService.getName());
            form.append('Email', activityService.getEmail());
            form.append('Shared', this.model.shared == "Public")
        };
        this.uploader._onCompleteItem = () => this.hide(true);

    }

    /**
     * Get the shared activities OnInit
     */
    ngOnInit() {
        this.activity = this.router.snapshot.data['details'];

    }

    /**
     * @type {FileUploader}
     * Handles upload of a new activity
     */
    public uploader: FileUploader = new FileUploader({
        url: URL,
        isHTML5: true,
        authToken: this.token,
        filters: [{
            name: 'gpxFilter',
            fn: (file) => {
                let filename = file.name;
                let type = filename.split(".").pop();
                if (type != 'gpx') {
                    this.notificationService.error('Error', 'This is not a GPX file');
                    return false
                }
                else {


                    return true;
                }

            }
        }]
    });

    /**
     * get a updated set of activities
     */
    getAll() {
        this.activityService.getAll()
            .subscribe(activity => {
                this.activity = activity
            });
    }

    /**
     * hide and update activities after upload
     * @param show
     */
    hide(show: boolean = false) {
        if (show) {
            this.notificationService.success('Success', 'Upload Complete');
        }
        this.getAll();
        this.action = 'hide';

    }

    /**
     * Handle the activityService observable
     */


}
