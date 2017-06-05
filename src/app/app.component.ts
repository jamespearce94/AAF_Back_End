import {Component, EventEmitter} from '@angular/core';
import {Router} from "@angular/router";
import {NotificationsService} from "angular2-notifications";
import {FileUploader} from "ng2-file-upload";
import {ActivityService} from "./shared/activity-service/activity.service";

const URL = 'http://localhost:3000/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [
        './app.component.css'
    ]
})


export class AppComponent {
    readonly options: any = {
        position: ["top", "right"],
        timeOut: 3000,
        lastOnBottom: true,
        animate: "fromRight"
    };

    /**
     * @param router
     */
    constructor(private router: Router) {
        this.router = router;
    };

    logout() {
        localStorage.removeItem('user');
        this.router.navigate(['/login']);
    }

}
