import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DetailsComponent} from './details.component';
import {SharedModule} from '../shared/shared.module';
import {DetailsRoutingModule} from "./details-routing.module";
import {AgmCoreModule} from 'angular2-google-maps/core';
import {DetailsResolver} from "./details-resolver.service";
import {ActivityService} from "../shared/activity-service/activity.service";
import {FormsModule} from "@angular/forms";
import {SimpleNotificationsModule} from "angular2-notifications";

@NgModule({
    imports: [CommonModule, DetailsRoutingModule, SharedModule, AgmCoreModule, FormsModule, SimpleNotificationsModule, FormsModule],
    declarations: [DetailsComponent],
    exports: [DetailsComponent],
    providers: [ActivityService, DetailsResolver]
})
export class DetailsModule {
}
